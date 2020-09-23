import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
    display: inline-block;
    padding: .5em 1em;
    border-radius: .5em;
    border: none;
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme, primary }) => primary ? theme.font.color.secondary : theme.font.color.primary};
    background-color: ${({ theme, primary }) => primary ? theme.colors.green : theme.bg.primary};
    box-shadow: ${({ theme }) => theme.boxShadow};
    transition: transform .125s ease-out;
    transform-origin: center center;
    outline-offset: .25em;
    outline-color: ${({ theme }) => theme.colors.green};

    &:active {
        transform: scale(.99);
    }
`;

const Button = ({ primary, children, ...props }) => <StyledButton {...props} primary={primary} >{children}</StyledButton>;

Button.propTypes = {
    primary: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    primary: false
}

export default Button;