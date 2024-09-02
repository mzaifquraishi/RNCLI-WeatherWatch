import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getTime} from '../helpers/getTime';
import getWeatherImage, {WeatherReportType} from '../helpers/getWeatherImage';

const WeeklyReportItem = ({
  report,
  index,
}: {
  report: WeatherReportType;
  index: number;
}) => {
  const {image} = getWeatherImage(report.hourly.weather_code[index]);
  const time = getTime(report.hourly.time[index]);
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.time}>{time}</Text>
      <Image source={{uri: image}} style={styles.weatherImage} />
      <Text>
        {report.hourly.temperature_2m[index]}
        {report.hourly_units.temperature_2m}
      </Text>
    </View>
  );
};

const WeeklyReport = ({report}: {report: WeatherReportType|null}) => {
  if (!report) {
    return null;
  }
  return (
    <FlatList
      testID="weaklyListTestId"
      data={report.hourly.time}
      horizontal
      contentContainerStyle={styles.leftMargin}
      renderItem={({index}) => (
        <WeeklyReportItem key={`${index}`} index={index} report={report} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    width: 80,
    height: 120,
    marginRight: 5,
    borderRadius: 8,
  },
  weatherImage: {height: 60, width: 60},
  time: {textAlign: 'center', height: 32, lineHeight: 16},
  leftMargin: {marginLeft: 15},
});

export default WeeklyReport;
