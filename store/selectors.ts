import useStoreon from 'storeon/react';
import { isNil, isEmpty } from 'ramda';

import { IState, IStateEvents } from '.';

export const useSelectActiveOrder = () => {
    const { activeOrderId, orders } = useStoreon<IState, IStateEvents>("activeOrderId", "orders");

    if(!isNil(activeOrderId)) {
        return orders.find(({ id }) => id === activeOrderId)!;
    } else {
        return null;
    }
}

export const useSelectActiveRoute = () => {
    const { points } = useStoreon<IState, IStateEvents>("points");

    if(!isEmpty(points)) {
        return points;
    } else {
        return null;
    }
}

export const useSelectSuggestedOrder = () => {
    const { suggestedOrders } = useStoreon<IState, IStateEvents>("suggestedOrders");

    return !isEmpty(suggestedOrders)
        ? suggestedOrders[0]
        : null;
}