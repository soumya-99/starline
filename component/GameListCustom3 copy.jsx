import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';

export default function GameListCustom3({
  item,
  index,
  navigateTo,
  bgColor = 'rgba(255, 255, 255, 0.2)',
  textColor = 'rgba(0, 0, 0, 1)',
  img,
  navigation,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GameTime', {
          game_id: item.game_id,
          game_name: item.game_name,
        })
      }
      style={{width: '100%'}}>
      <View
        style={{
          backgroundColor: bgColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: normalize(10),
          paddingVertical: normalize(35),
          paddingHorizontal: normalize(5),
          alignItems: 'center',
          marginBottom: normalize(10),
          marginTop: normalize(10),
          marginLeft: normalize(10),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        }}>
        <View
          style={{
            position: 'absolute',
            height: normalize(100),
            width: normalize(100),
            padding: normalize(5),
          }}>
          <Image
            source={img}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <Text
          style={{
            fontSize: normalize(23),
            fontWeight: '900',
            color: textColor,
            left: normalize(80),
            maxWidth: '70%',
            textAlign: 'center',
            width: '70%',
          }}>
          {item.game_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
