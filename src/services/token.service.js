import AsyncStorage from '@react-native-community/async-storage';

const tokenService = (function() {
  function _setToken(token) {
    AsyncStorage.setItem('token', JSON.stringify(token));
  }

  function _setUser(data) {
    AsyncStorage.setItem('user', JSON.stringify(data));
  }

  async function _getToken() {
    try {
      let token = await AsyncStorage.getItem('token');
      return JSON.parse(token);
    } catch (error) {}
  }

  async function _getUser() {
    try {
      let user = await AsyncStorage.getItem('user');
      return JSON.parse(user);
    } catch (error) {}
  }

  async function _clearToken() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  }

  return {
    setToken: _setToken,
    getToken: _getToken,
    clearToken: _clearToken,
    setUser: _setUser,
    getUser: _getUser,
  };
})();
export default tokenService;
