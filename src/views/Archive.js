import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import Header from 'components/Header/Header';
import Heading from 'components/Heading/Heading';
import TasksWrapper from 'components/TasksWrapper/TasksWrapper';
import { ArchivedTasksContext } from 'contexts/ArchivedTasksContext';

const Wrapper = styled.main`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

const StyledLink = styled(Link)`
    display: inline-block;
    padding: .5em;
    background-color: ${({ theme }) => theme.bg.primary};
    color: ${({ theme }) => theme.font.color.primary};
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    border-radius: .5em;
    text-decoration: underline;
    text-align: center;
`;

const Archive = () => {
    const { archivedTasks } = useContext(ArchivedTasksContext);

    return (
        <>
            <Header />
            <Wrapper>
                <StyledLink to={routes.home}>&lt; back to home</StyledLink>
                <Heading>Archive</Heading>
                <TasksWrapper tasks={archivedTasks} />
            </Wrapper>
        </>
    )
}

export default Archive;