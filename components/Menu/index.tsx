import React, {FC, useEffect} from 'react';
import {Layout} from 'react-native-ui-kitten';
import useStoreon from 'storeon/react';

import {IState, IStateEvents} from '../../store';
import OrderCard from "../OrderCard";

const Menu: FC = () => {
    const { dispatch, orders, activeOrderId } = useStoreon<IState, IStateEvents>("orders", "activeOrderId");

    useEffect(() => {
        dispatch("orders/request");
    }, []);

    const handleItemSelect = (id: number) => {
        dispatch("orders/select", id);
    };

    const renderOrders = orders => {
        return orders.map(o => <OrderCard onPress={() => handleItemSelect(o.id)} key={o.id} name={o.name} status={o.orderStatus} order_date={o.registrationDate}/>);
    };

    return (
        <Layout style={{flex: 1, paddingTop: 8}}>
            {renderOrders(orders)}
        </Layout>
    )
};

export default Menu;