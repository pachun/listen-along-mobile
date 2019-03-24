import * as React from "react"
import { Image, Text, TouchableHighlight, View } from "react-native"
import { connect } from "react-redux"
import { mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface ICurrentlyPlayingProps {
  mySpotifyUser: IMySpotifyUser
  goToSongDetails: () => void
}

class CurrentlyPlaying extends React.Component<ICurrentlyPlayingProps> {
  public render() {
    if (this.visible()) {
      const { mySpotifyUser, goToSongDetails } = this.props
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={goToSongDetails}
        >
          <View style={styles.currentlyPlayingContainer}>
            <View style={styles.horizontallyCenterCurrentlyPlaying}>
              <View style={styles.verticallyCenterCurrentlyPlaying}>
                <Image
                  source={this.albumCoverImageSource()}
                  style={styles.albumCover}
                />
                <View style={styles.songDetails}>
                  <Text style={styles.nowPlayingHeader}>NOW PLAYING</Text>
                  <Text style={styles.songName} numberOfLines={1}>
                    {mySpotifyUser.song_name}
                  </Text>
                  <Text style={styles.songArtists} numberOfLines={1}>
                    {mySpotifyUser.song_artists.join(", ")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )
    }
    return null
  }

  private albumCoverImageSource = () => ({
    uri: this.props.mySpotifyUser.song_album_cover_url,
  })

  private visible = () => {
    return (
      this.props.mySpotifyUser !== undefined &&
      this.props.mySpotifyUser.is_listening
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    mySpotifyUser: mySpotifyUserFromState(state),
  }
}

export default connect(mapStateToProps)(CurrentlyPlaying)
