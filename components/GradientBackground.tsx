import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const GradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // ゆっくりと無限ループするアニメーション
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 15000, // 15秒かけて変化
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 15000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  // グラデーションの色を補間
  const color1 = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(10, 10, 30, 1)', 'rgba(20, 10, 40, 1)', 'rgba(10, 10, 30, 1)'],
  });

  const color2 = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(20, 10, 40, 1)', 'rgba(30, 20, 60, 1)', 'rgba(20, 10, 40, 1)'],
  });

  const color3 = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(15, 20, 50, 1)', 'rgba(10, 10, 30, 1)', 'rgba(15, 20, 50, 1)'],
  });

  return (
    <AnimatedLinearGradient
      colors={[color1, color2, color3] as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {children}
    </AnimatedLinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
