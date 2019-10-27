import {StyleSheet} from "react-native";
import {borderRadius, padding} from "../../constants";

export const style = StyleSheet.create({
    CardWrapper:{
        backgroundColor: '#e6ebff',
        height: 100,
        width: '94%',
        marginLeft: '3%',
        marginTop: 10,
        borderRadius: borderRadius,
        display: 'flex',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    PicHolder:{
        width: 95,
        padding: padding,
        paddingLeft: 15,
    },
    Avatar:{
        width: 75,
        height: 75,
        borderWidth: 5,
        borderColor: "#355dfa"
    },
    Description:{
        padding: 12,
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 10,
    },
        Name:{
            height: 20,
            fontSize: 20,
            fontWeight: '600',
            color: "black"
        },
        StatusBar:{
            display: 'flex',
            flexDirection:'row',
            alignItems: 'center',
            paddingLeft: 5,
            fontSize: 15,
            fontWeight: '400',
            height: 35
        },
    Price:{
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft: 135,
        fontSize: 15,
        fontWeight: '400',
        height: 35
    },
        Date:{
            paddingLeft: 5,
            height: 20,
            color: "black"
        }

});