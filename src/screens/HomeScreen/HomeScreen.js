import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {connect} from 'react-redux';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import BezierLineGraph from '../../components/BezierLineGraph/BezierLineGraph';
import {
  SUBMIT_CONVERSION,
  SUBMIT_OPTION_FROM,
  SUBMIT_OPTION_TO,
  UPDATE_TIME_SERIES,
} from '../../redux/reducers';
import currencyService from '../../services/currencyService';
import dynamicStyles from './styles';

const HomeScreen = props => {
  const {navigation} = props;
  const appStyles = navigation.state.params.appStyles;
  const appConfig = navigation.state.params.appConfig;
  const colorScheme = props.screenProps.theme;
  const styles = dynamicStyles(appStyles, colorScheme);

  const [valueFrom, setValueFrom] = useState(null);
  const [convertedValue, setConvertedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const {
    currencyList,
    optionFrom,
    optionTo,
    onSelectTo,
    onSelectFrom,
    onCompleteTimeSeriesSet,
    rates,
    onConvert,
  } = props;

  const updateFromOption = option => {
    onSelectFrom(option.label);
  };

  const updateToOption = option => {
    onSelectTo(option.label);
  };

  const updateValueFrom = _valueFrom => {
    setValueFrom(_valueFrom);
  };

  const updateTimeSeriesSet = timeSeries => {
    onCompleteTimeSeriesSet(timeSeries);
  };

  const doReset = () => {
    setValueFrom(null);
    setConvertedValue(null);
    setIsConverted(false);
    setShowGraph(false);
  };

  const doConversion = () => {
    setLoading(true);
    const moneyRegex = new RegExp(/^\d+(\.\d{0,9})?$/);
    if (moneyRegex.test(valueFrom)) {
      console.log('success', {
        optionFrom,
        optionTo,
        valueFrom,
      });
      currencyService
        .convertCurrency(optionFrom, optionTo, valueFrom)
        .then(result => {
          if (result) {
            setError(false);
            setConvertedValue(result.toString());
            setIsConverted(true);
            setLoading(false);
          } else {
            setError(true);
            setLoading(false);
          }
        });
    } else {
      console.log('error', {
        optionFrom,
        optionTo,
        valueFrom,
      });
      setError(true);
      setLoading(false);
    }
  };

  const getDate = (num, simple = false) => {
    const date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * num);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    if (simple) {
      return month + '.' + day;
    } else {
      return year + '-' + month + '-' + day;
    }
  };

  const dateArray = [
    getDate(-6),
    getDate(-5),
    getDate(-4),
    getDate(-3),
    getDate(-2),
    getDate(-1),
    getDate(0),
  ];
  const simpleDateArray = [
    getDate(-6, true),
    getDate(-5, true),
    getDate(-4, true),
    getDate(-3, true),
    getDate(-2, true),
    getDate(-1, true),
    getDate(0, true),
  ];

  const getTimeSeriesSet = new Promise((resolve, reject) => {
    const _timeSeriesSet = [null, null, null, null, null, null, null];
    dateArray.forEach((date, index, _array) => {
      currencyService
        .getHistoricalRates(date, optionFrom, optionTo)
        .then(result => {
          if (result) {
            _timeSeriesSet[index] = result;
            if (!_timeSeriesSet.includes(null)) {
              updateTimeSeriesSet(_timeSeriesSet);
              resolve(_timeSeriesSet);
            }
          } else {
            setError(true);
            resolve(null);
          }
        });
    });
  });

  async function showTimeSeriesGraph() {
    setLoading(true);
    await getTimeSeriesSet.then(timeSeries => {
      if (timeSeries) {
        console.log('timeSeries: ', timeSeries);
        setShowGraph(true);
        setLoading(false);
      }
    });
  }

  const renderGraph = () => {
    return (
      <BezierLineGraph
        optionFrom={optionFrom}
        optionTo={optionTo}
        xLabels={simpleDateArray}
      />
    );
  };

  function setKey(item, index) {
    const output = {key: index, label: item};
    return output;
  }
  const currencyData = currencyList.map(setKey);
  const scrollViewRef = useRef();
  return (
    <>
      <ScrollView
        style={styles.container}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Currency Converter</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.blueTxt}>From</Text>
            <ModalSelector
              data={currencyData}
              supportedOrientations={['portrait']}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={updateFromOption}>
              <TextInput
                style={styles.currencyTxt}
                editable={false}
                placeholder="Currency"
                value={optionFrom}
              />
            </ModalSelector>
            <TextInput
              placeholder="Enter value to convert"
              value={valueFrom}
              onChangeText={val => updateValueFrom(val)}
              style={styles.inputTxt}
              keyboardType={'number-pad'}
            />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.blueTxt}>To</Text>
            <ModalSelector
              data={currencyData}
              supportedOrientations={['portrait']}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={updateToOption}>
              <TextInput
                style={styles.currencyTxt}
                editable={false}
                placeholder="Currency"
                value={optionTo}
              />
            </ModalSelector>
            <TouchableHighlight
              style={styles.convertBtn}
              onPress={isConverted ? doReset : doConversion}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Text style={styles.btnTxt}>
                {isConverted ? 'Reset' : 'Convert'}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.greyTxt}>EST PRICE</Text>
            <Text style={styles.boldTxt}>$</Text>
            <Text style={styles.boldTxt}>{convertedValue}</Text>
          </View>
        </View>
        {isConverted ? (
          <TouchableHighlight
            style={styles.btnContainer}
            onPress={showTimeSeriesGraph}
            underlayColor="rgba(73,182,77,1,0.9)">
            <Text style={styles.btnTxt}>Check The FX Rates Change Graph</Text>
          </TouchableHighlight>
        ) : null}
        {showGraph ? renderGraph() : null}
      </ScrollView>
      {loading && <ActivityIndicator appStyles={appStyles} />}
    </>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object,
};

HomeScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = ({currency}) => {
  return {
    currencyList: currency.rates.allIds,
    optionFrom: currency.optionFrom,
    optionTo: currency.optionTo,
    rates: currency.rates.byId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onConvert: valueFrom => {
      dispatch({type: SUBMIT_CONVERSION, valueFrom});
    },
    onSelectFrom: option => {
      dispatch({type: SUBMIT_OPTION_FROM, option});
    },
    onSelectTo: option => {
      dispatch({type: SUBMIT_OPTION_TO, option});
    },
    onCompleteTimeSeriesSet: payload => {
      dispatch({type: UPDATE_TIME_SERIES, payload});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
