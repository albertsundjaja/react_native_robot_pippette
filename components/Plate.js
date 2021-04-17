import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { View, StyleSheet, Text } from 'react-native';

import { cmdReset } from '../store/plateStore'; 

import Well from './Well';

// container for wells
const Plate = (props) => {
    const dispatch = useDispatch();
    const wellMatrix = useSelector(state => state.plate.wellMatrix);

    useEffect(() => {
        // on start, create empty 5x5 matrix of wells
        dispatch(cmdReset(5));
    }, []);

    const renderPlate = (matrix) => {
        return matrix.map((row, idx) => {
            return (
                <View key={idx} style={styles.plateRow}>
                    {renderWell(row)}
                </View>
            )
        })
    }

    const renderWell = (wells) => {
        return wells.map((well) => {
            return (
                <Well key={well.col} 
                    row={well.row} col={well.col}
                    x={well.x} y={well.y} robot={well.robot}
                    filled={well.filled} />
            )
        })
    }
    return (
        <View style={styles.plate}>
            {renderPlate(wellMatrix)}
        </View>
    )
}

const styles = StyleSheet.create({
    plate: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        flexDirection: 'column',
    },
    plateRow: {
        flex: 1,
        flexDirection: 'row'
    }
})

export default Plate;