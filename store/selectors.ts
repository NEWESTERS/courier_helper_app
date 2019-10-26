import useStoreon from 'storeon/react';

import { IState, IStateEvents } from '.';

export const useSelectActiveOrder = () => {
    const { activeOrderId, orders } = useStoreon<IState, IStateEvents>("activeOrderId", "orders");

    if(activeOrderId !== null) {
        return orders.find(({ id }) => id === activeOrderId)!;
    } else {
        return null;
    }
}

export const useSelectSuggestedOrder = () => {
    const { suggestedOrders } = useStoreon<IState, IStateEvents>("suggestedOrders");

    return suggestedOrders.length > 0
        ? suggestedOrders[0]
        : null;
}