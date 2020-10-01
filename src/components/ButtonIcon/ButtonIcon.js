import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Button = styled.button`
    display: block;
    border: none;
    border-radius: 50%;
    width: 3em;
    height: 3em;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.green};
    transition: transform .125s ease-out;
    transform-origin: center center;
    outline-offset: .25em;
    outline-color: ${({ theme }) => theme.colors.green};
    box-shadow: ${({ theme }) => theme.boxShadow};

    &:active {
        transform: scale(.99);
    }

    ${({ children }) => !children && css`

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
    
    `};
`;

const ButtonIcon = ({ close, children, ...props }) => <Button {...props} close={close} children={children ? true : false}>{children}</Button>;

ButtonIcon.propTypes = {
    close: PropTypes.bool,
    children: PropTypes.oneOf([PropTypes.node, PropTypes.element]),
};

ButtonIcon.defaultProps = {
    close: false,
    children: null,
};

export default ButtonIcon;