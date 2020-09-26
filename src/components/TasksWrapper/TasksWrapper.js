import React, { useContext } from 'react';
import styled from 'styled-components';
import { TasksContext } from 'contexts/TasksContext';

const Wrapper = styled.main`
    display: block;
    width: 100%;
    max-width: 1200px;
    margin: 3em auto 2em;
`;

const Message = styled.h2`
    font-size: ${({ theme }) => theme.font.size.l};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.gray};
    text-align: center;
    opacity: .7;
`;

const TasksWrapper = () => {
    const { tasks } = useContext(TasksContext);

    return (
        <Wrapper>
            {!tasks.length > 0 && <Message>nothing todo, yet..</Message>}
        There are some tasks
        </Wrapper>
    )
}

export default TasksWrapper;