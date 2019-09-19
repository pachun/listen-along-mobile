import * as React from "react"
import { View } from "react-native"
import FlashMessage from "react-native-flash-message"
import { connect } from "react-redux"
import { NavigationScreenProp } from "react-navigation"

import Broadcasters from "../../components/Broadcasters"
import BroadcastersHeader from "../../components/BroadcastersHeader"
import NowPlayingFooter from "../../components/NowPlayingFooter"
import styles from "./styles"

interface IProps {
  navigation: NavigationScreenProp<{}>
}

class SpotifyUsersScreen extends React.Component<IProps> {
  public render() {
    return (
      <View style={styles.screenContainer}>
        <BroadcastersHeader />
        <Broadcasters navigation={this.props.navigation} />
        <NowPlayingFooter />

        <FlashMessage position="top" />
      </View>
    )
  }
}

export default connect()(SpotifyUsersScreen)
