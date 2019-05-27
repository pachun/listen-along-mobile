import * as React from "react"
import { connect } from "react-redux"
import { View, Image } from "react-native"
import { mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface IProps {
  mySpotifyUser: ISpotifyUser
}

class ListenAlongPair extends React.Component<IProps> {
  public render() {
    const { mySpotifyUser } = this.props
    if (mySpotifyUser && mySpotifyUser.broadcaster) {
      return (
        <View style={styles.container}>
          <View style={styles.avatarsContainer}>
            <Image
              source={{ uri: this.broadcastersAvatar() }}
              style={styles.broadcastersAvatar}
            />
            <Image source={{ uri: this.myAvatar() }} style={styles.myAvatar} />
          </View>
        </View>
      )
    }
    return null
  }

  private myAvatar = () => this.props.mySpotifyUser.avatar_url

  private broadcastersAvatar = () =>
    this.props.mySpotifyUser.broadcaster.avatar_url
}

const mapStateToProps = (state: IState) => ({
  mySpotifyUser: mySpotifyUserFromState(state),
})

export default connect(mapStateToProps)(ListenAlongPair)
