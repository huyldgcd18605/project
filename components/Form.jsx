import React,{ useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import Iconcool from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('name','1.0')
const Form = ({ setShow, setStatus}) => {
    const [info,setInfo] = useState({
        propertyType:'',
        Room:null,
        furnitureType:null,
        monthlyPrice:'',
        report:'',
        note:'',
        dateTime:'',

    })
    console.log(info)
    const onChange =(name)=>(value)=>{
        setInfo({...info,[name]:value})
    }
    const holder = (fieldName)=>{
    const placeHolder = {
        label:`Choose any ${fieldName}`,
        value:null
    }
    return placeHolder
    }   
    const insert = async(insertvalue)=>{
        const {propertyType, Room, furnitureType, monthlyPrice, report, note, dateTime} = insertvalue
        

        try {
            await db.transaction((tx)=>{
                tx.executeSql(
                    `
                    INSERT INTO datarental
                    (property, room, datetime, monthlyPrice, furnitureType, note, report)
                    VALUES (?,?,?,?,?,?,?)
                    `,
                    [propertyType, Room, dateTime,monthlyPrice,furnitureType, note, report],
                (tx,result)=>{
                    console.log('success insert!');
                    console.log(result);
                }
                )
            })
        } catch (error) {
            console.log('loi')
        }
    }
    const onCreate = (value) => {
        if(value.propertyType ==='' || value.monthlyPrice ==='' || value.dateTime ==='' || value.report ===''){
           setShow(true)
           setStatus('error')
        }else if(value.Room === null){
            setShow(true)
           setStatus('error')
        }
        else {
            insert(value)
            setShow(true)
            setStatus('')
            setInfo({
                propertyType:'',
                Room:null,
                furnitureType:null,
                monthlyPrice:'',
                report:'',
                note:'',
                dateTime:'',
        
            })
        }
    }
    return (
        <View style={styles.Form}>
        <ScrollView contentContainerStyle={styles.Scroll}>
            <View style={styles.Inside}>
            <Text>Property Types</Text>
            <TextInput style={styles.input} 
             value={info.propertyType} 
             onChangeText={onChange('propertyType')}/>
             <Text style={styles.label}>Rooms</Text>
             <RNPickerSelect style={stylePickerSelect}
             useNativeAndroidPickerStyle={false}
             placeholder={holder('room')}
            Icon={()=>{
                return (
                    <Iconcool
              style={{
                  marginTop:14,
                  marginRight:7
              }}
               name="caret-down-circle-outline" size={22} color="black" />
               )
            }}
            onValueChange={(value) => setInfo({...info,Room:value})}
            value={info.Room}
            items={
                [
                {
                    label: 'One',
                    value: 'one',
                    
                },
                {
                    label: 'Two',
                    value: 'two',
                },
                {
                    
                    label: 'Studio',
                    value: 'studio',
                },
                ]
            }
            />
            <Text>DateTime</Text>
            <TextInput style={styles.input} 
             value={info.dateTime} 
             onChangeText={onChange('dateTime')}/>
             <Text style={styles.label}>FurnitureType</Text>
             <RNPickerSelect style={stylePickerSelect}
             useNativeAndroidPickerStyle={false}
             placeholder={holder('furnituretype')}
            Icon={()=>{
                return (
                    <Iconcool
              style={{
                  marginTop:14,
                  marginRight:7
              }}
               name="caret-down-circle-outline" size={22} color="black" />
               )
            }}
            value={info.furnitureType}
            onValueChange={(value) => setInfo({...info,furnitureType:value})}
            items={
                [
                {
                    label: 'Furnished',
                    value: 'furnished',
                },
                {            
                    label: 'Part Furnished',
                    value: 'part furnished',
                },
                {
                    label: 'Unfurnished',
                    value: 'unfurnished',
                },         
                ]
            }
            />
             <Text>MonthlyPrice</Text>
            <TextInput style={styles.input} 
             value={info.monthlyPrice} 
             onChangeText={onChange('monthlyPrice')}
             keyboardType={'numeric'}
             />
             <Text>Notes</Text>
            <TextInput style={styles.input} 
             value={info.note} 
             onChangeText={onChange('note')}/>
             <Text>Report</Text>
            <TextInput style={styles.input} 
             value={info.report} 
             onChangeText={onChange('report')}/>
        </View>
        </ScrollView>
        <View style={styles.create}>
        <TouchableOpacity
        style={styles.button}
        onPress={()=>onCreate(info)}
        >
        <Text style={styles.click}>Create</Text>
        </TouchableOpacity>
        </View> 
               
        </View>
       
    )
    
}


const stylePickerSelect = StyleSheet.create({
    inputAndroid: {
        fontSize: 15,
        paddingHorizontal: 11,
        paddingRight: 28,
        paddingVertical: 9,
        borderRadius: 3,
        marginTop:6,
        borderWidth: 1,
        color: '#000000',
        borderColor: '#000000',
      },
  });
  const styles = StyleSheet.create({
      Form: {
      display:'flex',
      flexDirection:'column',
      marginTop:5,
      justifyContent:'center',
      height:510
    },    
    Scroll:{
        flexGrow:1
    },
    Inside:{
        flexDirection:'column',
        display:'flex',
        padding:19
    },
    input:{
        borderColor:'#000000',
        borderStyle:'solid',
        marginTop:8,
        borderRadius: 4,
        borderWidth:1,
        padding:11,
        height:50,
        width:270,
    },
    create:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',  
        paddingTop:50      
    },
    button:{
        width:165,
        borderStyle:'solid',
        borderWidth:1,
        borderRadius:4,
        borderColor:'#000000',
        backgroundColor:'#4d8f57',
        height:52
    },
    click:{
        textAlign:'center',
        paddingTop:15,
        fontSize:16,
        color:'#fff'
    }
  });
export default Form
