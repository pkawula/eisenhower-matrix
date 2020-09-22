import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button/Button';

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-width: 1200px;
    margin: 2em auto;
`;

const Heading = styled.h1`
    display: block;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.primary};
    margin: 0;
`;

const Paragraph = styled.p`
    display: block;
    margin: 2em auto;
    width: 100%;
    max-width: 700px;
    text-align: justify;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.primary};
`;

const Header = () => (
    <HeaderContainer>
        <Heading>Eisenhower Matrix</Heading>
        <Paragraph>
            The Eisenhower Matrix, also referred to as Urgent-Important Matrix, helps you decide on and prioritize tasks by urgency and importance, sorting out less urgent and important tasks which you should either delegate or not do at all.
        </Paragraph>
        <Button primary>Let's add first task</Button>
    </HeaderContainer>
);

export default Header;