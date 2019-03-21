import axios from "axios"
import { Linking } from "expo"
import { AsyncStorage } from "react-native"
import reactNativeActioncable from "react-native-actioncable"

const listenAlongToken = async () =>
  await AsyncStorage.getItem("listenAlongToken")

const baseURL = __DEV__
  ? "http://localhost:3000"
  : "https://listen-along-api.herokuapp.com/"

const websocketURL = __DEV__
  ? "ws://localhost:3000/cable"
  : "ws://listen-along-api.herokuapp.com/cable"

const api = {
  authenticateAndListenTo: async (broadcasterUsername: string) => {
    return Linking.openURL(
      `${baseURL}/registering_spotify_users/new?broadcaster_username=${broadcasterUsername}&mobile=true`,
    )
  },

  cable: reactNativeActioncable.createConsumer(websocketURL),

  listenAlong: async (broadcasterName: string) => {
    const client = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${await listenAlongToken()}` },
    })
    return client.get(`/listen_along?broadcaster_username=${broadcasterName}`)
  },

  spotifyUsers: async () => {
    const client = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${await listenAlongToken()}` },
    })
    return (await client.get(`/spotify_users`)).data
  },
}

export default api
