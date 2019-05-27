import * as React from "react"
import { LinearGradient } from "expo"
import { connect } from "react-redux"
import { Image, Text, View } from "react-native"

import AddSongToLibraryButton from "../../components/AddSongToLibraryButton"
import { mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface IProps {
  mySpotifyUser: ISpotifyUser
}

class NowPlayingFooter extends React.Component<IProps> {
  public render() {
    if (this.props.mySpotifyUser && this.props.mySpotifyUser.is_listening) {
      const { mySpotifyUser } = this.props
      return (
        <LinearGradient
          style={styles.sheet.gradientContainer}
          {...styles.styleProps.gradientContainer}
        >
          <Image
            source={{ uri: mySpotifyUser.song_album_cover_url }}
            style={styles.sheet.songAlbumCover}
          />
          <View style={styles.sheet.currentPlaybackInfoContainer}>
            <View>
              <Text numberOfLines={1} style={styles.sheet.songName}>
                {mySpotifyUser.song_name}
              </Text>
              <Text numberOfLines={1} style={styles.sheet.songArtists}>
                {mySpotifyUser.song_artists.join(", ")}
              </Text>
            </View>
            <AddSongToLibraryButton />
          </View>
        </LinearGradient>
      )
    }
    return null
  }
}

const mapStateToProps = (state: IState) => {
  return {
    mySpotifyUser: mySpotifyUserFromState(state),
  }
}

export default connect(mapStateToProps)(NowPlayingFooter)
