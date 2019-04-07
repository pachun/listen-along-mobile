import { createAppContainer, createStackNavigator } from "react-navigation"

import SpotifyUsersScreen from "../screens/SpotifyUsersScreen"
import SongDetailsScreen from "../screens/SongDetailsScreen"
import AuthenticationScreen from "../screens/AuthenticationScreen"

import { Constants, ScreenOrientation } from "expo"
if (Constants.deviceName.includes("iPad")) {
  ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL)
}

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
