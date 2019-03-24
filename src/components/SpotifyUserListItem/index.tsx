import * as React from "react"
import { Image, Text, TouchableHighlight, View } from "react-native"
import { connect } from "react-redux"
import NumberOfListeners from "../NumberOfListeners"
import { mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface ISpotifyUserListItemProps {
  item: ISpotifyUserListItem
  onTap: () => void
  mySpotifyUser: ISpotifyUser
}

class SpotifyUserListItem extends React.Component<ISpotifyUserListItemProps> {
  public render() {
    if (this.visible()) {
      return (
        <TouchableHighlight
          onPress={this.props.onTap}
          underlayColor={this.activeColor()}
        >
          <View style={this.activeBroadcasterStyle()}>
            <View style={styles.spotifyUserListItem}>
              <View style={styles.spotifyUserContainer}>
                <View style={styles.spotifyUserAvatarContainer}>
                  <Image
                    style={styles.spotifyUserAvatar}
                    source={this.spotifyUserAvatarImageSource()}
                  />
                </View>
                <View style={styles.spotifyUserDisplayNameContainer}>
                  <Text style={styles.spotifyUserDisplayName}>
                    {this.spotifyUser().display_name}
                  </Text>
                  <View />
                </View>
              </View>
              <NumberOfListeners spotifyUser={this.spotifyUser()} />
            </View>
          </View>
        </TouchableHighlight>
      )
    }
    return null
  }

  private activeColor = () => "#f8f8f8"

  private activeBroadcaster = () => {
    const { mySpotifyUser } = this.props
    if (mySpotifyUser === undefined || mySpotifyUser.broadcaster === null) {
      return false
    } else if (
      mySpotifyUser.broadcaster.username === this.spotifyUser().username
    ) {
      return true
    }
    return false
  }

  private activeBroadcasterStyle = () => {
    return {
      backgroundColor: this.activeBroadcaster()
        ? this.activeColor()
        : "transparent",
      width: "100%",
    }
  }

  private spotifyUserAvatarImageSource = () => ({
    uri: this.spotifyUser().avatar_url,
  })

  private visible = () => this.isBroadcasting() && this.isListening()

  private isBroadcasting = () => this.spotifyUser().broadcaster === null

  private isListening = () => this.spotifyUser().is_listening === true

  private spotifyUser = () => this.props.item.item
}

const mapStateToProps = (state: IState) => ({
  mySpotifyUser: mySpotifyUserFromState(state),
})

export default connect(mapStateToProps)(SpotifyUserListItem)
