import React, { FC } from 'react';
import { View } from 'react-native';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { ApplicationProvider, TabView, Tab } from 'react-native-ui-kitten';
import { Provider } from 'storeon/react/context';
import useStoreon from 'storeon/react'

import Menu from './components/Menu';
import MapView from './components/Map';
import store, { IState, IStateEvents } from './store';
import UserProfile from './components/UserProfile';
import OrderSuggestionModal from './components/OrderSuggestionModal';

const AppPages: FC = () => {
	const { dispatch, viewPagerIndex } = useStoreon<IState, IStateEvents>("viewPagerIndex");

	return (
		<TabView
			selectedIndex={viewPagerIndex}
			onSelect={(index: number) => { dispatch("ui/switchPage", index) }}
			style={{ flex: 1 }}
		>
			<Tab title="Настройки">
				<UserProfile />
			</Tab>

			<Tab title="Заказы">
				<Menu />
			</Tab>
			
			<Tab title="Карта">
				<MapView />
			</Tab>
		</TabView>
	)
}

const App: FC = () => {
	return(
		<ApplicationProvider mapping={mapping} theme={darkTheme}>
			<Provider value={store}>
				<View style={{ paddingTop: 15, flex: 1, position: "relative" }}>
					<AppPages />
					<OrderSuggestionModal />
				</View>
			</Provider>
		</ApplicationProvider>
	)
};

export default App;
