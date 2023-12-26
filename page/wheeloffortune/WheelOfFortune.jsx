import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';

import {GoGoSpin} from 'react-native-gogo-spin';

import kingIm from '../../assets/king.png';
import prizeIm from '../../assets/prize.png';
import whlIm from '../../assets/wheel.png';
import btnIm from '../../assets/btn.png';

const prize = [
  {name: 'x999', image: kingIm},
  {name: 'x10', image: prizeIm},
  {name: 'x50', image: prizeIm},
  {name: 'x80', image: prizeIm},
  {name: 'x100', image: prizeIm},
  {name: 'x200', image: prizeIm},
];
const SIZE = 300;
const WheelOfFortune = () => {
  const spinRef = useRef(null);
  const [prizeIdx, setprizeIdx] = useState(-1);
  const doSpin = () => {
    const getIdx = Math.floor(Math.random() * prize.length);
    setprizeIdx(getIdx);
    spinRef?.current?.doSpinAnimate(getIdx);
  };
  const onEndSpin = endSuccess => {
    console.log('endSuccess', endSuccess);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.prizeText}>
          REWARD: {prizeIdx !== -1 ? prize[prizeIdx]?.name : ''}
        </Text>
        <Image source={prize[prizeIdx]?.image} style={styles.itemWrap} />
      </View>
      <View style={styles.centerWheel}>
        <GoGoSpin
          onEndSpinCallBack={onEndSpin}
          notShowDividLine={true}
          spinDuration={2000}
          spinReverse={true}
          spinTime={3}
          ref={spinRef}
          width={SIZE}
          height={SIZE}
          radius={SIZE / 2}
          data={prize}
          offsetEnable={true}
          source={whlIm}
          renderItem={(data, i) => {
            return (
              <View key={i} style={styles.itemWrapper}>
                <Text style={styles.prizeText}>{data.name}</Text>

                <Image source={data.image} style={styles.itemWrap} />
              </View>
            );
          }}
        />
        <TouchableOpacity style={styles.spinWarp} onPress={doSpin}>
          <Image source={btnIm} style={styles.spinBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  startText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  prizeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerWheel: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinBtn: {width: 105, height: 124},
  spinWarp: {position: 'absolute'},
  itemWrap: {width: 40, height: 40},
});
export default WheelOfFortune;
