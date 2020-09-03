import Req from '../interceptor/token.interceptor';
import axios from 'axios';
import {APIURL, AUTHAPIURL} from 'react-native-dotenv';
const authService = (function() {
  function _login(username, password) {
    const request = axios.create({
      baseURL: AUTHAPIURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return request.post(
      '/token',
      JSON.stringify({username: username, password: password}),
    );
  }

  function _register(username, password, email, phone, city, name) {
    const request = axios.create({
      baseURL: APIURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return request.post(
      '/register',
      JSON.stringify({
        user_login: username,
        password: password,
        email: email,
        phone: '',
        city: '',
        name: '',
      }),
    );
  }

  function _forgotPassword(email) {
    const request = axios.create({
      baseURL: APIURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return request.get('/send-password-reset-link?user_login=' + email);
  }

  function _resetPassword() {}

  function _updateProfile(
    name,
    email,
    password,
    notificationNewPodcast,
    notificationStalltips,
  ) {
    let obj;
    if (password) {
      obj = JSON.stringify({
        user_email: email,
        display_name: name,
        user_pass: password,
        notification_new_podcast: notificationNewPodcast,
        notification_stalltips: notificationStalltips,
      });
    } else {
      obj = JSON.stringify({
        user_email: email,
        display_name: name,
        notification_new_podcast: notificationNewPodcast,
        notification_stalltips: notificationStalltips,
      });
    }
    return Req.post('/user/update', obj);
  }

  function _updateDeviceToken(deviceToken) {
    return Req.post(
      '/user/update',
      JSON.stringify({
        fcm_token: deviceToken,
      }),
    );
  }

  function _logout() {
    return Req.get('/logout');
  }

  return {
    login: _login,
    register: _register,
    forgotPassword: _forgotPassword,
    resetPassword: _resetPassword,
    logout: _logout,
    updateProfile: _updateProfile,
    updateDeviceToken: _updateDeviceToken,
  };
})();
export default authService;
