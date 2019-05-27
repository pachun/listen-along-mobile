import * as React from "react"
import { AppState, AsyncStorage, FlatList, View } from "react-native"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Linking } from "expo"
import { NavigationScreenProp } from "react-navigation"

import SpotifyUserListItem from "../../components/SpotifyUserListItem"
import { broadcastersFromState, mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"
import api from "../../api"

interface IProps {
  mySpotifyUser: ISpotifyUser
  broadcasters: ISpotifyUser[]
  navigation: NavigationScreenProp<{}>
  updateSpotifyUsers: (spotifyUsers: ISpotifyUser[]) => void
}

class Broadcasters extends React.Component<IProps> {
  public state = {
    cable: api.cable,
    appState: AppState.currentState,
  }

  public componentDidMount() {
    if (__DEV__) {
      // AsyncStorage.removeItem("listenAlongToken")
      AsyncStorage.setItem(
        "listenAlongToken",
        "pkbrbjsvhuptuhsjcmtcbzgvyhbgvejo",
      )
    }
    this.allowListeningAlongThroughDeepLinks()
    this.updateSpotifyUsers()
    this.updateSpotifyUsersPeriodically()
    this.updateSpotifyUsersWhenAppIsForegrounded()
  }
  public render() {
    return (
      <View style={styles.spotifyUsersListContainer}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.broadcasters}
          renderItem={this.renderItem}
        />
      </View>
    )
  }

  private renderItem = (spotifyUserListItem: ISpotifyUserListItem) => (
    <SpotifyUserListItem
      item={spotifyUserListItem}
      onTap={this.listenAlong(spotifyUserListItem.item)}
    />
  )

  private keyExtractor = (item: ISpotifyUser) => item.id.toString()

  private listenAlong = (broadcaster: ISpotifyUser) => (): void => {
    if (broadcaster.is_me) {
      return
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

  private updateSpotifyUsers = () => {
    api.spotifyUsers().then(this.props.updateSpotifyUsers)
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

  private allowListeningAlongThroughDeepLinks = async () => {
    Linking.addEventListener("url", this.handleListenAlongLink)
    const initialURL = await Linking.getInitialURL()
    this.handleLink(initialURL)
  }

  private handleListenAlongLink = (link: IListenAlongLink) => {
    this.handleLink(link.url)
  }

  private handleLink = (url: string) => {
    if (Linking.parse(url).path !== "listenalong") {
      return
    }
    const broadcasterUsername = Linking.parse(url).queryParams
      .broadcaster_username
    const broadcaster = this.props.broadcasters.find(
      spotifyUser => spotifyUser.username === broadcasterUsername,
    )
    this.listenAlong(broadcaster)()
  }

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
}

const mapStateToProps = (state: IState) => ({
  mySpotifyUser: mySpotifyUserFromState(state),
  broadcasters: broadcastersFromState(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateSpotifyUsers: (spotifyUsers: ISpotifyUser[]) => {
    dispatch({ spotifyUsers, type: "UPDATE_SPOTIFY_USERS" })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Broadcasters)
