import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableHighlight, Alert} from "react-native";
import { Input } from 'react-native-elements';
import firebase from 'firebase/app';
import auth from 'firebase/auth';
import { isValidEmail } from '../helper/misc-functions';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);

  const signIn = async (email, password) => {
    try {
      let response = await firebase.auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        alert("Log In Successful✅");
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
        <Text style={styles.headerTitle}> Log In </Text>
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
          onPress={() => signIn(email, password)}
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
  
      <TouchableHighlight onPress={() => navigation.navigate('Sign Up')}>
          <Text style={styles.signUpText}>Sign Up?</Text>
      </TouchableHighlight>
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
    fontSize:16
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
  },
  signUpText: {
    color:'white',
    marginTop:20
  }
});

export default LoginScreen;