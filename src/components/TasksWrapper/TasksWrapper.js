import React from 'react';
import styled from 'styled-components';

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

const TasksWrapper = () => (
    <Wrapper>
        <Message>nothing todo, yet..</Message>
    </Wrapper>
);

export default TasksWrapper;