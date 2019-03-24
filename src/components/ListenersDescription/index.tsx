import * as React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import { spotifyUsersFromState, mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface IListenersDescriptionProps {
  mySpotifyUser: ISpotifyUser
  numberOfOtherListeners: number
}

class ListenersDescription extends React.Component<IListenersDescriptionProps> {
  public render() {
    const { mySpotifyUser, numberOfOtherListeners } = this.props
    const broadcaster = mySpotifyUser.broadcaster

    if (broadcaster !== null && numberOfOtherListeners > 1) {
      return (
        <View style={styles.listenersDescriptionContainer}>
          <Text>
            You, {broadcaster.display_name} and {numberOfOtherListeners} others
          </Text>
        </View>
      )
    } else if (broadcaster !== null && numberOfOtherListeners === 1) {
      return (
        <View style={styles.listenersDescriptionContainer}>
          <Text>You, {broadcaster.display_name} and 1 other</Text>
        </View>
      )
    } else if (broadcaster !== null && numberOfOtherListeners === 0) {
      return (
        <View style={styles.listenersDescriptionContainer}>
          <Text>You and {broadcaster.display_name}</Text>
        </View>
      )
    } else if (broadcaster === null && numberOfOtherListeners > 1) {
      return (
        <View style={styles.listenersDescriptionContainer}>
          <Text>You and {numberOfOtherListeners} others</Text>
        </View>
      )
    } else if (broadcaster === null && numberOfOtherListeners === 1) {
      return (
        <View style={styles.listenersDescriptionContainer}>
          <Text>You and 1 other</Text>
        </View>
      )
    }

    return null
  }
}

const numberOfOtherListenersFromState = (state: IState) => {
  const mySpotifyUser = mySpotifyUserFromState(state)
  if (mySpotifyUser.broadcaster !== null) {
    return (
      spotifyUsersFromState(state).filter(
        spotifyUser =>
          spotifyUser.broadcaster &&
          spotifyUser.broadcaster.id === mySpotifyUser.broadcaster.id,
      ).length - 1
    )
  }
  return spotifyUsersFromState(state).filter(
    spotifyUser =>
      spotifyUser.broadcaster &&
      spotifyUser.broadcaster.id === mySpotifyUser.id,
  ).length
}

const mapStateToProps = (state: IState) => {
  return {
    mySpotifyUser: mySpotifyUserFromState(state),
    numberOfOtherListeners: numberOfOtherListenersFromState(state),
  }
}

export default connect(mapStateToProps)(ListenersDescription)
