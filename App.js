/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Linking,
  Navigator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';

// import {Router, Scene} from 'react-native-router-flux';

import Camera from './components/BBCam.js';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const handleSend = () => {
    console.log('helo');
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen name="Camera" component={Camera} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <View>
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
        <Button title="send" onPress={handleSend} />
      </View>
      <Camera /> */}
    </>
  );
};

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

export default App;
