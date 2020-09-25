import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tasks } from 'reducers/Tasks';

export const TasksContext = createContext();

const TasksContextProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(Tasks, [], () => {
        const localData = window.localStorage.getItem('tasks');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TasksContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};

TasksContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TasksContextProvider;