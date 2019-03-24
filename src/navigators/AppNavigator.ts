import { createAppContainer, createStackNavigator } from "react-navigation"

import SpotifyUsersScreen from "../screens/SpotifyUsersScreen"
import SongDetailsScreen from "../screens/SongDetailsScreen"

const screensWithNavigationHeader = createStackNavigator({
  SpotifyUsersScreen: { screen: SpotifyUsersScreen },
})

const AppNavigator = createStackNavigator(
  {
    SongDetailsScreen: { screen: SongDetailsScreen },
    SpotifyUsersScreen: screensWithNavigationHeader,
  },
  {
    headerMode: "none",
    initialRouteName: "SpotifyUsersScreen",
    mode: "modal",
  },
)

export default createAppContainer(AppNavigator)
