import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  feedback: {
    marginBottom: 30,
    paddingTop: 30,
    width: "100%",
    height: 210,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 28,
    textAlignVertical: "top",
    textAlign: "center",
  },
  header: {
    width: "100%",
    display: "flex",
    textAlign: "center",
    marginTop: 20,
    fontSize: 24,
  },
  prompt: {
    height: 30,
    width: "100%",
    display: "flex",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontStyle: "italic",
  },
  cancelNavBarButton: {
    paddingLeft: 13,
    paddingRight: 13,
    marginTop: 2,
  },
})

export default styles
