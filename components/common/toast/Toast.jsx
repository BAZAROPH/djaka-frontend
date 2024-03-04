import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Toast = ({ text, textColor, backgroundColor, duration }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();

    setTimeout(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }
      ).start();
    }, duration);
  }, [fadeAnim, duration]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, backgroundColor: backgroundColor || 'rgba(0, 0, 0, 0.7)' },
      ]}
    >
      <Text style={[styles.text, { color: textColor || 'white' }]}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    top: '50%',
    left: '10%',
    right: '10%',
    zIndex: 200
  },
  text: {
    fontSize: 16,
    fontFamily: 'montserrat-bold',
    textAlign: 'center'
  },
});

export default Toast;
