import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Image, Text, Button, Input} from 'react-native-elements';
import authStyle from '../../../styles/auth';
import typography from '../../../styles/typography';
import authService from '../../../services/auth.service';
import Loader from '../../../components/loader';
import RegisterHeader from '../../../components/register-header';
import {withFormik} from 'formik';

const ForgotPassword = props => {
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
            value={values.email}
            placeholder="E-post"
            placeholderTextColor="#123F68"
            onChangeText={value => setFieldValue('email', value)}
          />
          {errors.email && touched.email && (
            <Text style={authStyle.error}>{errors.email}</Text>
          )}
          <View style={authStyle.action}>
            <View style={authStyle.actionLinkWrapper}>
              <Text
                style={[authStyle.actionLink, typography.fontBold]}
                onPress={() => props.navigation.navigate('Login')}>
                Logga in
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
              title="Begäran"
            />
          </View>
        </View>
        {isSubmitting ? <Loader /> : null}
      </View>
    </>
  );
};
export default withFormik({
  mapPropsToValues: () => ({email: ''}),
  validate: values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'E-post krävs';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Ogiltig e-postadress';
    }
    return errors;
  },
  handleSubmit: async (values, {props, resetForm}) => {
    try {
      const response = await authService.forgotPassword(values.email);
      if (response && response.data && response.data.message) {
        let responseFormatted = response.data.message.replace(
          /(<([^>]+)>)/gi,
          '',
        );
        Alert.alert('Success', responseFormatted);
      } else {
        Alert.alert('Success', 'Password reset link sent to your email!');
      }
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
})(ForgotPassword);
