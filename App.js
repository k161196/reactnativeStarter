/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MaskedView from '@react-native-community/masked-view';

import FastImage from 'react-native-fast-image'

import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import { enableScreens } from 'react-native-screens';





enableScreens();



const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  console.log('[App.js]::getData')
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value !== null) {
      console.log('[App.js]::value',typeof value,value)
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
}


import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Modal from "react-native-modal";
import { BoxShadow} from 'react-native-shadow'


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 60,
                color: 'black',
                fontWeight: 'bold'
              }}
            >
              Basic Mask
            </Text>
          </View>
        }
      >
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#e1e1e1' }} />
      </MaskedView>
      <Icon.Button name="facebook" backgroundColor="#3b5998">
        <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
          Login with Facebook
        </Text>
      </Icon.Button>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}


const shadowOpt = {
  width: 100,
  height: 100,
  color: "#000",
  border: 2,
  radius: 3,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 }
}

function NotificationsScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FastImage
        style={{ width: 200, height: 200 }}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          Sign in with Facebook
        </Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Button title="Show modal" onPress={toggleModal} />

        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>

            <Button title="Hide modal" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
      <View style={{ flex: 1 }}>
        <BoxShadow setting={shadowOpt}>
          <View style={{ width: 100, height: 100 }} />
        </BoxShadow>
      </View>
      <SvgUri
        width="50%"
        height="50%"
        uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
      />
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  storeData('kiran')
  getData()

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Icon.Button name="facebook" backgroundColor="#3b5998">
    //       <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
    //         Login with Facebook
    //       </Text>
    //     </Icon.Button>
        
       
    //   </ScrollView>
    // </SafeAreaView>


<NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default App;
