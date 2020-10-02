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
    display: block;
    max-width: 100px;
    margin: -2em auto 0;
    padding: .5em 1em;
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.font.color.secondary};
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    border-radius: .5em;
    text-decoration: none;
    text-align: center;
    transition: box-shadow .125s linear, transform .125s ease-out;

    &:hover {
        box-shadow: 0px 0px 30px -10px hsla(0, 0%, 0%, .4);
    }

    &:active {
        transform: scale(.98);
    }

`;

const Archive = () => {
    const { archivedTasks } = useContext(ArchivedTasksContext);
    return (
        <>
            <Header />
            <Wrapper>
                <Heading>Archive</Heading>
                <StyledLink to={routes.home}>Home</StyledLink>
                <TasksWrapper tasks={archivedTasks} />
            </Wrapper>
        </>
    )
}

export default Archive;