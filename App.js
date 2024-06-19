import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text, View, ImageBackground, SafeAreaView } from 'react-native';

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
      <FadeInOutText Text style={styles.text}>{text}</FadeInOutText>
    </Animated.View>
  );
};

export default function main() { 
  
  const caption = displayCaption()
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('./assets/1.png')}
        style={styles.background}
        resizeMode="contain" // Adjust the resize mode to contain
      >
        <View style={styles.container}>
          {caption.map((paragraph, index) => (
            <Text key={index} style={styles.text}>{paragraph}</Text>
          ))}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
 
}

function displayCaption() { //caption displayed when app is activated
  
  const captionList = [ //list of possible captions when app is triggered
    'This is your 19th time attempting to open Instagram today. That\'s pathetic. Do better.',
    'Trying to open Instagram? They didn\’t DM you back pal. It\’s not even worth checking at this point. Go outside.',
    'Hey. Stop that. Dumbass.',
    'Guess what. Guess whattt. Guess whattttt! Ahem. Eat shit and die you fucking bastard.',
    'I read an article that said: If you open Instagram one more time, you\’re a fucking virgin loser lmaooo',

  ]
  
  var randomNumber = Math.floor(Math.random() * captionList.length)  //random array position of captionList

  const selectedCaption = captionList[randomNumber].split("")  //creates a char array of randomly selected caption

  const selectedCaptionLineByLine = []   //to store the caption line by line, with each line in its own index position
  var numberOfLines = 0  //used to keep track of the number of lines in the caption
  
  var placeholder = ""; //temp storage for segments of the caption
  for (let i = 0; i < selectedCaption.length; i++) { //filters the caption into an array where each index stores a line of the caption to be displayed
    if (!(selectedCaption[i] == "." || selectedCaption[i] == "?" || selectedCaption[i] == "!" || selectedCaption[i] == "," || selectedCaption[i] == ":")) {  
      placeholder += selectedCaption[i] //adds characters to the placeholder from selectedCaption until one of the above punctuation marks is reached 
    }
    else { 
      placeholder += selectedCaption[i] 
      selectedCaptionLineByLine[numberOfLines] = placeholder //sets current index of selectedCaptionLineByLine (based on value of numberOfLines) to a line of the chosen caption
      numberOfLines++  //move to next index of selectedCaptionLineByLine 
      placeholder = "" //resets placeholder
    }
  }

  console.log(selectedCaptionLineByLine)
  return (
    selectedCaptionLineByLine
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1, // Ensure the SafeAreaView covers the entire screen
  },
  background: {
    flex: 1, // Ensure the ImageBackground covers the entire screen
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
