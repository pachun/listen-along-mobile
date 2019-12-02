import * as React from "react"
import { Provider } from "react-redux"
import bugsnag from "@bugsnag/expo"

import ErrorScreen from "./screens/ErrorScreen"
import AppNavigator from "./navigators/AppNavigator"
import store from "./store"

const production = !__DEV__

const app = () => {
  const bugsnagClient = bugsnag()
  const BugsnagErrorComponent = bugsnagClient.getPlugin("react")

  return (
    <BugsnagErrorComponent FallbackComponent={ErrorScreen}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </BugsnagErrorComponent>
  )
}

const appWithoutErrorReporting = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
)

export default production ? app : appWithoutErrorReporting
