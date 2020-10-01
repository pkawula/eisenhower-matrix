export const ARCHIVE_TASK = 'ARCHIVE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';


export const ArchivedTasks = (state, action) => {
    switch (action.type) {
        case ARCHIVE_TASK:
            return [
                ...state,
                {
                    ...action.payload,
                },
            ];
        case REMOVE_TASK:
            return state.filter(item => item.ID !== action.id);
        default:
            return state;
    }
};
