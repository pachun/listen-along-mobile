import { StyleSheet } from "react-native"

const sheet = StyleSheet.create({
  list: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
  },
  listAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: -10,
    backgroundColor: "#fff",
  },
  borderedAvatar: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
})

export default {
  sheet,
  calculated: {
    listAvatar: (avatarURL: string) => [
      sheet.listAvatar,
      avatarURL.includes("gravatar") ? sheet.borderedAvatar : {},
    ],
  },
}
