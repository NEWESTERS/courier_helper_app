import React, {FC} from 'react';
import {TouchableOpacity, View} from "react-native";
import {Avatar, Text} from "react-native-ui-kitten";
import {IOrder} from '../../store/orders';
import {style} from './OrderCard.styles';
import {getAvatar} from './avatarImage';

interface IProps {
    order: IOrder
    onPress: () => void;
    isActive: boolean;
}

const OrderCard: FC<IProps> = props => {
    const {order: {id, name, orderDate, price, customer}, order, onPress, isActive} = props,
        backgroundColor = isActive ? '#e6ffff' : '#e6ebff';


    return (
        <TouchableOpacity style={[style.CardWrapper, {backgroundColor}]} onPress={onPress}>
            <View style={style.PicHolder}>
                <Avatar style={style.Avatar} source={getAvatar(id)}/>
            </View>

            <View style={style.Description}>
                <Text style={style.Name}> {name}</Text>

                <View style={style.StatusBar}>
                    <Text style={style.Name}>{customer.name + " " + customer.surname}</Text>
                </View>
                <View style={style.Price}>
                    <Text style={style.Name}>{price + " руб."}</Text>
                </View>
                <Text style={style.Date}>{orderDate}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default OrderCard;
