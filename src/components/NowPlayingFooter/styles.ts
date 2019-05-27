import { StyleSheet } from "react-native"

const sheet = StyleSheet.create({
  gradientContainer: {
    height: 150,
    padding: 22,
    flexDirection: "row",
  },
  songAlbumCover: {
    width: 90,
    height: 90,
  },
  currentPlaybackInfoContainer: {
    marginLeft: 25,
    maxWidth: 180,
    justifyContent: "space-between",
    height: 90,
  },
  songName: {
    fontWeight: "600",
    marginBottom: 6,
  },
  songArtists: {
    fontWeight: "400",
    color: "#a8a8a8",
  },
})

export default {
  sheet,
  styleProps: {
    gradientContainer: {
      colors: ["#f5f2f0", "#fff"],
      start: [0.0, 0.5],
      end: [1.0, 0.5],
    },
  },
}
