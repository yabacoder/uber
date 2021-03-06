import React from 'react';
import {Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const OrderMap = ({car}) => {
  const getImage = type => {
    if (type === 'UberX') {
      return require('../../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../../assets/images/top-Comfort.png');
    }

    return require('../../assets/images/top-UberXL.png');
  };

  return (
    // <View
    //   style={{
    //     height: 300,
    //     backgroundColor: '#a0abff',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    <MapView
      style={{height: '100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {car && (
        <Marker
          key={car.id}
          coordinate={{latitude: car.latitude, longitude: car.longitude}}>
          <Image
            style={{
              width: 70,
              height: 80,
              resizeMode: 'contain',
              transform: [
                {
                  rotate: `${car.heading}deg`,
                },
              ],
            }}
            source={getImage(car.type)}
          />
        </Marker>
      )}
    </MapView>
    // </View>
  );
};

export default OrderMap;
