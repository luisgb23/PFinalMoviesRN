import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor:'gray',
        height:80,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:30
    }
})