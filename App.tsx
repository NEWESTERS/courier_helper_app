import React, {FC} from 'react';
import {View} from 'react-native';
import {dark as darkTheme, mapping} from '@eva-design/eva';
import {ApplicationProvider, Tab, TabView} from 'react-native-ui-kitten';
import {Provider} from 'storeon/react/context';
import useStoreon from 'storeon/react'

import Menu from './components/Menu';
import MapView from './components/Map';
import store, {IState, IStateEvents} from './store';
import UserProfile from './components/UserProfile';
import OrderSuggestionModal from './components/OrderSuggestionModal';

const AppPages: FC = () => {
    const {dispatch, viewPagerIndex} = useStoreon<IState, IStateEvents>("viewPagerIndex");

    return (
        <TabView
            selectedIndex={viewPagerIndex}
            onSelect={(index: number) => {
                dispatch("ui/switchPage", index)
            }}
            style={{flex: 1}}
        >
            <Tab title="Настройки">
                <UserProfile/>
            </Tab>

            <Tab title="Заказы">
                <Menu/>
            </Tab>

            <Tab title="Карта">
                <MapView/>
            </Tab>
        </TabView>
    )
}

var ws = new WebSocket('ws://localhost:8080/orders/topic/order');

ws.onopen = () => {
    // connection opened
    ws.send('something'); // send a message
};

ws.onmessage = (e) => {
    // a message was received
    console.log(e.data);
};

ws.onerror = (e) => {
    // an error occurred
    console.log(e);
};

ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
};

const App: FC = () => {
    return (
        <ApplicationProvider mapping={mapping} theme={darkTheme}>
            <Provider value={store}>
                <View style={{paddingTop: 15, flex: 1, position: "relative"}}>
                    <AppPages/>
                    <OrderSuggestionModal/>
                </View>
            </Provider>
        </ApplicationProvider>
    )
};

export default App;