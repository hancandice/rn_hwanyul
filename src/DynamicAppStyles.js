import {Platform, Dimensions, I18nManager, StyleSheet} from 'react-native';
import invert from 'invert-color';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH =
  WINDOW_WIDTH < WINDOW_HEIGHT ? WINDOW_WIDTH : WINDOW_HEIGHT;

const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainThemeForegroundColor: '#d9dece',
  secondaryForegroundColor: '#f4f6fb',
  hairlineColor: '#d6d6d6',
  mainTextColor: '#464646',
  mainSubtextColor: '#7e7e7e',
  grayBgColor: '#f5f5f5',
  grey0: '#eaeaea',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  whiteSmoke: '#f5f5f5',
  onlineMarkColor: '#41C61B',
  inputBgColor: '#eeeeee',
  inlineActionsColor: '#ffffee',
};

const darkColorSet = {
  mainThemeBackgroundColor: invert('#ffffff'),
  mainThemeForegroundColor: '#d9dece',
  secondaryForegroundColor: invert('#f4f6fb'),
  mainTextColor: invert('#464646'),
  mainSubtextColor: invert('#7e7e7e'),
  hairlineColor: invert('#d6d6d6'),
  grayBgColor: '#f5f5f5',
  grey0: invert('#eaeaea'),
  grey3: invert('#e6e6f2'),
  grey6: invert('#d6d6d6'),
  grey9: invert('#939393'),
  whiteSmoke: invert('#f5f5f5'),
  onlineMarkColor: '#41C61B',
  inputBgColor: invert('#eeeeee'),
  inlineActionsColor: invert('#ffffee'),
};

const _colorSet = {
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
  grayBgColor: '#f5f5f5',
  inputBgColor: '#eeeeee',
};

const navThemeConstants = {
  light: {
    backgroundColor: '#fff',
    fontColor: '#000',
    headerStyleColor: '#E8E8E8',
    iconBackground: '#F4F4F4',
  },
  dark: {
    backgroundColor: invert('#fff'),
    fontColor: invert('#000'),
    headerStyleColor: invert('E8E8E8'),
    iconBackground: invert('#e6e6f2'),
  },
  'no-preference': {
    backgroundColor: '#fff',
    fontColor: '#000',
    headerStyleColor: '#E8E8E8',
    iconBackground: '#F4F4F4',
  },
};

const _fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
};

const _sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 50,
};

const _styleSet = {
  menuBtn: {
    container: {
      backgroundColor: _colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    icon: {
      tintColor: 'black',
      width: 15,
      height: 15,
    },
  },
  searchBar: {
    container: {
      marginLeft: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
    },
    input: {
      backgroundColor: _colorSet.inputBgColor,
      borderRadius: 10,
      color: 'black',
    },
  },
  rightNavButton: {
    marginRight: 10,
  },
  backArrowStyle: {
    resizeMode: 'contain',
    tintColor: '#d9dece',
    width: 25,
    height: 25,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 10,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
};

const chartStyle = StyleSheet.create({
  chartContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 20,
    alignSelf: 'center',
  },
  chartTxtContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chartTxt: {
    fontSize: 14,
    color: 'black',
  },
  activeChartTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

//home card
//card with img on left,double text mid,and money text right
const card2Style = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    width: '100%',
    //borderTopColor: '#eff2f6',
    borderTopColor: 'rgba(214, 214, 214, 0.4)',
    borderTopWidth: Platform.OS === 'ios' ? 0.5 : 1,
    padding: 20,
    paddingLeft: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    width: '65%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  itemIcon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 10,
    //lineHeight: 30
  },
  itemTxtContainer: {
    lineHeight: 34,
  },
  itemTitle: {
    fontSize: 12,
    color: '#7f7d80',
  },
  itemText: {
    fontSize: 16,
    color: '#070f12',
  },
  itemMoney: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#070f12',
    lineHeight: 30,
  },
});

const StyleDict = {
  navThemeConstants,
  colorSet: _colorSet,
  sizeSet: _sizeSet,
  fontSet: _fontSet,
  styleSet: _styleSet,
  chart: chartStyle,
  card2: card2Style,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SCREEN_WIDTH,
};

export default StyleDict;
