import createStore from 'storeon';

import ordersModule, { IOrdersState, IOrdersEvents } from './orders';
import uiModule, { IUIState, IUIEvents } from './ui';
import { IRouteState, IRouteEvents } from './route';

export type IState = IOrdersState & IUIState & IRouteState;

export type IStateEvents = IOrdersEvents & IUIEvents & IRouteEvents;

export default createStore<IState, IStateEvents>([ordersModule, uiModule]);