/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {StatusBar, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {withAuthenticator} from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';

import Router from './src/navigation/Root';
import config from './src/aws-exports';
Amplify.configure(config);

navigator.geolocation = require('@react-native-community/geolocation');

const App: () => Node = () => {
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Uber location permission Permission',
          message:
            'Uber Clone need to answer your location ' +
            'so you can enjoy the ride.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      Geolocation.requestAuthorization();
    }
  }, []);
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      {/* <SearchResults /> */}
      {/* <DestinationSearch /> */}
      {/* <HomeScreen /> */}
      <Router />
    </>
  );
};

export default withAuthenticator(App);
