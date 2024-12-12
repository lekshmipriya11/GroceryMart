import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import InputField from './components/atoms/InputField';
import {GREEN,WHITE_BACK} from './utils/Colors';
import {HOME_CONTAINER_SCREEN, PRODUCT_LIST, REGISTRATION} from './utils/Constant';
import ImageField from './components/atoms/ImageFile';
import SubmitButton from './components/atoms/Button';
import BlackText from './components/atoms/BlackText';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const LogInScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const onUserNameChange = userName => {
    setUserName(userName);
    console.log(userName);
  };
  const onPasswordChange = password => {
    setPassword(password);
  };

  const onLogInPress = () => {
    console.log('Signing');
    navigation.navigate(PRODUCT_LIST);
    isEmpty();
  };

  const onButtonPress = () => {
    console.log('onButtonPress');
    
    isEmpty();
    navigation.navigate(REGISTRATION);
  };

  const isEmpty = () => {
    let isValid = false;

    if (userName.length > 4 && validate(userName)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }

    if (password.length > 4) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
    if (isValidEmail && isValidPassword) {
      doFirebaseLogoIn();
    }
  };

  const showSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  const showError = () => {
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: ' something erroe occuring👋',
    });
  };

  const doFirebaseLogoIn = async () => {
    auth()
      .signInWithEmailAndPassword(userName, password)
      .then(userData => {
        console.log('User account created & signed in!');
        console.log(JSON.stringify(userData));
        showSuccess();
        navigation.replace(HOME_CONTAINER_SCREEN);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        showError();
        console.error(error);
      });
  };

  const validate = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');

      return false;
    } else {
      console.log('Email is Correct');
    }
    return true;
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={{flexGrow: 1}}>
      <ImageField customStyle={{marginLeft: 20, height: 300}} />
      <BlackText label={'Login'} />
      <Text style={styles.textStyle}>Login your product and buy product.</Text>
      <InputField
        label1={'User Name'}
        label2={'Enter User Name'}
        keyboardType={'email-address'}
        customStyle={{marginTop: 20}}
        onChangeText={onUserNameChange}
      />

      <InputField
        label1={'Password'}
        label2={'Enter password'}
        customStyle={{marginTop: 5}}
        onChangeText={onPasswordChange}
        secureTextEntry={true}
      />

      {console.log(isValid)}
      {!isValidEmail && (
        <Text style={styles.errorMsg}>Enter a valid username</Text>
      )}
      {!isValidPassword && (
        <Text style={styles.errorMsg}>Enter a valid Password</Text>
      )}
      <SubmitButton
        label={'Login'}
        onButtonPress={onLogInPress}
        customStyle={{marginTop: 25}}
      />
      <View style={styles.browseView} >
        <Text style={styles.textBrowse}>
          Browse Instead?
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={onButtonPress}
            activeOpacity={1}>
            <Text style={styles.textTouchable}>Continue</Text>
          </TouchableOpacity>
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: WHITE_BACK,
  },
  menuContainer: {
    flexDirection: 'row',
  },
  menuStyles: {
    width: 35,
    height: 35,
  },
  textStyle: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginRight: 20,
  },
  browseView:{
    flexDirection:'row',
    // alignContent:'center',
    alignSelf:'center',
    marginTop:10,

  },
  textBrowse: {
   
    fontSize: 20,
  },
  textTouchable: {
    color: GREEN,
    fontSize: 18,

  },
  errorMsg: {
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 15,
    marginTop: 20,
    color: 'red',
  },
  newUser: {
    marginTop: 100,
    color: GREEN,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
export default LogInScreen;
