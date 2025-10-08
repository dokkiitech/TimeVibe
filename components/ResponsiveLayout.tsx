import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const isLandscape = dimensions.width > dimensions.height;

  return (
    <View style={[styles.container, isLandscape ? styles.landscape : styles.portrait]}>
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
  },
  landscape: {
    paddingHorizontal: 40,
    // 横画面時は置き時計を意識したレイアウト
  },
});
