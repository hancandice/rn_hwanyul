import {Platform, StyleSheet} from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      shadowColor: '#000000',
      shadowOpacity: 0.3,
      shadowOffset: {width: 2, height: 2},
      elevation: 3,
      color: '#2d65c9',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 30,
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 60,
      tintColor: 'white',
    },
    container: {
      flex: 1,
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    mainContainer: {
      marginTop: 40,
      paddingTop: 0,
      padding: 10,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderBottomColor: 'rgba(214, 214, 214, 0.4)',
      borderBottomWidth: 1,
    },
    inputTxt: {
      flex: 0.9,
      textAlign: 'right',
      fontSize: 16,
      color: '#4072CE',
    },
    currencyTxt: {
      textAlign: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].inputBgColor,
      borderRadius: 15,
      elevation: 10,
      shadowColor: 'transparent',
      padding: Platform.OS === 'ios' ? 10 : 5,
      height: 30,
    },
    boldTxt: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    blueTxt: {
      flex: 0.3,
      textAlign: 'left',
      fontSize: 14,
      fontWeight: '600',
      color: '#4072CE',
    },
    greyTxt: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '600',
      color: '#9b9b9b',
    },
    btnContainer: {
      width: '80%',
      borderRadius: 7,
      backgroundColor: '#2d65c9',
      borderColor: '#2d65c9',
      borderWidth: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 10,
      marginTop: 30,
      marginBottom: 30,
    },
    convertBtn: {
      width: '50%',
      borderRadius: 7,
      backgroundColor: '#2d65c9',
      borderColor: '#2d65c9',
      borderWidth: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 10,
      marginTop: 30,
      marginBottom: 30,
    },
    btnTxt: {
      fontSize: 14,
      color: 'white',
      fontWeight: '500',
      textAlign: 'center',
    },
    scrollView: {flex: 1, width: '100%'},
    button: {
      fontSize: 18,
      color: 'white',
      marginTop: 10,
    },
  });
};

export default dynamicStyles;