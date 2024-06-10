import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

const DateSelection = () => {
  return (
    <View>
      <DateTimePicker locale="pl-PL" mode='date' display='spinner' value={new Date()} />
    </View>
  )
}

export default DateSelection

const styles = StyleSheet.create({})


