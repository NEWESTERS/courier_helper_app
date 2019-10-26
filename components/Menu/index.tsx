import React, {FC, useEffect} from 'react';
import {Layout} from 'react-native-ui-kitten';
import {ScrollView} from 'react-native'
import useStoreon from 'storeon/react';

import { IState, IStateEvents } from '../../store';
import OrderCard from "../OrderCard";
import { IOrder } from '../../store/orders';

const Menu: FC = () => {
    const { dispatch, orders, activeOrderId } = useStoreon<IState, IStateEvents>("orders", "activeOrderId");

    useEffect(() => {
        dispatch("orders/request");
    }, []);

    const handleItemSelect = (id: number) => {
        dispatch("orders/select", id);
    };

    const renderOrders = (orders: IOrder[]) =>
        orders.map(order =>
            <OrderCard
                key={order.id}
                onPress={() => handleItemSelect(order.id)}
                order={order}
                isActive={order.id === activeOrderId}
            />
        );

    return (
        <Layout style={{flex: 1, paddingTop: 8}}>
            <ScrollView>
                {renderOrders(orders)}
            </ScrollView>
        </Layout>
    )
};

export default Menu;