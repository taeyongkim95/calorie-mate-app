import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableHighlight, TouchableOpacity, Alert} from "react-native";
import { Input } from 'react-native-elements';
import firebase from 'firebase/app';
import 'firebase/database';
import auth from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { isValidEmail } from '../helper/misc-functions';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Log In')} style={{flexDirection:'row'}}>
          <Ionicons style={{marginLeft:10}} name="chevron-back" size={36} color='#3eb489'/>
          <Text style={{marginTop:6, fontSize:18, color:'#3eb489'}}>Log In</Text>
        </TouchableOpacity>
      ),
    });
  });

  const signUp = () => {
    if (!email) {
      setError("Email required *");
      setValid(false);
      return;
    } else if (!password || password.length < 6) {
      alert("Weak password, it should be a minimum of 6 characters");
      setValid(false);
      return;
    } else if (!isValidEmail(email)) {
      setError("Invalid Email");
      setValid(false);
      return;
    }

    createUser(email, password);
  }

  const createUser = async (email, password) => {
    try {
      let response = await firebase.auth().createUserWithEmailAndPassword(email,password);
      if (response && response.user) {
        alert("Success ✅ Account created successfully");       
        navigation.navigate('Home');
      }
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.2 }}>
        {!!fetching && <ActivityIndicator color={'red'} />}
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}> Sign Up </Text>
      </View>
      <View style={styles.formContainer}>
        <Input
          keyboardType="email-address"
          style={styles.input}
          placeholder="Email"
          onChangeText={text => {
            setError
            setEmail(text)
          }}
          error={isValid}
        />

        <Input
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          error={isValid}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {error ? (
        <View style={styles.errorLabelContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.signInButtonContainerStyle}>
        <TouchableHighlight
          style={styles.signInButtonStyle}
          onPress={() => signUp()}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.signInButtonText}>Continue</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3eb489',
    justifyContent:'center',
    alignItems:'center',
  },
  headerTitle: {
    color:'white',
    fontSize:36
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius:8,
    padding:18,
    marginTop:60,
    marginBottom:20
  },
  input: {
    padding:8,
    borderRadius:8
  },
  errorLabelContainer: {
    backgroundColor: 'white',
    borderRadius:8,
    padding:10,
    marginBottom:20
  },
  errorText: {
    color:'red'
  },
  signInButtonText: {
    borderRadius:8,
    backgroundColor:'#1B4E3B',
    padding:10,
    fontSize:18,
    color:'white'
  }
});

export default SignUpScreen;