import * as React from "react"
import { Linking } from "expo"
import { NavigationScreenProp } from "react-navigation"
import { AsyncStorage, Button, WebView } from "react-native"

import api from "../../api"
import HeaderTitle from "../../components/HeaderTitle"

interface INavigationOptionsProps {
  navigation: NavigationScreenProp<{}>
}

class AuthenticationScreen extends React.Component<{
  navigation: NavigationScreenProp<{}>
}> {
  public static navigationOptions = (nav: INavigationOptionsProps) => ({
    headerTitle: <HeaderTitle />,
    headerLeft: (
      <Button title="Cancel" onPress={() => nav.navigation.popToTop()} />
    ),
  })

  public componentDidMount() {
    Linking.addEventListener("url", this.saveListenAlongToken)
  }

  public render() {
    return (
      <WebView
        style={{ width: "100%", height: "100%" }}
        source={{ uri: this.listenAlongLink() }}
      />
    )
  }

  private listenAlongLink = () =>
    api.authenticateAndListenToLink(
      this.props.navigation.getParam("broadcasterUsername"),
    )

  private saveListenAlongToken = (link: IListenAlongLink) => {
    const listenAlongToken = Linking.parse(link.url).queryParams.token
    AsyncStorage.setItem("listenAlongToken", listenAlongToken)
    this.props.navigation.popToTop()
  }
}

export default AuthenticationScreen
