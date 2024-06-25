import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

const IncomeExpenseDetail = () => {

  const {category} = useLocalSearchParams()

  const router = useRouter();

  // const {category} = route.params
  console.log("Categ: ", category)
  return (
    <SafeAreaView>
      <Text>IncomeExpenseDetail</Text>
      {/* <Text>{props.names[0]}</Text> */}
    <Button onPress={() => router.back()} title='Back'/>
    </SafeAreaView>
  )
}

export default IncomeExpenseDetail

const styles = StyleSheet.create({})