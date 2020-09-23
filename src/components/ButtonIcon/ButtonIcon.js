import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Button = styled.button`
    display: block;
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: transform .125s ease-out;
    transform-origin: center center;
    outline-offset: .25em;
    outline-color: ${({ theme }) => theme.colors.green};

    &:active {
        transform: scale(.99);
    }

    &::before, &::after {
        content: '';
        width: 1.5em;
        height: 4px;
        border-radius: .25em;
        background-color: ${({ theme }) => theme.bg.primary};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &::after {
        transform: translate(-50%, -50%) rotate(90deg) ;
    }

    ${({ close }) => close && css`
        position: absolute;
        background-color: ${({ theme }) => theme.bg.secondary};
        width: 2em;
        height: 2em;
        transform: rotate(45deg);

        &:active {
            transform: scale(.99) rotate(45deg);
        }

        &::before, &::after {
            width: 1em;
        }

    `}
`;

const ButtonIcon = ({ close, children, ...props }) => <Button {...props} close={close} />;

ButtonIcon.propTypes = {
    close: PropTypes.bool,
};

ButtonIcon.defaultProps = {
    close: false,
};

export default ButtonIcon;