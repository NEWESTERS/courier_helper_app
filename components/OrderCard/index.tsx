import * as React from 'react';
import {View} from "react-native";
import {style} from './OrderCard.styles'
import {Avatar, Text} from "react-native-ui-kitten";
import StatusOrderBar from "../StatusBar";

interface IProps {
    name: string;
    orderDate: string;
    status: string;
    onPress: () => void;
}

class OrderCard extends React.Component<IProps> {
    render() {
        const { name, orderDate, status, onPress} = this.props;
        return (
            <View style={style.CardWrapper} onTouchEnd={onPress}>
                <View style={style.PicHolder}>
                    <Avatar style={style.Avatar} source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}/>
                </View>
                <View style={style.Description}>
                    <Text style={style.Name}> {name}</Text>
                    <View style={style.StatusBar}>
                        <StatusOrderBar status={status}/>
                    </View>
                    <Text style={style.Date}>{orderDate}</Text>
                </View>
            </View>
        );
    }
}

export default OrderCard;
