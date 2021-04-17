import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const Control = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.control}>
                <View style={styles.controlLeft}>
                    <Button style={styles.btnCmd} mode="outlined">Place</Button>
                    <Button style={styles.btnCmd} mode="outlined">Detect</Button>
                    <Button style={styles.btnCmd} mode="outlined">Drop</Button>
                    <Button style={styles.btnCmd} mode="outlined">Report</Button>
                </View>
                <View style={styles.controlRight}>
                    <View style={styles.moveTitle}>
                        <Text>MOVE</Text>
                    </View>
                    <View style={styles.moveTop}>
                        <Button style={styles.btnMove} mode="contained">N</Button>
                    </View>
                    <View style={styles.moveBot}>
                        <Button style={styles.btnMove} mode="contained">W</Button>
                        <Button style={styles.btnMove} mode="contained">S</Button>
                        <Button style={styles.btnMove} mode="contained">E</Button>
                    </View>
                </View>
                
            </View>
            <View>
                <Text>Message</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    control: {
        flex: 1,
        flexDirection: 'row'
    },
    controlLeft: {
    },
    controlRight: {
        flexGrow: 1,
    },
    moveTitle: {
        marginBottom: 10,
        alignItems: 'center'
    },
    moveTop: {
        alignItems: 'center'
    },
    moveBot: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    btnMove: {
        margin: 1
    },
    btnCmd: {
        margin: 5
    }
})

export default Control;