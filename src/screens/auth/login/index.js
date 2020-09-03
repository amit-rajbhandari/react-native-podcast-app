import React, {useEffect, useState, useContext} from 'react';
import {View, Alert} from 'react-native';
import {Text, Button, Input, CheckBox} from 'react-native-elements';
import authStyle from '../../../styles/auth';
import typography from '../../../styles/typography';
import authService from '../../../services/auth.service';
import tokenService from '../../../services/token.service';
import Loader from '../../../components/loader';
import AuthHeader from '../../../components/auth-header';
import {withFormik} from 'formik';
import AuthContext from '../../../provider/auth-context';
import AsyncStorage from '@react-native-community/async-storage';

const Login = props => {
  const {signIn} = useContext(AuthContext);
  const [pwd, setPwd] = useState(true);
  const [rememberPwd, setRememberPwd] = useState(false);

  const {
    values,
    touched,
    errors,
    status,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = props;

  useEffect(() => {
    getLoginDetail();
    if (status) {
      signIn();
      if (rememberPwd) {
        AsyncStorage.setItem('loginUsername', values.username);
        AsyncStorage.setItem('loginPassword', values.password);
      } else {
        AsyncStorage.removeItem('loginUsername');
        AsyncStorage.removeItem('loginPassword');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signIn, status]);

  const getLoginDetail = async () => {
    if (await AsyncStorage.getItem('loginUsername')) {
      setRememberPwd(true);
      props.setFieldValue(
        'username',
        await AsyncStorage.getItem('loginUsername'),
      );
    }
    if (await AsyncStorage.getItem('loginPassword')) {
      props.setFieldValue(
        'password',
        await AsyncStorage.getItem('loginPassword'),
      );
    }
  };

  const changeIcon = () => {
    setPwd(!pwd);
  };

  return (
    <>
      <AuthHeader />
      <View style={authStyle.container}>
        {/* <View style={authStyle.logoWrap}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            source={require('../../../assets/images/logo.png')}
          />
        </View> */}

        <View style={authStyle.form}>
          <Input
            inputContainerStyle={authStyle.inputContainer}
            inputStyle={[authStyle.input, typography.fontRegular]}
            value={values.username}
            placeholder="Användarnamn eller epost"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('username', value)}
          />
          {errors.username && touched.username && (
            <Text style={authStyle.error}>{errors.username}</Text>
          )}

          <Input
            inputContainerStyle={authStyle.inputContainer}
            inputStyle={[authStyle.input, typography.fontRegular]}
            placeholder="Lösenord"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('password', value)}
            value={values.password}
            secureTextEntry={pwd}
          />
          {errors.password && touched.password && (
            <Text style={authStyle.error}>{errors.password}</Text>
          )}

          <CheckBox
            containerStyle={authStyle.rememberContainer}
            textStyle={[authStyle.rememberLink, typography.fontBold]}
            onPress={() => setRememberPwd(!rememberPwd)}
            title="Spara användarnamn och lösenord"
            checked={rememberPwd}
          />

          <View style={authStyle.action}>
            <View style={authStyle.actionLinkWrapper}>
              <Text
                style={[authStyle.actionLink, typography.fontBold]}
                onPress={() => props.navigation.navigate('ForgotPassword')}>
                Glömt lösenord?
              </Text>
              <Text
                style={[authStyle.actionLink, typography.fontBold]}
                onPress={() => props.navigation.navigate('Register')}>
                Skapa konto
              </Text>
            </View>
            <Button
              titleStyle={[authStyle.actionBtnText, typography.fontBold]}
              onPress={handleSubmit}
              buttonStyle={[authStyle.actionBtn]}
              title="Logga in"
            />
          </View>
        </View>
        {isSubmitting ? <Loader /> : null}
      </View>
    </>
  );
};
export default withFormik({
  mapPropsToValues: () => ({username: '', password: ''}),
  validate: values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Användarnamn krävs';
    }
    if (!values.password) {
      errors.password = 'Lösenord krävs';
    }
    return errors;
  },
  handleSubmit: async (values, {props, setStatus, resetForm}) => {
    try {
      const response = await authService.login(
        values.username,
        values.password,
      );
      if (response && response.data) {
        tokenService.setToken(response.data.token);
        tokenService.setUser(response.data);
        setStatus(true);
        resetForm();
      }
    } catch (error) {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        let errorFormatted = error.response.data.message.replace(
          /(<([^>]+)>)/gi,
          '',
        );
        Alert.alert('Error', errorFormatted);
      } else {
        Alert.alert('Error', 'Something went wrong! Please try again later.');
      }
    }
  },
})(Login);
