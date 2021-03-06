import React from 'react';
import {View, Text, Pressable} from 'react-native';
import UberTypeRow from '../UberTypeRow';
import styles from './styles';

import typesData from '../../assets/data/types';

const UberTypes = ({typeState, onSubmit}) => {
  const [selectedType, setSelectedType] = typeState;

  return (
    <View>
      {typesData.map((type, index) => (
        <UberTypeRow
          type={type}
          key={index}
          isSelected={type.type === selectedType}
          onPress={() => setSelectedType(type.type)}
        />
      ))}

      <Pressable
        onPress={onSubmit}
        style={{
          width: '100%',
          backgroundColor: 'black',
          padding: 10,
          margin: 10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          {' '}
          Confirm
        </Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;
