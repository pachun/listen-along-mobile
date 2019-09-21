import * as React from "react"
import { Linking } from "expo"
import { LinearGradient } from "expo-linear-gradient"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { NavigationScreenProp } from "react-navigation"
import { AsyncStorage, Button, Text, View, WebView } from "react-native"
import { spotifyUsersFromState, mySpotifyUserFromState } from "../../selectors"
import api from "../../api"
import styles from "./styles"

interface IAuthenticationScreenProps {
  navigation: NavigationScreenProp<{}>
  spotifyUsers: ISpotifyUser[]
  mySpotifyUser: IMySpotifyUser
  updateSpotifyUsers: (spotifyUsers: ISpotifyUser[]) => void
}

class AuthenticationScreen extends React.Component<IAuthenticationScreenProps> {
  public componentDidMount() {
    Linking.addEventListener("url", this.saveListenAlongToken)
  }

  public render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={styles.headerContainer}
          colors={["#f5f2f0", "#fff"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign In</Text>
          </View>
          <View style={styles.cancelButtonContainer}>
            <Button
              title="Cancel"
              onPress={() => this.props.navigation.popToTop()}
            />
          </View>
        </LinearGradient>
        <WebView
          style={styles.authenticationWebview}
          source={{ uri: this.listenAlongLink() }}
        />
      </View>
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
      if (this.props.mySpotifyUser.id === broadcaster.id) {
        return
      } else if (this.props.mySpotifyUser.is_listening) {
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
