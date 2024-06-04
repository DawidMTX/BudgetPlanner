import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcon } from './navigation/TabBarIcon'

const SelectMonth = () => {
  return (
    <View style={[styles.contener, styles.shadowProp]}>
        <TouchableOpacity><MaterialIcon name="arrow-back-ios" style={styles.iconStyle}/></TouchableOpacity>
      <Text style={{fontSize: 19}}>Maj 2024</Text>
      <TouchableOpacity><MaterialIcon name="arrow-forward-ios" style={styles.iconStyle}/></TouchableOpacity>
    </View>
  )
}

export default SelectMonth

const styles = StyleSheet.create({
    contener: {
		gap: 10,
		marginVertical: 5,
        marginHorizontal: 7,
		padding: 10,
		borderRadius: 10,
		backgroundColor: "white",
        flexDirection: 'row', 
        justifyContent: 'space-between'
	},
    shadowProp: {
		shadowColor: "#171717",
		shadowOffset: { width: -1, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
    iconStyle: {
		fontSize: 20,
		marginHorizontal: 18
	},

})