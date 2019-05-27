import * as React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import { spotifyUsersFromState } from "../../selectors"
import styles from "./styles"

interface INumberOfListenersProps {
  broadcaster: ISpotifyUser
  spotifyUsers: ISpotifyUser[]
}

class NumberOfListeners extends React.Component<INumberOfListenersProps> {
  public render() {
    if (this.visible()) {
      return (
        <View style={styles.numberOfListenersContainer}>
          <Text style={styles.numberOfListeners}>
            {this.numberOfListenersLabel()}
          </Text>
        </View>
      )
    }
    return null
  }

  private visible = () => {
    return this.numberOfListeners() > 0
  }

  private numberOfListeners = () => {
    return this.props.spotifyUsers.filter(
      currentSpotifyUser =>
        currentSpotifyUser.broadcaster &&
        currentSpotifyUser.broadcaster.id === this.props.broadcaster.id,
    ).length
  }

  private numberOfListenersLabel = () => {
    return `${this.numberOfListeners()} listener${
      this.numberOfListeners() > 1 ? "s" : ""
    }`
  }
}

const mapStateToProps = (state: IState) => ({
  spotifyUsers: spotifyUsersFromState(state),
})

export default connect(mapStateToProps)(NumberOfListeners)
