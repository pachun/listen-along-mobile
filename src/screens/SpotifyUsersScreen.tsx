import * as React from "react"
import { Linking } from "expo"
import { AsyncStorage, FlatList, StyleSheet, View } from "react-native"

import api from "../api"
import HeaderTitle from "../components/HeaderTitle"
import SpotifyUserListItem, {
  ISpotifyUserListItem,
} from "../components/SpotifyUserListItem"
import ISpotifyUser from "../types/ISpotifyUser"

interface IListenAlongLink {
  url: string
}

class SpotifyUsersScreen extends React.Component {
  public static navigationOptions = {
    headerTitle: <HeaderTitle />,
  }

  public state = {
    cable: api.cable,
    spotifyUsers: [] as ISpotifyUser[],
  }

  public saveListenAlongToken = (link: IListenAlongLink) => {
    const listenAlongToken = Linking.parse(link.url).queryParams.token
    AsyncStorage.setItem("listenAlongToken", listenAlongToken)
  }

  public componentDidMount() {
    Linking.addEventListener("url", this.saveListenAlongToken)
    this.updateSpotifyUsers()
    this.state.cable.subscriptions.create("SpotifyUsersChannel", {
      received: this.updateSpotifyUsers,
    })
  }

  public render() {
    return (
      <View>
        <FlatList
          style={styles.spotifyUsersList}
          keyExtractor={this.keyExtractor}
          data={this.state.spotifyUsers}
          renderItem={this.renderItem}
        />
      </View>
    )
  }

  private keyExtractor = (item: ISpotifyUser) => item.id.toString()

  private renderItem = (spotifyUserListItem: ISpotifyUserListItem) => (
    <SpotifyUserListItem
      item={spotifyUserListItem}
      onTap={this.listenAlong(spotifyUserListItem.item)}
      numberOfListeners={this.numberOfListeners(
        spotifyUserListItem.item.username,
      )}
    />
  )

  private numberOfListeners = (username: string) => {
    return this.state.spotifyUsers.filter(
      spotifyUser =>
        spotifyUser.broadcaster !== null &&
        spotifyUser.broadcaster.username === username,
    ).length
  }

  private updateSpotifyUsers = () => {
    api.spotifyUsers().then(spotifyUsers => this.setState({ spotifyUsers }))
  }

  private listenAlong = (broadcaster: ISpotifyUser) => () => {
    if (broadcaster.is_me) {
      return null
    }
    const broadcasterUsername = broadcaster.username
    AsyncStorage.getItem("listenAlongToken").then(listenAlongToken => {
      if (listenAlongToken === null) {
        api.authenticateAndListenTo(broadcasterUsername)
      } else {
        api.listenAlong(broadcasterUsername).then(this.updateSpotifyUsers)
      }
    })
  }
}

const styles = StyleSheet.create({
  spotifyUsersList: { height: "100%" },
})

export default SpotifyUsersScreen
