import { StyleSheet } from "react-native"

export default StyleSheet.create({
  albumCover: {
    height: 70,
    marginRight: 10,
    width: 70,
  },
  currentlyPlayingContainer: {
    borderTopColor: "gray",
    borderTopWidth: 0.25,
    display: "flex",
    flexDirection: "row",
    height: "20%",
    justifyContent: "center",
  },
  horizontallyCenterCurrentlyPlaying: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingTop: 20,
    width: "90%",
  },
  nowPlayingHeader: {
    color: "#BD10E0",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  songArtists: {
    fontSize: 15,
    marginTop: 9,
    maxWidth: 250,
    opacity: 0.6,
  },
  songDetails: {
    display: "flex",
    flexDirection: "column",
  },
  songName: {
    fontSize: 19,
    marginTop: 3,
    maxWidth: 250,
    overflow: "hidden",
  },
  verticallyCenterCurrentlyPlaying: {
    display: "flex",
    flexDirection: "row",
    height: 70,
    width: "100%",
  },
})
