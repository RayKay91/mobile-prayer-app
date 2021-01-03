import React from 'react'
import { StyleSheet, Text } from 'react-native';
import * as Linking from 'expo-linking';

export default function Anchor({href, children, style}){
  const handlePress = () => {
    Linking.openURL(href);
  };


    return (
      <Text style={[styles.text, style]} onPress={handlePress}>
        {children}
      </Text>
    );
  }

  const styles = StyleSheet.create({
     
        text: {
            fontWeight: '600',
            fontSize: 16
        }
      
  })
