import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  SearbarParam,
  SearchListItem,
  SearchListItemParam,
} from '../helpers/getWeatherImage';

const SearchBar = ({setlatlng, address}: SearbarParam) => {
  const searchRef = useRef(null);
  const [searchFocus, setSearchFocus] = useState(false);
  const [location, setLocation] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [userInput, setUserInput] = useState(false);
  const search = (t: string) => {
    setUserInput(true);
    setLocation(t);
  };
  useEffect(() => {
    if (address) {
      setLocation(
        address.city + ' ' + address.region + ' ' + address.country_name,
      );
    }
  }, [address]);

  useEffect(() => {
    const getData = setTimeout(() => {
      async function fetchdata() {
        const requestOptions: RequestInit = {
          method: 'GET',
          redirect: 'follow',
        };
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
          requestOptions,
        );
        let data = await response.json();
        setSearchList(data.results);
      }
      if (userInput) {
        fetchdata();
      }
    }, 1000);
    return () => clearTimeout(getData);
  }, [location, userInput]);

  const selectItem = (data: SearchListItem) => {
    const {latitude, longitude} = data;
    setlatlng({latitude, longitude, city: data.name});
    setLocation(`${data.name} ${data.admin1} ${data.country}`);
    setSearchList(null);
    Keyboard.dismiss();
    onSearchBlur();
  };

  const onSearchFocus = () => setSearchFocus(true);
  const onSearchBlur = () => setSearchFocus(false);
  return (
    <>
      <TextInput
        testID="searchInputTestId"
        ref={searchRef}
        value={location}
        onChangeText={search}
        placeholder="Search for any location"
        style={[styles.searchInput, searchFocus ? {borderRadius: 1} : {}]}
        selectTextOnFocus
        onFocus={onSearchFocus}
      />
      <FlatList
        data={searchList}
        renderItem={({item}: SearchListItemParam) => (
          <TouchableOpacity
            style={styles.searchInputStyle}
            onPress={selectItem.bind(this, item)}>
            <Text>
              {item.name} {item.admin1} {item.country}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    paddingHorizontal: 20,
    height: 50,
    width: '90%',
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  searchInputStyle: {padding: 15},
});
export default SearchBar;
