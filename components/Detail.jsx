import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {useRoute} from '@react-navigation/native';
import { useState } from "react";

const Detail = () => {
    const route = useRoute()
    const {id, property, room, dateTime, monthlyPrice, furnitureType, note, report} = route.params.info
return (
    <View style={styles.detail}>
        <Text style={styles.textHeading}>{`The rental ${id}`}</Text>
        <View style={{flex:1,justifyContent:'center',flexDirection:'column'}}>

        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginBottom:15}}>Property:</Text>
            <Text style={{fontSize:15,marginLeft:20}}>{property}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginBottom:15}}>Bed Room:</Text>
            <Text style={{fontSize:15,marginLeft:20}}>{room}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginBottom:15}}>Date Time:</Text>
            <Text style={{fontSize:15,marginLeft:20}}>{dateTime}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginBottom:15}}>Monthly Price:</Text>
            <Text style={{fontSize:15,marginLeft:20}}>{monthlyPrice}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginBottom:15}}>Furniture Type:</Text>
            <Text style={{fontSize:15,marginLeft:20}}>{furnitureType}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginBottom:15}}>Note:</Text>
            <Text style={{fontSize:15,marginLeft:20}}>{note?note:'You do not have note'}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{fontSize:18,fontWeight:'bold',marginBottom:15}}>Name:</Text>
            <Text style={{fontSize:15,marginLeft:20}}>{report}</Text>
        </View>

       
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    detail:{
        flex:1,
        alignItems: 'center'
    },
    textHeading:{
        fontSize:25,
        marginBottom:10,
        marginTop:60,
        fontWeight:'bold',
        textTransform:'capitalize'
    }
})
export default Detail