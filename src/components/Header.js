import React from 'react';
import { Text, View } from 'react-native';

//props.headerText parametre props birden fazla eklemek için gerekli
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    textStyle: {
        fontSize: 35
    },
    viewStyle: {
        backgroundColor: 'grey',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        elevation: 10
    }
};

export default Header;
