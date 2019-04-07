import { createAppContainer, createStackNavigator } from "react-navigation"

import SpotifyUsersScreen from "../screens/SpotifyUsersScreen"
import SongDetailsScreen from "../screens/SongDetailsScreen"
import AuthenticationScreen from "../screens/AuthenticationScreen"

const spotifyUsersWithNavigationHeader = createStackNavigator({
  SpotifyUsersScreen: { screen: SpotifyUsersScreen },
})

const authenticationWithNavigationHeader = createStackNavigator({
  Authentication: { screen: AuthenticationScreen },
})

const AppNavigator = createStackNavigator(
  {
    SongDetailsScreen: { screen: SongDetailsScreen },
    SpotifyUsersScreen: spotifyUsersWithNavigationHeader,
    AuthenticationScreen: authenticationWithNavigationHeader,
  },
  {
    headerMode: "none",
    initialRouteName: "SpotifyUsersScreen",
    mode: "modal",
  },
)

export default createAppContainer(AppNavigator)
