import Req from '../interceptor/token.interceptor';
const notificationService = (function() {
  function _getNotification(page = 1) {
    return Req.get('/notification/' + page);
  }

  return {
    getNotification: _getNotification,
  };
})();
export default notificationService;
