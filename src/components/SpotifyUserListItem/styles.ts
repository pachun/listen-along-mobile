import { StyleSheet } from "react-native"

export default StyleSheet.create({
  spotifyUserAvatar: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  spotifyUserAvatarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 20,
  },
  spotifyUserContainer: {
    display: "flex",
    flexDirection: "row",
  },
  spotifyUserDisplayName: {
    color: "dimgray",
    fontSize: 18,
  },
  spotifyUserDisplayNameContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  spotifyUserListItem: {
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    marginLeft: 20,
  },
})
