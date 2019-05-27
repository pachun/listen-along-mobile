import { StyleSheet } from "react-native"

const sheet = StyleSheet.create({
  container: {
    height: 110,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 1,
  },
  containerWithListeners: {
    height: 110,
  },
  containerWithoutListeners: {
    height: 78,
  },
  avatar: {
    marginTop: 10,
    marginLeft: 15,
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  infoStack: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 18,
    display: "flex",
    flexDirection: "column",
  },
  broadcasterName: {
    fontSize: 16,
    marginBottom: 3,
    fontWeight: "600",
  },
  songName: {
    fontWeight: "400",
    fontSize: 14,
    marginBottom: 2,
    color: "#3e3e3e",
    maxWidth: 280,
  },
  songArtists: {
    fontSize: 12,
    color: "#7e7e7e",
    maxWidth: 280,
  },
  borderedAvatar: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
})

export default {
  sheet,
  calculated: {
    avatarURL: (avatarUrl: string) => [
      sheet.avatar,
      avatarUrl.includes("gravatar") ? sheet.borderedAvatar : {},
    ],
    container: (anyListeners: boolean) => [
      sheet.container,
      anyListeners
        ? sheet.containerWithListeners
        : sheet.containerWithoutListeners,
    ],
  },
}
