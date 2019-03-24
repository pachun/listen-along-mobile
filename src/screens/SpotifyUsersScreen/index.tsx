import * as React from "react"
import { Linking } from "expo"
import { AsyncStorage, FlatList, View } from "react-native"
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
  }

  public componentDidMount() {
    AsyncStorage.setItem("listenAlongToken", "ddufcftpxuknkmnkmrpvlqybaoqfhkla")
    Linking.addEventListener("url", this.saveListenAlongToken)
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

  private saveListenAlongToken = (link: IListenAlongLink) => {
    const listenAlongToken = Linking.parse(link.url).queryParams.token
    AsyncStorage.setItem("listenAlongToken", listenAlongToken)
  }

  private keyExtractor = (item: ISpotifyUser) => item.id.toString()

  private renderItem = (spotifyUserListItem: ISpotifyUserListItem) => (
    <SpotifyUserListItem
      item={spotifyUserListItem}
      onTap={this.listenAlong(spotifyUserListItem.item)}
    />
  )

  private updateSpotifyUsers = () => {
    api.spotifyUsers().then(this.props.updateSpotifyUsers)
  }

  private listenAlong = (broadcaster: ISpotifyUser) => (): void => {
    if (broadcaster.is_me) {
      return null
    }
    const broadcasterUsername = broadcaster.username
    AsyncStorage.getItem("listenAlongToken").then(listenAlongToken => {
      if (listenAlongToken === null) {
        api.authenticateAndListenTo(broadcasterUsername)
      } else {
        api
          .listenAlong(broadcasterUsername)
          .then(this.updateSpotifyUsers)
          .catch(this.refreshTokenAndListenAlong(broadcaster))
      }
    })
  }

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
  // const x = state
  // debugger
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
