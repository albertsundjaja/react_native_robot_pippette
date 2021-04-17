import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

// represent a well in a plate
const Well = (props) => {
    return (
        <View style={[styles.card, {backgroundColor: props.filled ? "#d9534f" : "#5cb85c"}]}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{`${props.x},${props.y}`}</Text>
                {props.robot ? <Image style={styles.robot} source={require('../assets/images/robot.png')} /> : <></>}
            </View>
        </View>
    )
}

Well.propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderWidth: 1,
        margin: 2,
        borderStyle: 'solid'
    },
    robot: {
        maxWidth: 25,
        maxHeight: 25
    }
})

export default Well;