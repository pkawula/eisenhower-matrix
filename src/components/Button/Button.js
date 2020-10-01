import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
    display: inline-block;
    padding: .5em 1em;
    border-radius: .5em;
    border: none;
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.font.color.secondary};
    background-color: ${({ theme }) => theme.colors.green};
    box-shadow: ${({ theme }) => theme.boxShadow};
    transition: transform .125s ease-out;
    transform-origin: center center;
    outline-offset: .25em;
    outline-color: ${({ theme }) => theme.colors.green};
    text-decoration: none;

    &:active {
        transform: scale(.99);
    }

    ${({ cancel }) => cancel && css`
        background-color: ${({ theme }) => theme.colors.red};
        color: ${({ theme }) => theme.font.color.secondary};
    `}
`;

const Button = ({ cancel, children, ...props }) => <StyledButton {...props} cancel={cancel} >{children}</StyledButton>;

Button.propTypes = {
    children: PropTypes.node.isRequired,
    cancel: PropTypes.bool,
};

Button.defaultProps = {
    cancel: false
}

export default Button;