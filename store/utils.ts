import useStoreon from 'storeon/react';
import { IState, IStateEvents } from '.';

export const useDispatch = () => useStoreon<IState, IStateEvents>().dispatch;