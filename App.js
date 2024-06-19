import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text, View, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';

const FadeInOutText = ({ text, duration }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
        delay: duration, // Add delay for the fade-out effect
      })
    ]).start();
  }, [fadeAnim, duration]);
  
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const Main = () => {
  const [caption, setCaption] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(true);

  useEffect(() => {
    const captionData = displayCaption();
    setCaption(captionData);
  }, []);

  useEffect(() => {
    if (caption.length > 0 && currentLineIndex < caption.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prevIndex => prevIndex + 1);
      }, 5000); // Change line every 5 seconds
      setShowCaption(true);
      console.log(showCaption);
      return () => clearTimeout(timer);
    } else {
      setShowCaption(false);
    }
  }, [currentLineIndex, caption.length]);
  
  const handleGoButtonPress = () => {
    // Handle the Go button press action here
    console.log('Go button pressed');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('./assets/1.png')}
        style={styles.background}
        resizeMode="contain"
      >
        <View style={styles.container}>
          {caption.map((paragraph, index) => (
            index === currentLineIndex && (
              <FadeInOutText key={index} text={paragraph} duration={1500} />
            )
          ))}
          {!showCaption && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleGoButtonPress}
            >
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

function displayCaption() {
  const captionList = [
    'This is your 19th time attempting to open Instagram today. That\'s pathetic. Do better.',
    'Trying to open Instagram? They didn\'t DM you back pal. It\'s not even worth checking at this point. Go outside.',
    'Hey. Stop that. Dumbass.',
    'Guess what. Guess whattt. Guess whattttt! Ahem. Eat shit and die you fucking bastard.',
    'I read an article that said: If you open Instagram one more time, you\'re a fucking virgin loser lmaooo',
  ];

  var randomNumber = Math.floor(Math.random() * captionList.length);
  const selectedCaption = captionList[randomNumber].split("");

  const selectedCaptionLineByLine = [];
  var numberOfLines = 0;
  var placeholder = "";
  
  for (let i = 0; i < selectedCaption.length; i++) {
    if (!(selectedCaption[i] == "." || selectedCaption[i] == "?" || selectedCaption[i] == "!" || selectedCaption[i] == "," || selectedCaption[i] == ":")) {
      placeholder += selectedCaption[i];
    } else {
      placeholder += selectedCaption[i];
      selectedCaptionLineByLine[numberOfLines] = placeholder;
      numberOfLines++;
      placeholder = "";
    }
  }

  if (placeholder.length > 0) {
    selectedCaptionLineByLine[numberOfLines] = placeholder;
  }

  return selectedCaptionLineByLine;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'pink',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Main;