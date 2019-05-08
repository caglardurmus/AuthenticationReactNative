import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
    return (
        <View style = {styles.spinnetStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
}

const styles = {
    spinnetStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default Spinner;
