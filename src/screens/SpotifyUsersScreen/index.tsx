import * as React from "react"
import { AppState, AsyncStorage, FlatList, View } from "react-native"
import { Linking } from "expo"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { NavigationScreenProp } from "react-navigation"
import api from "../../api"
import HeaderTitle from "../../components/HeaderTitle"
import SpotifyUserListItem from "../../components/SpotifyUserListItem"
import CurrentlyPlaying from "../../components/CurrentlyPlaying"
import { spotifyUsersFromState, mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface ISpotifyUsersScreenProps {
  navigation: NavigationScreenProp<{}>
  spotifyUsers: ISpotifyUser[]
  mySpotifyUser: IMySpotifyUser
  updateSpotifyUsers: (spotifyUsers: ISpotifyUser[]) => void
}

class SpotifyUsersScreen extends React.Component<ISpotifyUsersScreenProps> {
  public static navigationOptions = {
    headerTitle: <HeaderTitle />,
  }

  public state = {
    cable: api.cable,
    appState: AppState.currentState,
  }

  public componentDidMount() {
    if (__DEV__) {
      AsyncStorage.removeItem("listenAlongToken")
    }
    this.updateSpotifyUsers()
    this.updateSpotifyUsersPeriodically()
    this.updateSpotifyUsersWhenAppIsForegrounded()
  }

  public render() {
    return (
      <View style={styles.spotifyUsersListContainer}>
        <FlatList
          style={this.spotifyUsersListStyle()}
          keyExtractor={this.keyExtractor}
          data={this.props.spotifyUsers}
          renderItem={this.renderItem}
        />
        <CurrentlyPlaying goToSongDetails={this.goToSongDetails} />
      </View>
    )
  }

  private goToSongDetails = () => {
    this.props.navigation.navigate("SongDetailsScreen")
  }

  private keyExtractor = (item: ISpotifyUser) => item.id.toString()

  private renderItem = (spotifyUserListItem: ISpotifyUserListItem) => (
    <SpotifyUserListItem
      item={spotifyUserListItem}
      onTap={this.listenAlong(spotifyUserListItem.item)}
    />
  )

  private updateSpotifyUsersWhenAppIsForegrounded = () => {
    AppState.addEventListener("change", this.handleAppStateChange)
  }

  private handleAppStateChange = (nextAppState: string) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.updateSpotifyUsers()
    }
    this.setState({ appState: nextAppState })
  }

  private updateSpotifyUsersPeriodically = () => {
    this.state.cable.subscriptions.create("SpotifyUsersChannel", {
      received: this.updateSpotifyUsers,
    })
  }

  private updateSpotifyUsers = () => {
    api.spotifyUsers().then(this.props.updateSpotifyUsers)
  }

  private listenAlong = (broadcaster: ISpotifyUser) => (): void => {
    if (broadcaster.is_me) {
      return null
    } else if (!this.loggedIn()) {
      this.authenticateAndListenTo(broadcaster)
    } else if (this.props.mySpotifyUser.is_listening) {
      this.listenTo(broadcaster)
    } else {
      this.startPlayingSongURI(broadcaster.song_uri).then(() =>
        this.listenTo(broadcaster),
      )
    }
  }

  private startPlayingSongURI = async (songURI: string) => {
    const lastElement = (array: string[]) => array[array.length - 1]
    const songID = lastElement(songURI.split(":"))
    const trackLink = `https://open.spotify.com/track/${songID}`
    await Linking.openURL(trackLink)
  }

  private listenTo = (broadcaster: ISpotifyUser) => {
    api
      .listenAlong(broadcaster.username)
      .then(this.updateSpotifyUsers)
      .catch(this.refreshTokenAndListenAlong(broadcaster))
  }

  private authenticateAndListenTo = (broadcaster: ISpotifyUser) =>
    this.props.navigation.navigate("AuthenticationScreen", {
      broadcasterUsername: broadcaster.username,
    })

  private loggedIn = () => this.props.mySpotifyUser !== undefined

  private refreshTokenAndListenAlong = (broadcaster: ISpotifyUser) => () => {
    AsyncStorage.removeItem("listenAlongToken").then(
      this.listenAlong(broadcaster),
    )
  }

  private spotifyUsersListStyle = () => ({
    height: this.props.mySpotifyUser === undefined ? "100%" : "80%",
  })
}

const mapStateToProps = (state: IState) => {
  return {
    spotifyUsers: spotifyUsersFromState(state),
    mySpotifyUser: mySpotifyUserFromState(state),
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateSpotifyUsers: (spotifyUsers: ISpotifyUser[]) => {
      dispatch({ spotifyUsers, type: "UPDATE_SPOTIFY_USERS" })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpotifyUsersScreen)
