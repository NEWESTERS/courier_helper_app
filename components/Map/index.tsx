import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from'react-native';
import { WebView } from 'react-native-webview';
import { Button, Layout, Spinner, ButtonGroup } from 'react-native-ui-kitten';
import useStoreon from 'storeon/react';
import { isNil } from 'ramda';

import { IState, IStateEvents } from '../../store';
import OrderInfo from './OrderInfo';
import { useSelectActiveRoute } from '../../store/selectors';

const { mapInitLogicString, createMapRouteLogicString } = require('./logic');

const MapView: React.FC = () => {
    const webViewRef = useRef<WebView | null>(null),
        [ isMapLoading, setIsMapLoading ] = useState(true),
        { dispatch, activeOrderId, orders } = useStoreon<IState, IStateEvents>("activeOrderId", "orders"),
        [ routingMode, setRoutingMode ] = useState<"auto" | "pedestrian" | "bicycle">("auto"),
        route = useSelectActiveRoute();

    useEffect(() => {
        if(isNil(webViewRef.current)) {
            return;
        }

        if(!isNil(activeOrderId)) {
            const { fromLocation, toLocation } = orders.find(({ id }) => id === activeOrderId)!;
            webViewRef.current.injectJavaScript(
                createMapRouteLogicString([
                    [fromLocation.x, fromLocation.y], [toLocation.x, toLocation.y],
                ], routingMode)
            )
        } else if(!isNil(route)) {
            webViewRef.current.injectJavaScript(
                createMapRouteLogicString(route, routingMode)
            )
        }
    }, [ activeOrderId, route, routingMode ]);

    const handleResetClick = () => {
        if(webViewRef.current) {
            webViewRef.current.injectJavaScript(createMapRouteLogicString([], routingMode));
            dispatch("orders/select", null);
        }
    };

    const html = `
        <html>
            <head>
                <script src="https://api-maps.yandex.ru/2.1/?apikey=89bf1ee8-8e73-40a0-b160-67178b6d6c77&lang=ru_RU" type="text/javascript">
                </script>
            </head>
            <body>
                <div id="map" style="width: 100%; height: 100%"></div>
                <script type="text/javascript">${mapInitLogicString}</script>
            </body>
        </html>
    `;

    return (
	    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20}}>    
            <View style={{ flex: 1, height: "100%", width: "100%", position: "relative" }}>
                <ButtonGroup>
                    <Button onPress={() => setRoutingMode("pedestrian")}>Пешком</Button>
                    <Button onPress={() => setRoutingMode("auto")}>На машине</Button>
                    <Button onPress={() => setRoutingMode("bicycle")}>На велосипеде</Button>
                </ButtonGroup>

                <WebView
                    ref={webViewRef}
                    source={{ html }}
                    onMessage={({ nativeEvent }) => { 
                        if(nativeEvent) {
                            setIsMapLoading(false);
                        }
                    }}
                />

                <View style={styles.loaderContainer} >
                    { isMapLoading &&
                        <Spinner />
                    }
                </View>

                <OrderInfo
                    onReset={handleResetClick}
                />                
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    loaderContainer: {
        position: "absolute",
        top: "50%",
        left: "50%"
    }
});

export default MapView;