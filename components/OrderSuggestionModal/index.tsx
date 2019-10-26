import React, { FC } from 'react';
import { Text, Layout, ButtonGroup, Button } from 'react-native-ui-kitten';
import { StyleSheet, View } from 'react-native';
import { isNil } from 'ramda';

import { useSelectSuggestedOrder } from '../../store/selectors';
import { useDispatch } from '../../store/utils';

const OrderSuggestionModal: FC = () => {
    const suggestedOrder = useSelectSuggestedOrder(),
        dispatch = useDispatch(),
        isOrderSuggested = !isNil(suggestedOrder);

    const handleDecline = () => {
        dispatch("orders/popSuggested");
    }

    const handleAccept = () => {
        dispatch("orders/acceptSuggested");
    }

    if(isOrderSuggested) {
        return (
            <View style={styles.modal}>
                <Text style={styles.title}>Рекомендация</Text>

                <Text style={styles.mainText}>Вы можете выполнить дополнительный заказ по пути</Text>

                <View style={styles.buttonContainer}>
                    <Button status="success" onPress={handleAccept}>Принять</Button>
                    <Button status="danger" onPress={handleDecline}>Отклонить</Button>
                </View>
            </View>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black"
    },
    mainText: {
        width: "100%",
        color: "black",
        textAlign: "center"
    },
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [ { translateX: -150 }, { translateY: -50 } ],
        borderRadius: 10,
        height: 170,
        width: 300,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    }
});

export default OrderSuggestionModal;