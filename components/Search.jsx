import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import {useIsFocused, useNavigation} from '@react-navigation/native'
const db = SQLite.openDatabase('name','1.0')
export default function Search() {
  const focus = useIsFocused();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const navigation = useNavigation()
  const onChange = (value)=>{
    if(value.length===0){
      setDataSearch(data)
      setSearch(value)
    }
    else{
      const newdataSearch=data.filter((item)=>{
        const itemSearch=item.property?item.property.toUpperCase():''.toUpperCase()
        const valueData=value.toUpperCase()
        return itemSearch.indexOf(valueData)>-1
      })
      setDataSearch(newdataSearch)
      setSearch(value)
    }
  }
  const showDeatils = (idD)=>{
    const objInfo = dataSearch.find(i=>i.id === idD)
    navigation.navigate('Detail',{info:objInfo})
  }
  const getdata = async()=>{
    await db.transaction((tx)=>{
      tx.executeSql("SELECT * FROM datarental",
      [],
      (tx,result)=>{
        let dataItem = []
        const len = result.rows.length
        if(len>0){
          for(let i=0;i<len;++i){
            dataItem.push(result.rows.item(i))
            setDataSearch(dataItem)
            setData(dataItem)
          }
        }else{
          setDataSearch([])
          setData([])
        }
          
        
      }
      )
    })
  }
  useEffect(() => {
   getdata()
    return()=>!focus
  }, [focus])
  return (
    <View style={styles.container}>
      <TextInput style = {styles.input}
      value={search}
      placeholder='What are you looking for?'
      onChangeText={(value)=>onChange(value)}
      />
      <View style={styles.bar}
      />
      <View style={{flex:1,}}>
      {dataSearch.length===0?(
        <Text>No data to search</Text>
      ):(
        <FlatList
          data={dataSearch}
          keyExtractor={(item)=>item.id.toString()}
          contentContainerStyle={{padding:20}}
          renderItem={({item})=>(
            <TouchableOpacity 
            onPress={()=>showDeatils(item.id)}
            style={styles.wrapper}>
            <View style={{flexDirection:"row"}}>
            <Text>PropertyType: </Text>
            <Text>{item.property}</Text>
            </View>

            <View style={{flexDirection:"row"}}>
            <Text>Bedroom: </Text>
            <Text>{item.room}</Text>
            </View>

            <View style={{flexDirection:"row"}}>
            <Text>Date time: </Text>
            <Text>{item.dateTime}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
            <Text>Monthly Price: </Text>
            <Text>{item.monthlyPrice}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
            <Text>Furniture type: </Text>
            <Text>{item.furnitureType?item.furnitureType:"none"}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
            <Text>Report: </Text>
            <Text>{item.report}</Text>
            </View>
            
            </TouchableOpacity>
          )}
        />
      )}
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:
  {
    marginBottom:18,
   flexDirection:'column',
   borderRadius:13,
   backgroundColor:'#fff',
   shadowColor:'#000',
   shadowOpacity:0.7,
   shadowOffset:{width:0,height:8},
   marginTop:12,
   elevation:10,
   shadowRadius:15,
   width:250,
   padding:25,
   
  },
  bar:
    {
      backgroundColor:'#6B6B6B',
      marginTop:18,
      height:2,
      width:'80%',

    },
  input:{
    width:310,
    textAlign:'center',
    marginTop:60,
    height:48,
    borderWidth:1,
    borderRadius:15
  },
  container: {
    flex: 1,
    backgroundColor: '#377b7d',
    alignItems: 'center',   
  },
  textHeading: {
      marginTop:15,
      fontSize:15,
      fontWeight:'bold',
  }
  
});