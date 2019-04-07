import axios from "axios"
import { AsyncStorage } from "react-native"
import reactNativeActioncable from "react-native-actioncable"

const listenAlongToken = async () =>
  await AsyncStorage.getItem("listenAlongToken")

const dev = __DEV__

const baseURL = dev
  ? "http://localhost:3000"
  : "https://listen-along-api.herokuapp.com/"

const websocketURL = dev
  ? "ws://localhost:3000/cable"
  : "ws://listen-along-api.herokuapp.com/cable"

const api = {
  cable: reactNativeActioncable.createConsumer(websocketURL),

  authenticateAndListenToLink: (broadcasterUsername: string) => {
    return `${baseURL}/registering_spotify_users/new?broadcaster_username=${broadcasterUsername}&mobile=true`
  },

  spotifyUsers: async () => {
    const client = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${await listenAlongToken()}` },
    })
    return (await client.get(`/spotify_users`)).data
  },

  listenAlong: async (broadcasterName: string) => {
    const client = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${await listenAlongToken()}` },
    })
    return client.post("/listen_along", {
      broadcaster_username: broadcasterName,
    })
  },

  addSongToMyLibrary: async (songId: string) => {
    const client = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${await listenAlongToken()}` },
    })
    return client.put("/add_to_library", {
      song_id: songId,
    })
  },
}

export default api
