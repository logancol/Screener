import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text, View, ImageBackground } from 'react-native';

const FadeInOutText = ({ text, duration, delay }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
        delay: delay // Add delay for the fade-in effect
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
        delay: duration // Add delay for the fade-out effect
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/gradient wpp.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <FadeInOutText text="This is your 19th time attempting to open Instagram today" duration={2000} delay={0} />
        <FadeInOutText text="That's pathetic" duration={2000} delay={4000} />
        <FadeInOutText text="You need to do better" duration={2000} delay={8000} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});