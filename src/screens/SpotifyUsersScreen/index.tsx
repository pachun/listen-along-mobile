import * as React from "react"
import { Alert, AsyncStorage, FlatList, View } from "react-native"
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
    startSpotifyPopupDisplayed: false,
  }

  public componentDidMount() {
    if (__DEV__) {
      AsyncStorage.removeItem("listenAlongToken")
    }
    this.updateSpotifyUsers()
    this.state.cable.subscriptions.create("SpotifyUsersChannel", {
      received: this.updateSpotifyUsers,
    })
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

  private updateSpotifyUsers = () => {
    api.spotifyUsers().then(spotifyUsers => {
      this.props.updateSpotifyUsers(spotifyUsers)
      if (this.loggedIn() && !this.props.mySpotifyUser.is_listening) {
        this.startSpotify()
      }
    })
  }

  private listenAlong = (broadcaster: ISpotifyUser) => (): void => {
    if (broadcaster.is_me) {
      return null
    } else if (!this.loggedIn()) {
      this.authenticateAndListenTo(broadcaster)
    } else if (this.props.mySpotifyUser.is_listening) {
      this.listenTo(broadcaster)
    } else {
      this.startSpotify()
    }
  }

  private startSpotify = () => {
    if (this.state.startSpotifyPopupDisplayed) {
      return
    }
    this.setState({ startSpotifyPopupDisplayed: true }, () => {
      const silentTrackLink =
        "https://open.spotify.com/track/7cctPQS83y620UQtMd1ilL?si=ZPZm-RpiTnKRiWUep0cQTg"
      Alert.alert("Come Right Back!", "Start Spotify to use Listen Along.", [
        {
          text: "Start Spotify",
          onPress: () => {
            this.setState({ startSpotifyPopupDisplayed: false })
            Linking.openURL(silentTrackLink)
          },
        },
      ])
    })
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
