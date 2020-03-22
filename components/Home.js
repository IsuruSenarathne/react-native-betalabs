import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import _ from 'lodash';
import Mailer from 'react-native-mail';
import Permissions from 'react-native-permissions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('this.props.route.params>>>>>>>>', this.props.route.params);
  //   console.log('prevProps.route.params', prevProps.route.params);
  //   if (_.isEmpty(prevProps.route.params.destPath)) {
  //     // const destPath = this.props.route.params
  //     //   ? this.props.route.params.destPath
  //     //   : '';
  //     this.setState({destPath});
  //   }
  // }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('localImg');
      console.log({value});

      if (value !== null) {
        // We have data!!
        this.setState({photo: value});
      } else {
        Alert.alert('Please include a photo');
      }
    } catch (error) {
      Alert.alert(error);
      // Error retrieving data
    }
  };

  handleEmail = async () => {
    await this.retrieveData();
    Mailer.mail(
      {
        subject: 'need help',
        recipients: ['support@example.com'],
        ccRecipients: ['supportCC@example.com'],
        bccRecipients: ['supportBCC@example.com'],
        body: '<b>A Bold Body</b>',
        isHTML: true,
        attachment: {
          path: this.state.photo, // The absolute path of the file from which to read data.
          type: 'jpg', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          name: 'Photo', // Optional: Custom filename for attachment
        },
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };

  render() {
    console.log('his.state', this.state);
    return (
      <>
        <View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Step One</Text>
            <Text style={styles.sectionDescription}>
              Before you can send emails with ColdFusion, a mail server you want
              to use needs to be set. Configuring the mail server can be done in
              the ColdFusion Administrator. If you do not have a mail server of
              your own, your localhost can act as a mail server. ColdFusion will
              act normally, but since there is no mail server set up on your
              localhost, emails will not arrive at their destination. Another
              option is to use the mail server of Gmail (a Gmail account is
              required for this). The settings for this mail server can be found
              at the end of this section.
            </Text>
          </View>
          <Button
            title="Open camera"
            onPress={() =>
              this.props.navigation.navigate('Camera', {name: 'Jane'})
            }
          />
          <Button title="Send" onPress={() => this.handleEmail()} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    padding: 40,
    // fontFamily: 'BellotaText-Bold'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: '600',
    fontFamily: 'BellotaText-BoldItalic',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    fontFamily: 'BellotaText-SemiBoldItalic',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Home;
