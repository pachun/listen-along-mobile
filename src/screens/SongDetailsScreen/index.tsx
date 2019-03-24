import * as React from "react"
import { Image, Text, TouchableHighlight, View } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { NavigationScreenProp } from "react-navigation"
import FlashMessage, { showMessage } from "react-native-flash-message"
import ListenersDescription from "../../components/ListenersDescription"
import { mySpotifyUserFromState } from "../../selectors"
import AddSongToLibraryButton from "../../components/AddSongToLibraryButton"
import api from "../../api"
import styles from "./styles"

interface ISongDetailsScreenProps {
  navigation: NavigationScreenProp<{}>
  albumCoverImageSource: IImageSource
  songName: string
  songArtists: string
  songId: string
  idsOfSongsAddedToLibrary: string[]
  addSongToLibrary: (songId: string) => void
}

class SongDetailsScreen extends React.Component<ISongDetailsScreenProps> {
  public render() {
    const { albumCoverImageSource, songName, songArtists } = this.props
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.dropSongDetailsScreen}
        style={styles.dropSongDetails}
      >
        <View>
          <View style={styles.headphonesContainer}>
            <MaterialCommunityIcons name="headphones" size={18} />
          </View>
          <ListenersDescription />
          <View style={styles.outterAlbumCoverContainer}>
            <View style={styles.albumCoverContainer}>
              <Image style={styles.albumCover} source={albumCoverImageSource} />
            </View>
          </View>
          <View style={styles.bottomContent}>
            <Text style={styles.songName} numberOfLines={1}>
              {songName}
            </Text>
            <Text style={styles.songArtists} numberOfLines={1}>
              {songArtists}
            </Text>
            <View style={styles.buttonsContainer}>
              <AddSongToLibraryButton
                addedToLibrary={this.addedToLibrary()}
                addToLibrary={this.addToLibrary}
              />
            </View>
          </View>
          <FlashMessage position="top" />
        </View>
      </TouchableHighlight>
    )
  }

  private addedToLibrary = () => {
    return this.props.idsOfSongsAddedToLibrary.includes(this.props.songId)
  }

  private dropSongDetailsScreen = () => {
    this.props.navigation.goBack()
  }

  private addToLibrary = () => {
    if (!this.addedToLibrary()) {
      this.props.addSongToLibrary(this.props.songId)
      api
        .addSongToMyLibrary(this.props.songId)
        .then(this.showSongAddedToLibraryConfirmation)
    }
  }

  private showSongAddedToLibraryConfirmation = () => {
    showMessage({
      message: this.props.songName,
      description: "Added to Your Spotify Library",
      duration: 5000,
      type: "success",
    })
  }
}

const mapStateToProps = (state: IState) => ({
  spotifyUsers: state,
  albumCoverImageSource: {
    uri: mySpotifyUserFromState(state).song_album_cover_url,
  },
  songName: mySpotifyUserFromState(state).song_name,
  songArtists: mySpotifyUserFromState(state).song_artists.join(", "),
  songId: mySpotifyUserFromState(state).song_uri.split(":")[2],
  idsOfSongsAddedToLibrary: state.idsOfSongsAddedToLibrary,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addSongToLibrary: (songId: string) => {
      dispatch({ songId, type: "ADD_SONG_TO_LIBRARY" })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SongDetailsScreen)
