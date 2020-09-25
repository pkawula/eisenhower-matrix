import { v4 as uuid } from 'uuid';

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';


export const Tasks = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    ...action.payload,
                    ID: uuid(),
                },
            ];
        case REMOVE_TASK:
            return state.filter(item => item.ID !== action.id);
        case UPDATE_TASK:
            return [...state.filter(item => item.ID !== action.payload.ID), action.payload];
        default:
            return state;
    }
};
