import { createAppContainer, createStackNavigator } from "react-navigation"

import SpotifyUsersScreen from "./screens/SpotifyUsersScreen"

const AppNavigator = createStackNavigator({
  SpotifyUsers: { screen: SpotifyUsersScreen },
})

export default createAppContainer(AppNavigator)
