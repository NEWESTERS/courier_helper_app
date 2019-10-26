import { Module, StoreonEvents } from 'storeon';
import { uniqBy } from 'ramda';

import { IState, IStateEvents } from '.';

type ICoordinates = [ number, number ];

export interface IOrder {
    id: number;
    name: string;
    start: ICoordinates;
    finish: ICoordinates;
}

export interface IOrdersState {
    activeOrderId: number | null;
    orders: IOrder[];
    suggestedOrders: IOrder[];
}

export interface IOrdersEvents extends StoreonEvents<IOrdersState> {
    'orders/append': IOrder[];
    'orders/request': undefined;
    'orders/select': number | null;
    'orders/pushSuggested': IOrder;
    'orders/popSuggested': undefined;
    'orders/acceptSuggested': undefined;
}

const mockOrders: IOrder[] = [
    {
        id: 1,
        name: "Заказ номер раз",
        start: [55.80, 37.50],
        finish: [55.80, 37.40]
    },
    {
        id: 2,
        name: "Заказ номер двас",
        start: [55.70, 37.50],
        finish: [55.70, 37.60]
    },
    {
        id: 3,
        name: "Заказ номер трис",
        start: [55.60, 37.50],
        finish: [55.70, 37.50]
    },
];

const initOrdersState: IOrdersState = {
    activeOrderId: null,
    orders: [],
    suggestedOrders: []
}

const ordersModule: Module<IState, IStateEvents> = store => {
    store.on("@init", () => initOrdersState);

    store.on("orders/request", () => {
        setTimeout(() => {
            store.dispatch("orders/append", mockOrders);
        }, 1000);
    });

    store.on("orders/select", (_state, id) => ({
        activeOrderId: id
    }));

    store.on("orders/pushSuggested", ({ suggestedOrders }, order) => ({
        suggestedOrders: [ ...suggestedOrders, order ]
    }));

    store.on("orders/popSuggested", ({ suggestedOrders }) => ({
        suggestedOrders: suggestedOrders.slice(1, suggestedOrders.length - 1)
    }));

    store.on("orders/acceptSuggested", ({ suggestedOrders }) => ({
        suggestedOrders: suggestedOrders.slice(1, suggestedOrders.length - 1)
    }));

    store.on("orders/append", ({ orders }, newOrders) => ({
        orders: uniqBy(({ id }) => id, [ ...orders, ...newOrders ])
    }));
}

export default ordersModule;