import {StyleSheet} from 'react-native';
const videoStyle = StyleSheet.create({
  container: {
    backgroundColor: '#737373',
    marginTop: 'auto',
  },
  minimizedContainer: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  slideUpContainer: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2.5%',
  },
  title: {
    fontSize: 12,
    color: '#ffffff',
    overflow: 'hidden',
  },
  button: {
    width: 50,
    height: 50,
  },
  fullscreenContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.45)',
    zIndex: 1,
  },
});
export default videoStyle;
