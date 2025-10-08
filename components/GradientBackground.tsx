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
          duration: 10000, // 10秒かけて変化
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  // グラデーションの色を補間（幅広い変化）
  const color1 = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(10, 10, 35, 1)', 'rgba(60, 30, 90, 1)', 'rgba(10, 10, 35, 1)'],
  });

  const color2 = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(20, 10, 50, 1)', 'rgba(30, 60, 90, 1)', 'rgba(20, 10, 50, 1)'],
  });

  const color3 = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(5, 25, 60, 1)', 'rgba(50, 20, 70, 1)', 'rgba(5, 25, 60, 1)'],
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
