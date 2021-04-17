import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';

import { cmdPlace, cmdMove } from '../store/plateStore';

const Control = (props) => {
    const dispatch = useDispatch();
    const currMatrix = useSelector(state => state.plate.wellMatrix);
    const cmdError = useSelector(state => state.plate.cmdError);
    const errorMsg = useSelector(state => state.plate.errorMsg);
    const [showPlaceDialog, setShowPlaceDialog] = useState(false);
    const [placeCoor, setPlaceCoor] = useState({x: "0", y: "0"});
    const sendCmdPlace = () => {
        dispatch(cmdPlace(placeCoor));
        setShowPlaceDialog(false);
    }   
    const sendCmdMove = (direction) => {
        dispatch(cmdMove(direction));
    }
    return (
        <View style={styles.container}>
            <Portal>
                <Dialog visible={showPlaceDialog} onDismiss={() => setShowPlaceDialog(false)}>
                    <Dialog.Content>
                        <TextInput mode="outlined" value={placeCoor.x} onChangeText={text => setPlaceCoor({...placeCoor, x: text})} placeholder="x coordinate" keyboardType="number-pad" />
                        <TextInput mode="outlined" value={placeCoor.y} onChangeText={text => setPlaceCoor({...placeCoor, y: text})} placeholder="y coordinate" keyboardType="number-pad"/>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode="contained" onPress={() => sendCmdPlace()}>Place</Button>
                        <Button onPress={() => setShowPlaceDialog(false)}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={styles.control}>
                <View style={styles.controlLeft}>
                    <Button style={styles.btnCmd} mode="outlined" onPress={() => setShowPlaceDialog(true)}>Place</Button>
                    <Button style={styles.btnCmd} mode="outlined">Detect</Button>
                    <Button style={styles.btnCmd} mode="outlined">Drop</Button>
                    <Button style={styles.btnCmd} mode="outlined">Report</Button>
                    <Button style={styles.btnCmd} mode="outlined" onPress={() => console.log(currMatrix)}>check</Button>
                </View>
                <View style={styles.controlRight}>
                    <View style={styles.controlRightMove}>
                        <View style={styles.moveTitle}>
                            <Text>MOVE</Text>
                        </View>
                        <View style={styles.moveTop}>
                            <Button style={styles.btnMove} mode="contained" onPress={() => sendCmdMove('N')}>N</Button>
                        </View>
                        <View style={styles.moveBot}>
                            <Button style={styles.btnMove} mode="contained" onPress={() => sendCmdMove('W')}>W</Button>
                            <Button style={styles.btnMove} mode="contained" onPress={() => sendCmdMove('S')}>S</Button>
                            <Button style={styles.btnMove} mode="contained" onPress={() => sendCmdMove('E')}>E</Button>
                        </View>
                    </View>
                    <View style={styles.controlRightErr}>
                        <Text style={styles.errorMsg}>{errorMsg}</Text>
                    </View>
                </View>
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
    controlRightMove: {
        height: "60%"
    },  
    controlRightErr: {
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    errorMsg: {
        fontSize: 15,
        color: "red"
    }
})

export default Control;