import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  AlertMessages,
  FormPageTypeText,
  PageTypes,
} from '../constants/FormConstants';

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [pageType, setPageType] = useState(PageTypes.sign_up);
  const [loginState, setLoginState] = useState(false);
  const [showPassword, toggleShowPassword] = useState(true);
  const [validUsers, setValidUsers] = useState({
    'test@gmail.com': {password: '123', name: 'test1'},
    'test1@gmail.com': {password: '12345', name: 'test2'},
  });
  const handleSubmitButtonClick = () => {
    if (email === '' || password === '') {
      Alert.alert(AlertMessages.empty);
      return;
    }
    if (!reg.test(email)) {
      Alert.alert(AlertMessages.invalidEmail);
      return;
    }

    if (pageType === PageTypes.sign_up) {
      validUsers[email] = {email, password};
      setValidUsers(() => validUsers);
      setLoginState(true);
      changePageType();
    } else {
      if (validUsers[email]?.password === password) {
        setLoginState(true);
      } else {
        setLoginState(false);
      }
    }
    setEmail('');
    setPassword('');
    setName('');
    Alert.alert(loginState ? AlertMessages.success : AlertMessages.failed);
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
              value={name}
              onChangeText={text => setName(text)}
            />
          )}
          <TextInput
            style={styles.inputField}
            placeholder="Your Email Id"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.inputField}
            secureTextEntry={!showPassword}
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

export default Form;
