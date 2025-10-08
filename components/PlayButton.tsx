import React from 'react';
import { TouchableOpacity, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PlayButtonProps {
  isPlaying: boolean;
  onPress: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, onPress }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isLandscape ? styles.buttonLandscape : styles.buttonPortrait
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={isLandscape ? 48 : 40}
          color="#FFFFFF"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonPortrait: {
    bottom: 40,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonLandscape: {
    bottom: 30,
    right: 30,
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
