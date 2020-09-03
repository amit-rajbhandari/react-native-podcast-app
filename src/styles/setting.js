import {StyleSheet} from 'react-native';
const settingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentWrapper: {
    marginTop: 15,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    color: '#123F68',
    marginBottom: 15,
  },
  contentBox: {
    backgroundColor: '#FAFAFA',
    width: '95%',
  },
  contentTitle: {
    fontSize: 14,
    color: '#123F68',
  },
  button: {
    padding: 10,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    backgroundColor: '#123F68',
    borderRadius: 25,
    overflow: 'hidden',
  },
  btnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  editView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingLeft: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  input: {
    fontSize: 14,
    color: '#123F68',
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
});
export default settingStyle;
