import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modelcs from '../modal/Modalcs';
import ModalWrap from '../modal/Modale';
import Form from './Form';

export default function Home({navigation}) {
  const [show, setShow] = useState (false)
  const [status, setStatus] = useState ('')
  return (
    <View style={styles.container}>
      {status==='error'?(<ModalWrap show={show} setShow={setShow}/>):(<Modelcs show={show} setShow={setShow}/>)}
      <Text style={styles.textHeading}> Rental Apartments Finder </Text>
      <Form navigation={navigation} setShow={setShow} setStatus={setStatus}/>
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
      marginTop:25,
      fontSize:15,
      fontWeight:'bold',
      fontFamily:'oxygen',
  }
  
});