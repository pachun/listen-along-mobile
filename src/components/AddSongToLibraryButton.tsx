import * as React from "react"
import { TouchableHighlight } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const AddSongToLibraryButton: React.SFC<{
  addedToLibrary: boolean
  addToLibrary: () => void
}> = ({ addedToLibrary, addToLibrary }) => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={addToLibrary}
      style={{ padding: 20 }}
    >
      {addedToLibrary ? (
        <Ionicons name="ios-heart" color="red" size={32} />
      ) : (
        <Ionicons name="ios-heart-empty" color="red" size={32} />
      )}
    </TouchableHighlight>
  )
}

export default AddSongToLibraryButton
