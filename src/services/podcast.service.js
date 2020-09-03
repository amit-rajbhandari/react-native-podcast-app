import Req from '../interceptor/token.interceptor';
const podcastService = (function() {
  function _getPodcast() {
    return Req.get('/podcast');
  }

  function _getPodcastUrl() {
    return Req.get('/podcast/url');
  }

  function _getPodcastByDate(date) {
    return Req.get('/podcast/date/' + date);
  }

  return {
    getPodcast: _getPodcast,
    getPodcastUrl: _getPodcastUrl,
    getPodcastByDate: _getPodcastByDate,
  };
})();
export default podcastService;
