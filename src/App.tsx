import * as React from "react"
import { Provider } from "react-redux"

import AppNavigator from "./navigators/AppNavigator"
import store from "./store"

export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
)
