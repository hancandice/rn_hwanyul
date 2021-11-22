import React from 'react';
import {ScrollView, StatusBar, useColorScheme, View} from 'react-native';
import LineChartView from '../../components/LineChartView/LineChartView';
import Test from '../../components/BezierLineGraph/BezierLineGraph';
import {
  lineChartConfig,
  lineChartData,
  lineChartTables,
} from '../../data/dataArrays';
import dynamicStyles from './styles';

const GraphScreen = props => {
  const {appConfig, appStyles, optionFrom, optionTo} =
    props.navigation.state.params;

  const colorScheme = useColorScheme();

  const styles = dynamicStyles(appStyles, colorScheme);

  return (
    <View style={styles.chartContainer}>
      {/* <LineChartView
          lineChartData={lineChartData}
          lineChartConfig={lineChartConfig}
          lineChartTables={lineChartTables}
        /> */}
      <Test />
    </View>
  );
};

export default GraphScreen;
