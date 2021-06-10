import React, {useState,useEffect} from 'react';
import { View, KeyboardAvoidingView, Image, TextInput, Platform, TouchableOpacity, Text, StyleSheet, Animated, Keyboard, PasswordToggleInput } from 'react-native';
import Constants from 'expo-constants';
import {MaterialCommunityIcons as Icon } from '@expo/vector-icons'

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';


export default function App() {

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 300, y: 104}));

  useEffect(()=> {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y,{
      toValue : 0,
      speed:4,
      bounciness: 20
    }),
    Animated.timing(opacity,{
      toValue: 1,
      duration: 1500,
    })
    ]).start();
  })

  function keyboardDidShow(){
    Animated.parallel([
      Animated.spring(logo.x,{
        toValue: 292,
        duration: 100,
        bounciness: 0
      }),
      Animated.spring(logo.y,{
        toValue: 100,
        duration: 100,        
        bounciness: 0
      })
    ]).start();
  }

  function keyboardDidHide(){
    Animated.parallel([
      Animated.spring(logo.x,{
        toValue: 332,
        duration: 100,
      }),
      Animated.spring(logo.y,{
        toValue: 114,
        duration: 100,
      })
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={styles.containerLogo}>
        <Animated.Image style={{
          width: logo.x,
          height: logo.y,
        }}
        source={require('./assets/americaLogo.png')}
        />
      </View>
      <Animated.View 
      style={[styles.container,
      {
        opacity: opacity,
        transform: [
          {translateY: offset.y }
        ]
      }
      ]}>
        <TextInput
          style={styles.input}
          placeholder = 'Email'
          autoCorrect={false}
          onChangeText={()=> {}}>
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder = 'Senha'
          secureTextEntry = {true}
          autoCorrect={false}
          onChangeText={()=> {}}>
        </TextInput>
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.textSubmit}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.textRegister}> Criar Conta Gratuita</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#212121'
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",  
  },
  container:{
    flex: 1,
    alignItems:"center",
    width: '90%',
  },
  input:{
    backgroundColor: '#f7f7f7',
    marginBottom: 15,
    width: '90%',
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit:{
    backgroundColor: "#35aaff",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7
  },
  textSubmit:{
    color: "#fff",
    fontSize: 18,
  },
  btnRegister:{
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  textRegister:{
    color: '#fff',
  },
});



























