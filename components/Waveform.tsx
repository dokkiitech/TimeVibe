import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface WaveformProps {
  isPlaying: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ isPlaying }) => {
  const bar1Anim = useRef(new Animated.Value(5)).current;
  const bar2Anim = useRef(new Animated.Value(5)).current;
  const bar3Anim = useRef(new Animated.Value(5)).current;

  const createAnimation = (animValue: Animated.Value, delay: number) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 15, // Less intense
          duration: 600, // Slower
          delay,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 5,
          duration: 600, // Slower
          useNativeDriver: false,
        }),
      ])
    );
  };

  useEffect(() => {
    const animations = [
      createAnimation(bar1Anim, 0),
      createAnimation(bar2Anim, 300),
      createAnimation(bar3Anim, 600),
    ];

    if (isPlaying) {
      animations.forEach((anim) => anim.start());
    } else {
      animations.forEach((anim) => anim.stop());
      bar1Anim.setValue(5);
      bar2Anim.setValue(5);
      bar3Anim.setValue(5);
    }

    return () => {
      animations.forEach((anim) => anim.stop());
    };
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { height: bar1Anim }]} />
      <Animated.View style={[styles.bar, { height: bar2Anim }]} />
      <Animated.View style={[styles.bar, { height: bar3Anim }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 25,
    height: 25,
    marginRight: 10, // Changed from marginLeft
  },
  bar: {
    width: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 2,
  },
});

export default Waveform;
