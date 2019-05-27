import * as React from "react"
import { TouchableHighlight } from "react-native"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { Ionicons } from "@expo/vector-icons"
import { showMessage } from "react-native-flash-message"

import api from "../../api"

import {
  currentSongIdFromState,
  currentSongAlreadyAddedToLibraryFromState,
  currentSongNameFromState,
} from "../../selectors"

interface IProps {
  currentSongAlreadyAddedToLibrary: boolean
  addSongToLibrary: (songId: string) => void
  currentSongId: string
  currentSongName: string
}

class AddSongToLibraryButton extends React.Component<IProps> {
  public render() {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.addToLibrary}
        style={{ paddingLeft: 2, paddingRight: 2 }}
      >
        {this.icon()}
      </TouchableHighlight>
    )
  }

  private icon = () => {
    if (this.props.currentSongAlreadyAddedToLibrary) {
      return <Ionicons name="ios-heart" color="red" size={30} />
    }
    return <Ionicons name="ios-heart-empty" color="red" size={30} />
  }

  private addToLibrary = () => {
    if (!this.props.currentSongAlreadyAddedToLibrary) {
      this.props.addSongToLibrary(this.props.currentSongId)
      api
        .addSongToMyLibrary(this.props.currentSongId)
        .then(this.showSongAddedToLibraryConfirmation)
    }
  }

  private showSongAddedToLibraryConfirmation = () => {
    showMessage({
      message: this.props.currentSongName,
      description: "added to your Spotify library",
      duration: 3000,
      type: "success",
    })
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentSongAlreadyAddedToLibrary: currentSongAlreadyAddedToLibraryFromState(
      state,
    ),
    currentSongId: currentSongIdFromState(state),
    currentSongName: currentSongNameFromState(state),
  }
}

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
)(AddSongToLibraryButton)
