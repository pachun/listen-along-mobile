import * as React from "react"
import { Image, Text, TouchableHighlight, View } from "react-native"
import { connect } from "react-redux"

import NumberOfListeners from "../../components/NumberOfListeners"
import ListenerAvatarList from "../../components/ListenerAvatarList"
import { spotifyUsersFromState, mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface ISpotifyUserListItemProps {
  item: ISpotifyUserListItem
  onTap: () => void
  mySpotifyUser: ISpotifyUser
  spotifyUsers: ISpotifyUser[]
}

class SpotifyUserListItem extends React.Component<ISpotifyUserListItemProps> {
  public render() {
    if (this.visible()) {
      return (
        <TouchableHighlight onPress={this.props.onTap} underlayColor="#f8f8f8">
          <View style={styles.calculated.container(this.anyListeners())}>
            <Image
              source={this.spotifyUserAvatarImageSource()}
              style={styles.calculated.avatarURL(this.avatarURL())}
            />
            <View style={styles.sheet.infoStack}>
              <Text style={styles.sheet.broadcasterName}>
                {this.displayName()}
              </Text>
              <Text style={styles.sheet.songName} numberOfLines={1}>
                {this.songName()}
              </Text>
              <Text style={styles.sheet.songArtists} numberOfLines={1}>
                {this.songArtists()}
              </Text>
              <ListenerAvatarList broadcaster={this.spotifyUser()} />
            </View>
            <NumberOfListeners broadcaster={this.spotifyUser()} />
          </View>
        </TouchableHighlight>
      )
    }
    return null
  }

  private spotifyUserAvatarImageSource = () => ({
    uri: this.spotifyUser().avatar_url,
  })

  private visible = () => this.isListening() && !this.listeningAlong()

  private listeningAlong = () => this.spotifyUser().broadcaster !== null

  private isListening = () => this.spotifyUser().is_listening === true

  private avatarURL = () => this.spotifyUser().avatar_url

  private displayName = () => this.spotifyUser().display_name

  private songName = () => this.spotifyUser().song_name

  private songArtists = () => this.spotifyUser().song_artists.join(", ")

  private anyListeners = () =>
    this.props.spotifyUsers.some(
      spotifyUser =>
        spotifyUser.broadcaster &&
        spotifyUser.broadcaster.id === this.spotifyUser().id,
    )

  private spotifyUser = () => this.props.item.item
}

const mapStateToProps = (state: IState) => ({
  mySpotifyUser: mySpotifyUserFromState(state),
  spotifyUsers: spotifyUsersFromState(state),
})

export default connect(mapStateToProps)(SpotifyUserListItem)
