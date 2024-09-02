import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CurrentWeather from './src/components/CurrentWeather';
import SearchBar from './src/components/SearchBar';
import WeeklyReport from './src/components/WeeklyReport';
import {useLocation} from './src/hooks/useLocation';
import {useWeatherReport} from './src/hooks/useWeatherReport';

export default function App() {
  const address = useLocation();
  const [latlng, setlatlng] = useState(address);
  const weatherReport = useWeatherReport(latlng);
  return (
    <View style={styles.container}>
      <SearchBar setlatlng={setlatlng} />
      <CurrentWeather report={weatherReport} />
      <WeeklyReport report={weatherReport} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 60,
  },
});
