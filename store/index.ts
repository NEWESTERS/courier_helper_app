import createStore from 'storeon';

import ordersModule, { IOrdersState, IOrdersEvents } from './orders';
import uiModule, { IUIState, IUIEvents } from './ui';

export type IState = IOrdersState & IUIState;

export type IStateEvents = IOrdersEvents & IUIEvents;

export default createStore<IState, IStateEvents>([ordersModule, uiModule]);