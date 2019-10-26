import {StyleSheet} from "react-native";

const Ball = {
    height: 10,
    width: 10,
    borderRadius: 7,
    marginLeft: 2,
    marginRight: 10
};

export const styleStatus = StyleSheet.create({
    Wrapper: {
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStatus:{
        width: 135,
        padding: 4,
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 12,
        opacity: .8,
        textAlign: "center"
    },
    Bar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    grayBall: {
        ...Ball,
        backgroundColor: 'gray'
    },
    greenBall: {
        ...Ball,
        backgroundColor: 'green',
    }

});