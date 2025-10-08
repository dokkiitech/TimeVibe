import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={[
      styles.container,
      isLandscape ? styles.landscape : styles.portrait
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portrait: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  landscape: {
    paddingHorizontal: 60,
    paddingVertical: 20,
    flexDirection: 'column',
    // 横画面時は置き時計を意識したレイアウト
  },
});
