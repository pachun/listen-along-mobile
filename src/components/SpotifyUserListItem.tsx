import * as React from "react"
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native"

import ISpotifyUser from "../types/ISpotifyUser"

interface ISpotifyUserListItemProps {
  item: ISpotifyUserListItem
  onTap: () => {}
  numberOfListeners: number
}

const SpotifyUserListItem: React.SFC<ISpotifyUserListItemProps> = ({
  item,
  onTap,
  numberOfListeners,
}) => {
  const spotifyUser = item.item
  if (spotifyUser.broadcaster !== null) {
    return null
  }
  return (
    <TouchableHighlight onPress={onTap}>
      <View style={styles.spotifyUserListItem}>
        <View style={styles.spotifyUserContainer}>
          <View style={styles.spotifyUserAvatarContainer}>
            <Image
              style={styles.spotifyUserAvatar}
              source={{ uri: spotifyUser.avatar_url }}
            />
          </View>
          <View style={styles.spotifyUserDisplayNameContainer}>
            <Text style={styles.spotifyUserDisplayName}>
              {spotifyUser.display_name}
            </Text>
            <View />
          </View>
        </View>
        <View style={styles.numberOfListenersContainer}>
          <Text style={styles.numberOfListeners}>
            {numberOfListeners} listeners
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  numberOfListeners: {
    color: "#999",
    fontSize: 10,
    marginRight: 10,
    marginTop: 4,
  },
  numberOfListenersContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
  spotifyUserAvatar: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  spotifyUserAvatarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 20,
  },
  spotifyUserContainer: {
    display: "flex",
    flexDirection: "row",
  },
  spotifyUserDisplayName: {
    color: "dimgray",
    fontSize: 18,
  },
  spotifyUserDisplayNameContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  spotifyUserListItem: {
    borderBottomColor: "#f5f5f5",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    height: 70,
    justifyContent: "space-between",
    marginLeft: 20,
  },
})

export interface ISpotifyUserListItem {
  item: ISpotifyUser
  index: number
}

export default SpotifyUserListItem
