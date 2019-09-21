import { createAppContainer, createStackNavigator } from "react-navigation"

import SpotifyUsersScreen from "../screens/SpotifyUsersScreen"
import AuthenticationScreen from "../screens/AuthenticationScreen"

import Constants from "expo-constants"
import { ScreenOrientation } from "expo"

if (Constants.deviceName.includes("iPad")) {
  ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL)
}

export default createAppContainer(
  createStackNavigator(
    {
      BroadcastersScreen: { screen: SpotifyUsersScreen },
      AuthenticationScreen: { screen: AuthenticationScreen },
    },
    { headerMode: "none" },
  ),
)
