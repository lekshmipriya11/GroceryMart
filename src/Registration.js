import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,

  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {HOME,PASS_MIN_THRESHOLD} from './utils/Constant';
import BlackText from './components/atoms/BlackText';
import GreenText from './components/atoms/GreenText';
import SubmitButton from './components/atoms/Button';
import InputField from './components/atoms/InputField';
import { BLACK, GREEN, WHITE_BACK } from './utils/Colors';

const RegistationScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidUserName, setValidUserName] = useState(true);
  const [isValidPassword, setValidPassword] = useState(true);
  const [isValidConfirmPassword, setValidConfirmPassword] = useState(true);

  const onUserNameChange = userName => {
    setUserName(userName);
    console.log(userName);
  };
  const onPasswordChange = password => {
    setPassword(password);
    console.log(password);
  };
  const onConfirmPasswordChange = confirmPassword => {
    setConfirmPassword(confirmPassword);
    console.log(confirmPassword);
  };

  // const onSignInPress = () => {
  //   console.log('Signing');
  //   //
  //   isEmpty();
  // };
  const onButtonPress = () => {
    console.log('onButtonPress');
    // navigation.navigate(LOGIN);
    console.log('user created');
    isEmpty();
  };

  const isEmpty = () => {
    let isValidUser = false;
    let isValidPass = false;
    let isValidConfirm = false;
    if (userName.length > PASS_MIN_THRESHOLD && validate(userName)) {
      setValidUserName(true);
      isValidUser = true;
     } else {
      setValidUserName(false);
      isValidUser = false;
    }
    console.log(password);

    if (password.length > PASS_MIN_THRESHOLD) {
      console.log('password true');
      setValidUserName(true);
      isValidPass = true;
    } else {
      console.log('password false');
      isValidPass = false;
      setValidConfirmPassword(false);
    }
    if (confirmPassword.toLocaleString(password)) {
      console.log(isValidConfirmPassword);
      isValidConfirm = true;
      setValidConfirmPassword(true);
    } else {
      isValidConfirm = false;
      setConfirmValid(false);
    }
   
    if (isValidUser && isValidPass && isValidConfirm) {
      doFirebaseLogin();
    }
  };


  const doFirebaseLogin = async () => {
    auth()
      .createUserWithEmailAndPassword(userName, password)
      .then(userData => {
        console.log('User account created & signed in!');
        console.log(JSON.stringify(userData));
        navigation.replace(HOME);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');

      return false;
    } else {
      console.log('Email is Correct');
      return true;
    }
    
  };

  return (
    <ScrollView style={styles.mainView} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.menuContainer}>
        <GreenText label= {'Registration'} customStyle={{marginLeft:120, marginTop:50, fontSize:20}} />
        <BlackText label={'Welcome To Our Grocery Store'} customStyle={{marginLeft:50, marginTop:20}}/>
        <InputField
          label1={'Name'}
          label2={'Ente your name '}
          customStyle={{marginTop: 5}}
          onChangeText={onConfirmPasswordChange}
        />
        <InputField
          label1={'Mobile Number'}
          label2={'Ente your mobile number'}
          customStyle={{marginTop: 5}}
          onChangeText={onConfirmPasswordChange}
        />
        <InputField
          label1={'User Name'}
          label2={'Enter User Name'}
          keyboardType={'email-address'}
          customStyle={{marginTop: 5}}
          onChangeText={onUserNameChange}
          
        />
        {console.log(isValid)}
        {!isValidUserName && (
          <Text style={styles.errorMsg}>Enter a valid username</Text>
        )}

        <InputField
          label1={'Password'}
          label2={'Enter password '}
          // secureTextEntry={}
          customStyle={{marginTop: 5}}
          onChangeText={onPasswordChange} 
          secureTextEntry={true}
                  />
        {!isValidPassword && (
          <Text style={styles.errorMsg}>Enter a valid Password</Text>
        )}

        <InputField
          label1={'Confirm Password'}
          label2={'Ente confirm your password '}
          customStyle={{marginTop: 5}}
          onChangeText={onConfirmPasswordChange}
          secureTextEntry={true}
        />

        {!isValidConfirmPassword && (
          <Text style={styles.errorMsg}>Enter a valid Password</Text>
        )}

           <SubmitButton label={'Submit'} onButtonPress={onButtonPress} customStyle={{marginLeft:20, marginTop:50, fontSize:20}} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: WHITE_BACK,
  },
  headerText: {
    marginTop: 0,
    color: GREEN,
    marginLeft: 10,
    fontSize: 20,
    alignSelf: 'center',
  },
  logStyles: {
    width: '80%',
    height: 50,
  },
  titleText: {
    marginTop: 10,
    color: GREEN,
    marginLeft: 10,
    fontSize: 16,
  },
  inputText: {
    borderColor: BLACK,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 10,
    color: '#808080',
  },
  existaccount: {
    marginTop: 100,
    color: GREEN,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorMsg: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15,
    color: 'Red',
  },

});
export default RegistationScreen;
