import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AlertMessages,
  FormPageTypeText,
  PageTypes,
} from '../constants/FormConstants';
import {login} from '../api/Login';

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
let passwordReg = /^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/;

const LoginForm = props => {
  const {setIsLoggedIn} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [pageType, setPageType] = useState(PageTypes.log_in);
  const [showPassword, toggleShowPassword] = useState(true);
  const [validEmailColor, updateValidEmailColor] = useState('black');
  const [validPasswordColor, updateValidPasswordColor] = useState('black');

  useEffect(() => {
    if (!reg.test(email)) {
      updateValidEmailColor('red');
    } else {
      updateValidEmailColor('green');
    }
  }, [email]);

  useEffect(() => {
    if (!passwordReg.test(password)) {
      updateValidPasswordColor('red');
    } else {
      updateValidPasswordColor('green');
    }
  }, [password]);

  const handleSubmitButtonClick = async () => {
    Keyboard.dismiss();
    if (email === '' || password === '') {
      Alert.alert(AlertMessages.empty);
      return;
    }
    if (!reg.test(email)) {
      Alert.alert('Invalid Email', AlertMessages.invalidEmail);
      return;
    }
    if (!passwordReg.test(email)) {
      Alert.alert('Invalid Password', AlertMessages.invalidPassword);
      return;
    }

    if (pageType === PageTypes.sign_up) {
      setIsLoggedIn(true);
      changePageType();
    } else {
      try {
        const isSuccessful = await login({email, password});
        Alert.alert(
          isSuccessful ? AlertMessages.success : AlertMessages.failed,
        );
        setIsLoggedIn(isSuccessful);
      } catch (e) {}
    }

    setEmail('');
    setPassword('');
    setName('');
  };
  const changePageType = () => {
    setPageType(prevPageType =>
      prevPageType === PageTypes.log_in ? PageTypes.sign_up : PageTypes.log_in,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.pageHeader}>{pageType}</Text>
        <View style={styles.inputFieldsContainer}>
          {pageType === PageTypes.sign_up && (
            <TextInput
              style={styles.inputField}
              placeholder="Enter your name"
              borderBottomColor="black"
              value={name}
              onChangeText={text => setName(text)}
            />
          )}
          <TextInput
            style={styles.inputField}
            placeholder="Your Email Id"
            borderBottomColor={validEmailColor}
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.inputField}
            secureTextEntry={!showPassword}
            borderBottomColor={validPasswordColor}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <View style={styles.passwordInput}>
            <TouchableOpacity onPress={() => toggleShowPassword(!showPassword)}>
              <Image
                source={
                  showPassword
                    ? require('../assets/hide.png')
                    : require('../assets/view.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitButtonClick}>
              <Text style={{fontSize: 19, fontWeight: 'bold', color: 'white'}}>
                {' '}
                {pageType !== PageTypes.log_in
                  ? PageTypes.sign_up
                  : PageTypes.log_in}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.formFooter}>
            {FormPageTypeText[pageType]}
            <Text
              onPress={changePageType}
              style={{color: '#841584', fontWeight: 'bold'}}>
              {' '}
              {pageType === PageTypes.log_in
                ? PageTypes.sign_up
                : PageTypes.log_in}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: 'white',
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignContent: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputFieldsContainer: {
    flex: 5,
  },
  formFooter: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitButton: {
    borderRadius: 5,
    margin: 10,
    marginTop: 40,
    backgroundColor: '#841584',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color: 'white',
  },
  pageHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
    alignContent: 'center',
    color: 'black',
  },
  inputField: {
    borderColor: 'white',
    borderBottomColor: 'black',
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  icon: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
});

export default LoginForm;
