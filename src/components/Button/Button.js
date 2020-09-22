import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
    display: inline-block;
    padding: .5em 1em;
    border-radius: .5em;
    border: none;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme, primary }) => primary ? theme.color.secondary : theme.color.primary};
    background-color: ${({ theme, primary }) => primary ? theme.bg.secondary : theme.bg.primary};
    box-shadow: ${({ theme }) => theme.boxShadow};
    transition: transform .125s ease-out;
    transform-origin: center center;

    &:active {
        transform: scale(.99);
    }
`;

const Button = ({ primary, children }) => <StyledButton primary={primary} >{children}</StyledButton>;

Button.propTypes = {
    primary: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    primary: false
}

export default Button;