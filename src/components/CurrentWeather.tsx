import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import getWeatherImage, {
  getWeatherDescription,
  WeatherReportType,
} from '../helpers/getWeatherImage';

const CurrentWeather = ({report}: {report: WeatherReportType | null}) => {
  if (!report) {
    return;
  }
  const image = getWeatherImage(report.hourly.weather_code[0]);
  const description = getWeatherDescription(report.hourly.weather_code[0]);
  return (
    <View style={styles.container}>
      <Image testID='currentWeatherImageTestId' source={{uri: image}} style={styles.weatherImage} />
      <Text style={styles.tempDesc}>
        {report.hourly.temperature_2m[0]}
        {report.hourly_units.temperature_2m}
      </Text>
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherImage: {
    height: 300,
    width: 300,
    resizeMode: 'cover',
  },
  tempDesc: {fontWeight: '200', fontSize: 33},
});

export default CurrentWeather;
