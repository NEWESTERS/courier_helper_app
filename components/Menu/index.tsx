import React, {FC, useEffect} from 'react';
import {Layout} from 'react-native-ui-kitten';
import {ScrollView} from 'react-native'
import useStoreon from 'storeon/react';

import {IState, IStateEvents} from '../../store';
import OrderCard from "../OrderCard";
import {IOrder} from '../../store/orders';
import {pushNotifications} from "../../config";
import SockJsClient from 'react-stomp';

pushNotifications.configure();

const Menu: FC = () => {
    const {dispatch, orders, activeOrderId} = useStoreon<IState, IStateEvents>("orders", "activeOrderId");

    useEffect(() => {
        dispatch("orders/request");
    }, []);

    const handleItemSelect = (id: number) => {
        dispatch("orders/select", id);
        // window.setInterval(() => pushNotifications.orderAssigned(), 2000);
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
            <SockJsClient url='http://ruavuai-zos6.localhost.run/orders' topics={['/topic/order']}
                          onMessage={msg => { dispatch("orders/append", [msg]); }}/>
            <ScrollView>
                {orders && renderOrders(orders)}
            </ScrollView>
        </Layout>
    )
};

export default Menu;