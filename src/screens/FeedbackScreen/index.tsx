import * as React from "react"
import { Alert, Text, TextInput, TouchableHighlight, View } from "react-native"
import { NavigationScreenProp } from "react-navigation"
import { Ionicons } from "@expo/vector-icons"

import api from "../../api"
import HeaderTitle from "../../components/HeaderTitle"
import styles from "./styles"

interface IProps {
  navigation: NavigationScreenProp<{}>
}

interface INavigationOptionsProps {
  navigation: NavigationScreenProp<{}>
}

class FeedbackScreen extends React.Component<IProps> {
  public static navigationOptions = (props: INavigationOptionsProps) => {
    return {
      headerTitle: <HeaderTitle />,
      headerLeft: (
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.cancelNavBarButton}
          onPress={() => props.navigation.popToTop()}
        >
          <Ionicons name="ios-close" size={45} color="#333" />
        </TouchableHighlight>
      ),
    }
  }

  public emptyStatePrompt = "so please..."
  public feedbackField: React.RefObject<{}>

  public state = {
    feedback: "",
    emptyStatePrompt: this.emptyStatePrompt,
  }

  public render() {
    return (
      <View>
        <Text style={styles.header}>we ❤️ your feedback!</Text>
        <Text style={styles.prompt}>{this.state.emptyStatePrompt}</Text>
        <TextInput
          multiline={true}
          style={styles.feedback}
          underlineColorAndroid="transparent"
          returnKeyType="done"
          placeholder="Share a thought"
          placeholderTextColor="#ddd"
          autoFocus={true}
          enablesReturnKeyAutomatically={true}
          value={this.state.feedback}
          blurOnSubmit={true}
          onChangeText={this.updateFeedback}
          onSubmitEditing={this.doneEditing}
          ref={input => (this.feedbackField = input)}
        />
      </View>
    )
  }

  private updateFeedback = (feedback: string) => {
    this.setState({
      feedback,
      emptyStatePrompt: feedback === "" ? this.emptyStatePrompt : "",
    })
  }

  private doneEditing = ({ nativeEvent: { text } }) => {
    Alert.alert("Send Note?", "", [
      { text: "Yes", onPress: this.submitFeedback(text) },
      { text: "No", onPress: this.feedbackField.focus },
    ])
  }

  private submitFeedback = (feedback: string) => () => {
    api.createFeedback(feedback)
    this.props.navigation.popToTop()
    Alert.alert("Thanks for your feedback!")
  }
}

export default FeedbackScreen
