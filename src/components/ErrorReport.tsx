import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ErrorReport = ({error}) => {
  if (error) {
    return (
      <View style={styles.conatiner}>
        <Text style={styles.text}>
          Something went wrong. Please try again later.
        </Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  text: {
    color: '#000',
    fontSize: 14,
  },
});

export default ErrorReport;
