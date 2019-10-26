import {Module, StoreonEvents} from 'storeon';
import {uniqBy} from 'ramda';

import {IState, IStateEvents} from '.';

interface TPoint {
    x: number;
    y: number;
}

type ICoordinates = [number, number];

export interface IOrder {
    id: number;
    name: string;
    start: ICoordinates;
    finish: ICoordinates;
    orderDate: string;
    status: string;
    registrationDate: string;
    orderStatus: string;
    fromLocation: TPoint;
    toLocation: TPoint;
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

const initOrdersState: IOrdersState = {
    activeOrderId: null,
    orders: [],
    suggestedOrders: []
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