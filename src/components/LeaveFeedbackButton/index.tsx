import * as React from "react"
import { TouchableHighlight } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import { FontAwesome } from "@expo/vector-icons"
import { connect } from "react-redux"

import { mySpotifyUserFromState } from "../../selectors"
import styles from "./styles"

interface IProps {
  navigation: NavigationScreenProp<{}>
  mySpotifyUser: ISpotifyUser | undefined
}

class LeaveFeedbackButton extends React.Component<IProps> {
  public render() {
    if (this.props.mySpotifyUser === undefined) {
      return null
    }
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.askForFeedback}
        style={styles.navBarButton}
      >
        <FontAwesome name="support" size={25} color="#333" />
      </TouchableHighlight>
    )
  }

  private askForFeedback = () => {
    this.props.navigation.navigate("FeedbackScreen")
  }
}

const mapStateToProps = (state: IState) => ({
  mySpotifyUser: mySpotifyUserFromState(state),
})

export default connect(mapStateToProps)(LeaveFeedbackButton)
