import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {connect} from 'react-redux';
const styles = StyleSheet.create({
  // ...
  optionFromButtonContainer: {
    elevation: 8,
    backgroundColor: 'purple',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 12,
  },
  optionToButtonContainer: {
    elevation: 8,
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 12,
  },
  appButtonText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomColor: 'rgba(214, 214, 214, 0.4)',
    borderBottomWidth: 1,
  },
  boldTxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

const BezierLineGraph = props => {
  console.log('BezierLineGraph props', props);

  useEffect(() => {}, [props.timeSeries]);

  return (
    <View
      style={{
        alignItems: 'center',
        margin: 10,
      }}>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.optionToButtonContainer}>
          <Text style={styles.appButtonText}>{props.optionTo}</Text>
        </TouchableOpacity>
        <Text style={styles.boldTxt}>/</Text>
        <TouchableOpacity style={styles.optionFromButtonContainer}>
          <Text style={styles.appButtonText}>{props.optionFrom}</Text>
        </TouchableOpacity>
      </View>
      <LineChart
        data={{
          labels: props.xLabels,
          datasets: [
            {
              data: props.timeSeries,
              color: (opacity = 0.6) => `rgba(255, 255, 0, ${opacity})`,
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#1f3f47',
          backgroundGradientFrom: '#4a7850',
          backgroundGradientTo: '#1f4724',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#1f3f47',
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const mapStateToProps = ({currency}) => {
  return {
    timeSeries: currency.timeSeries,
  };
};

export default connect(mapStateToProps, {})(BezierLineGraph);
