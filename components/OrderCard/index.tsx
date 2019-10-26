import React, { FC } from 'react';
import {View, TouchableOpacity} from "react-native";
import {Avatar, Text} from "react-native-ui-kitten";

import StatusOrderBar from "../StatusBar";
import { OrderStatus, IOrder } from '../../store/orders';
import {style} from './OrderCard.styles';
import { getAvatar } from './avatarImage';

interface IProps {
    order: IOrder
    onPress: () => void;
    isActive: boolean;
}

const OrderCard: FC<IProps> = props => {
    const { order: { id, name, orderDate, orderStatus }, onPress, isActive } = props,
        backgroundColor = isActive ? '#e6ffff' : '#e6ebff';

    return (
        <TouchableOpacity style={[style.CardWrapper, { backgroundColor }]} onPress={onPress}>
            <View style={style.PicHolder}>
                <Avatar style={style.Avatar} source={getAvatar(id)}/>
            </View>

            <View style={style.Description}>
                <Text style={style.Name}> {name}</Text>
                
                <View style={style.StatusBar}>
                    <StatusOrderBar status={orderStatus}/>
                </View>

                <Text style={style.Date}>{orderDate}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default OrderCard;
