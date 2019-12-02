import * as React from "react"
import { Image, Text, View } from "react-native"

import styles from "./styles"

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WOWZERS!</Text>
      <Image
        style={styles.errorImage}
        source={require("../../../assets/broken-glass.png")}
        resizeMode="contain"
      />
      <Text style={styles.subHeader}>Listen Along crashed</Text>
    </View>
  )
}
