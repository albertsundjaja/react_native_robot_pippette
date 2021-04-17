import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import Plate from '../components/Plate';
import Control from '../components/Control';

const Main = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header>
                
            </Appbar.Header>
            <View style={styles.plate}>
                <Plate />
            </View>
            <View style={styles.control}>
                <Control />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eaeaea",
        marginTop: StatusBar.currentHeight || 0,
    },
    plate : {
        height: "55%"
    },
    control: {
        height: "45%"
    }
  });
  

export default Main;