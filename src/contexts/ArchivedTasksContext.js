import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ArchivedTasks } from 'reducers/ArchivedTasks';

export const ArchivedTasksContext = createContext();

const ArchivedTasksContextProvider = ({ children }) => {
    const [archivedTasks, dispatch] = useReducer(ArchivedTasks, [], () => {
        const localData = window.localStorage.getItem('archivedTasks');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        window.localStorage.setItem('archivedTasks', JSON.stringify(archivedTasks));
    }, [archivedTasks]);

    return (
        <ArchivedTasksContext.Provider value={{ archivedTasks, dispatch }}>
            {children}
        </ArchivedTasksContext.Provider>
    );
};

ArchivedTasksContextProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default ArchivedTasksContextProvider;