import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

  // グラデーションの色を補間
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      'rgb(10, 10, 30)',    // 深い青黒
      'rgb(20, 10, 40)',    // 紫がかった黒
      'rgb(10, 10, 30)',    // 深い青黒に戻る
    ],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <LinearGradient
        colors={['rgba(30, 20, 60, 0.3)', 'rgba(10, 10, 30, 0.5)', 'rgba(20, 30, 50, 0.3)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </Animated.View>
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
