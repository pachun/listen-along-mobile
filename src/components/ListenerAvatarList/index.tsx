import * as React from "react"
import { connect } from "react-redux"
import { Image, View } from "react-native"

import { spotifyUsersFromState } from "../../selectors"
import styles from "./styles"

interface IProps {
  broadcaster: ISpotifyUser
  spotifyUsers: ISpotifyUser[]
}

class ListenerAvatarList extends React.Component<IProps> {
  public render() {
    return (
      <View style={styles.sheet.list}>
        {this.firstFiveListeners().map(spotifyUser => {
          return (
            <Image
              key={spotifyUser.id}
              source={{ uri: spotifyUser.avatar_url }}
              style={styles.calculated.listAvatar(spotifyUser.avatar_url)}
            />
          )
        })}
      </View>
    )
  }

  private firstFiveListeners = () => this.listeningSpotifyUsers().slice(0, 5)

  private listeningSpotifyUsers = () => {
    return this.props.spotifyUsers.filter(
      spotifyUser =>
        spotifyUser.broadcaster &&
        spotifyUser.broadcaster.id === this.props.broadcaster.id,
    )
  }
}

const mapStateToProps = (state: IState) => ({
  spotifyUsers: spotifyUsersFromState(state),
})

export default connect(mapStateToProps)(ListenerAvatarList)
