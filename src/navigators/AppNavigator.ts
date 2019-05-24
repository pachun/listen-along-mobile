import { createAppContainer, createStackNavigator } from "react-navigation"

import SpotifyUsersScreen from "../screens/SpotifyUsersScreen"
import SongDetailsScreen from "../screens/SongDetailsScreen"
import AuthenticationScreen from "../screens/AuthenticationScreen"
import FeedbackScreen from "../screens/FeedbackScreen"

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

const feedbackWithNavigationHeader = createStackNavigator({
  Authentication: { screen: FeedbackScreen },
})

const AppNavigator = createStackNavigator(
  {
    SongDetailsScreen: { screen: SongDetailsScreen },
    SpotifyUsersScreen: spotifyUsersWithNavigationHeader,
    AuthenticationScreen: authenticationWithNavigationHeader,
    FeedbackScreen: feedbackWithNavigationHeader,
  },
  {
    headerMode: "none",
    initialRouteName: "SpotifyUsersScreen",
    mode: "modal",
  },
)

export default createAppContainer(AppNavigator)
