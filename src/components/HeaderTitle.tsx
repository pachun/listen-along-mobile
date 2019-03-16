import * as React from "react"
import { Platform, StyleSheet, Text } from "react-native"

const HeaderTitle: React.SFC<{}> = () => {
  return <Text style={styles.headerTitle}>Listen Along</Text>
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: Platform.OS === "android" ? 20 : 0,
  },
})

export default HeaderTitle
