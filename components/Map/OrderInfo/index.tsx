import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-ui-kitten';
import { isNil } from 'ramda';

import { useSelectActiveOrder, useSelectActiveRoute } from '../../../store/selectors';
import { useDispatch } from '../../../store/utils';
import { mapPointToCoordinates } from '../../../store/orders';

interface IProps {
    onReset: () => void;
}

const OrderInfo: FC<IProps> = ({ onReset }) => {
    const order = useSelectActiveOrder(),
        route = useSelectActiveRoute(),
        dispatch = useDispatch();

    if(!isNil(order)) {
        const handleAccept = () => {
            dispatch("route/appendPoints", [
                mapPointToCoordinates(order.fromLocation),
                mapPointToCoordinates(order.toLocation)
            ]);
            onReset();
        };

        return (
            <View style={styles.orderInfo}>
                <Text style={styles.price}>Стоимость: {order.price}💵</Text>
                <Button status="success" onPress={handleAccept}>Принять в работу</Button>
                <Button status="danger" appearance="ghost" onPress={onReset}>Сбросить маршрут</Button>
            </View>
        )
    }

    if(!isNil(route)) {
        return (
            <View style={styles.orderInfo}>
                <Text style={{ fontSize: 50 }}>🚛</Text>
                <Text style={styles.price}>Заказ в работе</Text>
            </View>
        )
    }

    return null;
}

const styles = StyleSheet.create({
    orderInfo: {
        position: "absolute",
        height: 150,
        bottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%",
        backgroundColor: "#355dfa",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.19,
        shadowRadius: 4.65,
        elevation: 7,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20
    },
    price: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        margin: 10
    }
})

export default OrderInfo;