import * as React from "react"
import { Platform, Share, TouchableHighlight, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { connect } from "react-redux"
import { NavigationScreenProp } from "react-navigation"

import ListenAlongPair from "../../components/ListenAlongPair"
import { spotifyUsersFromState, mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface IProps {
  navigation: NavigationScreenProp<{}>
  spotifyUsers: ISpotifyUser[]
  mySpotifyUser: ISpotifyUser
}

class ShareButton extends React.Component<IProps> {
  public render() {
    if (this.props.mySpotifyUser && this.props.mySpotifyUser.is_listening) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={this.share}
          style={styles.container}
        >
          <View style={styles.shareButtonContent}>
            <ListenAlongPair />
            <View style={styles.shareIconContainer}>
              <Ionicons name="ios-share" size={30} />
            </View>
          </View>
        </TouchableHighlight>
      )
    }
    return null
  }

  private listenAlongLinkFor = (spotifyUser: ISpotifyUser) =>
    `https://listenalong.fm?broadcaster_username=${spotifyUser.username}`

  private numberOfPeopleListeningAlongWithMe = () => {
    const { mySpotifyUser, spotifyUsers } = this.props
    return spotifyUsers.filter(
      spotifyUser =>
        spotifyUser.broadcaster &&
        spotifyUser.broadcaster.id === mySpotifyUser.id,
    ).length
  }

  private numberOfPeopleListeningWithMyBroadcaster = () => {
    const { mySpotifyUser, spotifyUsers } = this.props
    return (
      spotifyUsers.filter(
        spotifyUser =>
          spotifyUser.broadcaster &&
          spotifyUser.broadcaster.id === mySpotifyUser.broadcaster.id,
      ).length - [mySpotifyUser].length
    )
  }

  private withOthersLabel = (
    conjunction: string,
    numberOfOtherPeople: number,
  ) => {
    if (numberOfOtherPeople === 0) {
      return ""
    } else if (numberOfOtherPeople === 1) {
      return ` ${conjunction} 1 other person`
    } else if (numberOfOtherPeople > 1) {
      return ` ${conjunction} ${numberOfOtherPeople} other people`
    }
  }

  private myListenAlongMessage = () => {
    const { mySpotifyUser } = this.props
    const numPeople = this.numberOfPeopleListeningAlongWithMe()
    const listenersPronoun = numPeople > 0 ? "us" : "me"

    return `I'm listening to ${
      mySpotifyUser.song_name
    } by ${mySpotifyUser.song_artists.join(
      ", ",
    )} on Spotify${this.withOthersLabel(
      "with",
      numPeople,
    )}. Listen along with ${listenersPronoun}!`
  }

  private myBroadcastersListenAlongMessage = () => {
    const { mySpotifyUser } = this.props
    const numPeople = this.numberOfPeopleListeningWithMyBroadcaster()

    return `I'm listening along with ${
      mySpotifyUser.broadcaster.display_name
    }${this.withOthersLabel(
      "and",
      numPeople,
    )} on Spotify. Listen along with us!`
  }

  private shareMessage = () => {
    if (this.props.mySpotifyUser.broadcaster) {
      return this.myBroadcastersListenAlongMessage()
    }
    return this.myListenAlongMessage()
  }

  private shareLink = () => {
    const { mySpotifyUser } = this.props
    return this.listenAlongLinkFor(
      mySpotifyUser.broadcaster ? mySpotifyUser.broadcaster : mySpotifyUser,
    )
  }

  private shareContent = () => {
    if (Platform.OS === "ios") {
      return {
        title: "Listen Along",
        message: this.shareMessage(),
        url: this.shareLink(),
      }
    }
    return {
      title: "Listen Along",
      message: `${this.shareMessage()} ${this.shareLink()}`,
    }
  }

  private share = () => {
    Share.share(this.shareContent())
  }
}

const mapStateToProps = (state: IState) => ({
  spotifyUsers: spotifyUsersFromState(state),
  mySpotifyUser: mySpotifyUserFromState(state),
})

export default connect(mapStateToProps)(ShareButton)
