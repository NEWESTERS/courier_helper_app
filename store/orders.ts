import {Module, StoreonEvents} from 'storeon';
import {uniqBy} from 'ramda';

import {IState, IStateEvents} from '.';

type ICoordinates = [number, number];

export interface IOrder {
    id: number;
    name: string;
    start: ICoordinates;
    finish: ICoordinates;
}

export interface IOrdersState {
    activeOrderId: number | null;
    orders: IOrder[];
}

export interface IOrdersEvents extends StoreonEvents<IOrdersState> {
    'orders/append': IOrder[];
    'orders/request': undefined;
    'orders/select': number | null;
}

const initOrdersState: IOrdersState = {
    activeOrderId: null,
    orders: []
}

const ordersModule: Module<IState, IStateEvents> = store => {
    store.on("@init", () => initOrdersState);

    store.on("orders/request", () => {
        fetch("http://ruavuai-zos6.localhost.run/api/orders/").then(response => {
            if (response.ok) {
                response.json().then(json => {
                    store.dispatch("orders/append", json);
                });
            }
        });
    });

    store.on("orders/select", (_state, id) => ({
        activeOrderId: id
    }));

    store.on("orders/append", (state, orders) => ({orders: uniqBy(({id}) => id, [...state.orders, ...orders])}));
};

export default ordersModule;