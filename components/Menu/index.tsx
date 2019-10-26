import React, { FC, useEffect } from 'react';
import { Layout, List, ListItem } from 'react-native-ui-kitten';
import { ListRenderItemInfo, StyleSheet, Text } from 'react-native';
import useStoreon from 'storeon/react';

import { IState, IStateEvents } from '../../store';
import { IOrder } from '../../store/orders';

const Menu: FC = () => {
    const { dispatch, orders, activeOrderId } = useStoreon<IState, IStateEvents>("orders", "activeOrderId");

    useEffect(() => {
        dispatch("orders/request");
    }, []);

    const handleItemSelect = (id: number) => {
        dispatch("orders/select", id);
    }

    const renderItem = ({ item: { name, id }, index }: ListRenderItemInfo<IOrder>) => {
        const color = activeOrderId === id ? "green" : "white";

        return (
            <ListItem
                key={index}
                onPress={() => handleItemSelect(id)}
            >   
                <Text style={{ color }}>{name}</Text>
            </ListItem>
        )
    };

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>
            <List
                style={styles.list}
                data={orders}
                renderItem={renderItem}
            />
        </Layout>
    )
};

const styles = StyleSheet.create({
    list: {
        height: "100%",
        width: "100%"
    }
})

export default Menu;