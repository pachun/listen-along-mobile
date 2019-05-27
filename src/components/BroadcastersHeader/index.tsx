import * as React from "react"
import { LinearGradient } from "expo"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import { NavigationScreenProp } from "react-navigation"

import ShareButton from "../../components/ShareButton"
import { spotifyUsersFromState, mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface IProps {
  navigation: NavigationScreenProp<{}>
  spotifyUsers: ISpotifyUser[]
  mySpotifyUser: ISpotifyUser
}

class BroadcastersHeader extends React.Component<IProps> {
  public render() {
    return (
      <LinearGradient
        style={styles.container}
        colors={["#f5f2f0", "#fff"]}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Broadcasters</Text>
        </View>
        <ShareButton />
      </LinearGradient>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  spotifyUsers: spotifyUsersFromState(state),
  mySpotifyUser: mySpotifyUserFromState(state),
})

export default connect(mapStateToProps)(BroadcastersHeader)
