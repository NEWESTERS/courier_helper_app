import {Module, StoreonEvents} from 'storeon';
import {uniqBy} from 'ramda';

import {IState, IStateEvents} from '.';

interface TPoint {
    x: number;
    y: number;
}

export type ICoordinates = [number, number];

export enum OrderStatus {
    Registered = "REGISTERED",
    InProgress = "IN_PROGRESS",
    Assigned = "ASSIGNED",
    Done = "DONE"
}

export interface IOrder {
    id: number;
    name: string;
    orderDate: string;
    registrationDate: string;
    orderStatus: OrderStatus;
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
    'orders/set': undefined;

                                                     }

const mockOrders: IOrder[] = [
    {
        id: 1,
        name: "Фейковый заказ раз",
        orderDate: "27.10.2019",
        registrationDate: "26.10.2019",
        orderStatus: OrderStatus.Registered,
        fromLocation: {x: 40, y: 40},
        toLocation: {x: 80, y: 80}
    }
]

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
                    store.dispatch("orders/set", json);
                });
            }
        });
    });

    store.on("orders/select", (_state, id) => ({
        activeOrderId: id
    }));

    store.on("orders/pushSuggested", ({suggestedOrders}, order) => ({
        suggestedOrders: [...suggestedOrders, order]
    }));

    store.on("orders/popSuggested", ({suggestedOrders}) => ({
        suggestedOrders: suggestedOrders.slice(1, suggestedOrders.length - 1)
    }));

    store.on("orders/acceptSuggested", () => {
        store.dispatch("orders/popSuggested");
    });

    store.on("orders/append", ({orders}, newOrders) => ({
        orders: uniqBy(({id}) => id, [...orders, ...newOrders])
    }));

    store.on("orders/set", ({orders}, newOrders) => ({
        orders: newOrders
    }));
}

export default ordersModule;