import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
  },
  avatarsContainer: {
    flexDirection: "row",
  },
  broadcastersAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#fff",
    marginRight: -10,
    zIndex: 10,
    borderWidth: 0.2,
    borderColor: "#ccc",
  },
  myAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#fff",
    borderWidth: 0.2,
    borderColor: "#ccc",
  },
})

export default styles
