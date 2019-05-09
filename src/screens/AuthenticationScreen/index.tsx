import * as React from "react"
import { Linking } from "expo"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { NavigationScreenProp } from "react-navigation"
import { AsyncStorage, Button, WebView } from "react-native"
import { spotifyUsersFromState, mySpotifyUserFromState } from "../../selectors"

import api from "../../api"
import HeaderTitle from "../../components/HeaderTitle"

interface INavigationOptionsProps {
  navigation: NavigationScreenProp<{}>
}

interface IAuthenticationScreenProps {
  navigation: NavigationScreenProp<{}>
  spotifyUsers: ISpotifyUser[]
  mySpotifyUser: IMySpotifyUser
  updateSpotifyUsers: (spotifyUsers: ISpotifyUser[]) => void
}

class AuthenticationScreen extends React.Component<IAuthenticationScreenProps> {
  public static navigationOptions = (nav: INavigationOptionsProps) => ({
    headerTitle: <HeaderTitle />,
    headerLeft: (
      <Button title="Cancel" onPress={() => nav.navigation.popToTop()} />
    ),
  })

  public componentDidMount() {
    Linking.addEventListener("url", this.saveListenAlongToken)
  }

  public render() {
    return (
      <WebView
        style={{ width: "100%", height: "100%" }}
        source={{ uri: this.listenAlongLink() }}
      />
    )
  }

  private listenAlongLink = () =>
    api.authenticateAndListenToLink(
      this.props.navigation.getParam("broadcasterUsername"),
    )

  private saveListenAlongToken = (link: IListenAlongLink) => {
    const listenAlongToken = Linking.parse(link.url).queryParams.token
    AsyncStorage.setItem("listenAlongToken", listenAlongToken).then(() => {
      this.props.navigation.popToTop()
      this.listenAlong(link)
    })
  }

  private listenAlong = (link: IListenAlongLink) => {
    this.updateSpotifyUsers().then(() => {
      const broadcaster = this.broadcasterFrom(link)
      if (this.props.mySpotifyUser.is_listening) {
        this.listenTo(broadcaster)
      } else {
        this.startPlayingSongURI(broadcaster.song_uri).then(() =>
          this.listenTo(broadcaster),
        )
      }
    })
  }

  private broadcasterFrom = (link: IListenAlongLink) => {
    const broadcasterUsername = Linking.parse(link.url).queryParams
      .broadcaster_username
    return this.props.spotifyUsers.find(
      spotifyUser => spotifyUser.username === broadcasterUsername,
    )
  }

  private startPlayingSongURI = async (songURI: string) => {
    const lastElement = (array: string[]) => array[array.length - 1]
    const songID = lastElement(songURI.split(":"))
    const trackLink = `https://open.spotify.com/track/${songID}`
    await Linking.openURL(trackLink)
  }

  private listenTo = (broadcaster: ISpotifyUser) => {
    api.listenAlong(broadcaster.username).then(this.updateSpotifyUsers)
  }

  private updateSpotifyUsers = async () => {
    await api.spotifyUsers().then(this.props.updateSpotifyUsers)
  }
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
)(AuthenticationScreen)
