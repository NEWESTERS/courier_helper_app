import { Module, StoreonEvents } from 'storeon';
import { IState, IStateEvents } from '.';

export enum ViewPagerIndex {
    List = 0,
    Map = 1
}

export interface IUIState {
    viewPagerIndex: ViewPagerIndex;
}

const initUIState: IUIState = {
    viewPagerIndex: ViewPagerIndex.List
}

export interface IUIEvents extends StoreonEvents<IUIState> {
    "ui/switchPage": ViewPagerIndex;
}

const uiModule: Module<IState, IStateEvents> = store => {
    store.on("@init", () => initUIState);

    store.on("ui/switchPage", (_state, index) => ({ viewPagerIndex: index }));

    store.on("orders/select", () => ({ viewPagerIndex: ViewPagerIndex.Map }))
}

export default uiModule;