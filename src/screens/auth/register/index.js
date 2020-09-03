import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {Image, Text, Button, Input} from 'react-native-elements';
import authStyle from '../../../styles/auth';
import typography from '../../../styles/typography';
import authService from '../../../services/auth.service';
import Loader from '../../../components/loader';
import RegisterHeader from '../../../components/register-header';
import {withFormik} from 'formik';

const Register = props => {
  const [pwd, setPwd] = useState(true);
  const {
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = props;

  return (
    <>
      <RegisterHeader navigation={props.navigation} />
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
            placeholder="Användarnamn"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('username', value)}
          />
          {errors.username && touched.username && (
            <Text style={authStyle.error}>{errors.username}</Text>
          )}
          <Input
            inputContainerStyle={authStyle.inputContainer}
            inputStyle={[authStyle.input, typography.fontRegular]}
            value={values.email}
            placeholder="E-post"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('email', value)}
          />
          {errors.email && touched.email && (
            <Text style={authStyle.error}>{errors.email}</Text>
          )}
          <Input
            inputContainerStyle={authStyle.inputContainer}
            inputStyle={[authStyle.input, typography.fontRegular]}
            value={values.name}
            placeholder="Namn"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('name', value)}
          />
          {errors.name && touched.name && (
            <Text style={authStyle.error}>{errors.name}</Text>
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
          <Input
            inputContainerStyle={authStyle.inputContainer}
            inputStyle={[authStyle.input, typography.fontRegular]}
            placeholder="Bekräfta lösenord"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('confirmPassword', value)}
            value={values.confirmPassword}
            secureTextEntry={pwd}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={authStyle.error}>{errors.confirmPassword}</Text>
          )}

          {/* <Input
            inputContainerStyle={authStyle.inputContainer}
            inputStyle={[authStyle.input, typography.fontRegular]}
            value={values.phone}
            placeholder="Telefon"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('phone', value)}
          />
          {errors.phone && touched.phone && (
            <Text style={authStyle.error}>{errors.phone}</Text>
          )}

          <Input
            inputContainerStyle={authStyle.inputContainer}
            inputStyle={[authStyle.input, typography.fontRegular]}
            value={values.city}
            placeholder="Stad"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('city', value)}
          />
          {errors.city && touched.city && (
            <Text style={authStyle.error}>{errors.city}</Text>
          )} */}
          <View style={authStyle.action}>
            <View style={authStyle.actionLinkWrapper}>
              <Text
                style={[authStyle.actionLink, typography.fontBold]}
                onPress={() => props.navigation.navigate('Login')}>
                Logga in
              </Text>
            </View>
            <Button
              titleStyle={[authStyle.actionBtnText, typography.fontBold]}
              onPress={handleSubmit}
              buttonStyle={[authStyle.actionBtn]}
              title="Skapa konto"
            />
          </View>
        </View>
        {isSubmitting ? <Loader /> : null}
      </View>
    </>
  );
};
export default withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    city: '',
    name: '',
  }),
  validate: values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'E-post krävs';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Ogiltig e-postadress';
    }
    if (!values.username) {
      errors.username = 'Användarnamn krävs';
    }
    if (!values.password) {
      errors.password = 'Lösenord krävs';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Bekräfta Lösenord krävs';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Lösenord matchar inte. Vänligen försök igen';
    }
    if (!values.name) {
      errors.name = 'Namn krävs';
    }
    return errors;
  },
  handleSubmit: async (values, {props, resetForm}) => {
    try {
      const response = await authService.register(
        values.username,
        values.password,
        values.email,
        values.phone,
        values.city,
        values.name,
      );
      Alert.alert('Success', 'Registration success! Please login!');
      props.navigation.navigate('Login');
      resetForm();
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
})(Register);
