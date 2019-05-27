import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    height: "100%",
  },
  headerContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  titleContainer: {
    justifyContent: "flex-end",
  },
  title: {
    marginLeft: 15,
    fontWeight: "700",
    fontSize: 30,
  },
  cancelButtonContainer: {
    justifyContent: "flex-end",
    marginRight: 10,
  },
  authenticationWebview: {
    flexGrow: 1,
  },
})
