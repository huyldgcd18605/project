import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {useIsFocused} from '@react-navigation/native'
import  Icon  from 'react-native-vector-icons/Ionicons';


const db = SQLite.openDatabase('name','1.0')

export default function Show() {
  const isfocus=useIsFocused()
  const [load,setLoad] = useState(false)
  const deldb=async(id)=>{
  await db.transaction((tx)=>{
    tx.executeSql("DELETE FROM datarental WHERE id=?",
     [id],
     (tx,result)=>{
       setLoad(true)
     },
     (Error)=>{
       console.log('CANT NOT')
     }
     )
  })
}
  const [dbrental,setdbrental] = useState([])
  console.log(dbrental);
  const getdata = async()=>{
    await db.transaction((tx)=>{
      tx.executeSql("SELECT * FROM datarental",
      [],
      (tx,result)=>{
        console.log(result.rows)
        let dataItem = []
        const len = result.rows.length
        if(len>0){
          for(let i=0;i<len;++i){
            dataItem.push(result.rows.item(i))
            setdbrental(dataItem)
          }
        }else{
          setdbrental([])
        }
          
        
      }
      )
    })
  }
 useEffect(()=>{
   getdata()
   if (load){
     setTimeout(() => {
       setLoad(false)
     },1000);
   }
 },[isfocus,load])
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}> Show </Text>
      {dbrental.length===0?(
        <View style={{flex:1, justifyContent:'center'}}>
          <Text>Khong co du lieu</Text>
        </View>
      ):(
        <FlatList data={dbrental}
        keyExtractor={i=>i.id.toString()}
        contentContainerStyle={{padding:15,}}
        renderItem={({item})=>(
          <View style={{marginBottom:18, flexDirection:'row', backgroundColor:'#fff', borderRadius:16, width:280}}>
            <View style={{padding:10, flex:1, width:'100%'}}>
              
              <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <Text>Name:</Text>
                <Text style={{marginLeft:5}}>{item.report}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <Text>Property Type:</Text>
                <Text style={{marginLeft:5}}>{item.property}</Text>
              </View> 
              <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <Text>Bed Room:</Text>
                <Text style={{marginLeft:5}}>{item.room}</Text>
              </View>  
              <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <Text>Date Time:</Text>
                <Text style={{marginLeft:5}}>{item.dateTime}</Text>
              </View> 
              <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <Text>Monthly Price:</Text>
                <Text style={{marginLeft:5}}>{item.monthlyPrice}</Text>
              </View> 
              <View style={{flexDirection:'row', alignItems:'flex-start'}}>
                <Text>Furniture Type:</Text>
                <Text style={{marginLeft:5}}>{item.furnitureType}</Text>
              </View>    
            </View>
            <View style={{marginTop:7, marginRight:11}}>
              <Icon name='close-outline' color='red' size={25} onPress={()=>deldb(item.id)}/>
            </View>
          </View>
        )}
      />
      )}
      

    </View>

  );
}

const styles = StyleSheet.create({
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