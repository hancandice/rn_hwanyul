/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React, {useState} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import {Chart, Line} from 'react-native-responsive-linechart';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const LineChartView = props => {
  const lineChartData = props.lineChartData;
  const lineChartConfig = props.lineChartConfig;
  const lineChartTables = props.lineChartTables;

  const [state, setState] = useState({
    activeChart: 0,
  });

  const TABLE_ITEM_OFFSET = 10;
  const TABLE_ITEM_MARGIN = TABLE_ITEM_OFFSET * 2;

  const chart = StyleSheet.create({
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

  const renderTable = (item, index) => (
    <TouchableHighlight
      onPress={() => setState({activeChart: index})}
      underlayColor="rgba(73,182,77,1,0.9)"
      style={
        state.activeChart === index
          ? {
              justifyContent: 'center',
              backgroundColor: '#617180',
              borderRadius: 5,
              flex: 1,
              alignItems: 'center',
              margin: TABLE_ITEM_OFFSET,
              width:
                (SCREEN_WIDTH - TABLE_ITEM_MARGIN) / lineChartTables.length -
                TABLE_ITEM_OFFSET,
              height:
                (SCREEN_WIDTH - TABLE_ITEM_MARGIN) / lineChartTables.length -
                TABLE_ITEM_OFFSET,
              maxWidth: 50,
              maxHeight: 50,
            }
          : {
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 5,
              flex: 1,
              alignItems: 'center',
              margin: TABLE_ITEM_OFFSET,
              width:
                (SCREEN_WIDTH - TABLE_ITEM_MARGIN) / lineChartTables.length -
                TABLE_ITEM_OFFSET,
              height:
                (SCREEN_WIDTH - TABLE_ITEM_MARGIN) / lineChartTables.length -
                TABLE_ITEM_OFFSET,
              maxWidth: 50,
              maxHeight: 50,
            }
      }>
      <Text
        style={
          state.activeChart === index ? chart.activeChartTxt : chart.chartTxt
        }>
        {item}
      </Text>
    </TouchableHighlight>
  );

  return (
    <View>
      <LineChart
        style={{
          width: SCREEN_WIDTH - 20,
          height: 220,
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 0,
          marginBottom: 0,
          margin: 20,
        }}
        config={lineChartConfig}
        data={lineChartData[state.activeChart]}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flex: 1,
        }}>
        {lineChartTables.map((data, index) => renderTable(data, index))}
      </View>
    </View>
  );
};

export default LineChartView;
