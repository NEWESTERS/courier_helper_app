import React, { FC, useState } from 'react';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { ApplicationProvider, ViewPager } from 'react-native-ui-kitten';
import { Provider } from 'storeon/react/context';
import useStoreon from 'storeon/react'

import Menu from './components/Menu';
import MapView from './components/Map';
import store, { IState, IStateEvents } from './store';

const AppPages: FC = () => {
	const { dispatch, viewPagerIndex } = useStoreon<IState, IStateEvents>("viewPagerIndex");

	return (
		<ViewPager
			selectedIndex={viewPagerIndex}
			onSelect={(index: number) => { dispatch("ui/switchPage", index) }}
			style={{ flex: 1 }}
		>
			<Menu />
			<MapView />
		</ViewPager>
	)
}

const App: FC = () => {
	
	return(
		<ApplicationProvider mapping={mapping} theme={darkTheme}>
			<Provider value={store}>
				<AppPages />
			</Provider>
		</ApplicationProvider>
	)
};

export default App;
