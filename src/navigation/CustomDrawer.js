import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Auth } from 'aws-amplify'

const CustomDrawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#212121', padding: 15}}>
        {/** Profile */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#cacaca',
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
              }}>
              Sheriff Shittu
            </Text>
            <Text
              style={{
                color: 'lightgrey',
              }}>
              5.0 *
            </Text>
          </View>
        </View>

        {/** message */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#919191',
            borderTopWidth: 1,
            borderTopColor: '#919191',
            paddingVertical: 5,
            marginVertical: 10,
          }}>
          <Pressable
            onPress={() => {
              console.warn('msg');
            }}>
            <Text style={{color: '#ddd', paddingVertical: 5}}>Messages</Text>
          </Pressable>
        </View>
        {/* Do more */}
        <Pressable
          onPress={() => {
            console.warn('do more driving');
          }}>
          <Text style={{color: '#ddd', paddingVertical: 5}}>
            Do more with your account
          </Text>
        </Pressable>
        {/* Make Money */}
        <Pressable
          onPress={() => {
            console.warn('make money');
          }}>
          <Text style={{color: 'white', paddingVertical: 5}}>
            Make money driving
          </Text>
        </Pressable>
      </View>
      <DrawerItemList {...props} />
      {/*  Logout */}
      <Pressable
        onPress={() => {
          {Auth.signOut()}
        }}>
        <Text style={{padding: 5, paddingLeft: 20}}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
