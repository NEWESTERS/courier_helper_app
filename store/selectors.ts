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