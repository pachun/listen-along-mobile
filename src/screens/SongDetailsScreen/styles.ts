import { StyleSheet } from "react-native"

export default StyleSheet.create({
  dropSongDetails: {
    height: "100%",
  },
  headphonesContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
  },
  outterAlbumCoverContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  albumCoverContainer: {
    width: "85%",
    maxWidth: 600,
    aspectRatio: 1,
  },
  albumCover: {
    width: "100%",
    height: "100%",
  },
  bottomContent: {
    marginLeft: "7.5%",
    width: "85%",
  },
  songName: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: 30,
  },
  songArtists: {
    color: "#c3c3c3",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 15,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
  },
})
