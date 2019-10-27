import { Module, StoreonEvents } from 'storeon';
import { uniqWith } from 'ramda';

import { IState, IStateEvents } from '.';
import { ICoordinates } from './orders';

export interface IRouteState {
    points: ICoordinates[];
}

const initRouteState: IRouteState = {
    points: []
}

export interface IRouteEvents extends StoreonEvents<IRouteState> {
    "route/appendPoints": ICoordinates[];
    "route/reset": undefined;
}

const routeModule: Module<IState, IStateEvents> = store => {
    store.on("@init", () => initRouteState);

    store.on("route/appendPoints", ({ points }, newPoints) => ({
        points: uniqWith(
            (a, b) => (a[0] === b[0]) && (a[1] === b[1]),
            [ ...points, ...newPoints ]
        )
    }));

    store.on("route/reset", state => ({
        ...state, points: initRouteState.points
    }));
}

export default routeModule;

