import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';

const Wrapper = styled.div`
    display: block;
    width: calc(100% - 2em);
    max-width: 700px;
    min-height: 480px;
    max-height: calc(100% - 2em);
    background-color: ${({ theme }) => theme.bg.primary};
    padding: 2em;
    border-radius: .5em;
    overflow-y: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0px 0px 0px 2000px hsla(0, 0%, 0%, .4);
    z-index: 999;
    pointer-events: all;

    animation: fadeInJump .5s ease-in-out 1;

    @keyframes fadeInJump {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

const Heading = styled.h2`
    display: block;
    font-size: ${({ theme }) => theme.font.size.m};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.font.color.primary};
    margin: 0;
`;

const StyledButtonIcon = styled(ButtonIcon)`
    right: 2em;
    top: 2em;
`;

const Modal = ({ title, children, setIsModalOpened, toggleModal }) => {
    const modalRef = useRef(null);


    useEffect(() => {
        const listener = e => {
            if (!modalRef.current || modalRef.current.contains(e.target)) return;
            setIsModalOpened(false);
        }

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchdown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchdown', listener);
        }
    }, [setIsModalOpened]);

    return (
        <Wrapper ref={modalRef}>
            <Heading>{title}</Heading>
            {children}
            <StyledButtonIcon onClick={toggleModal} close />
        </Wrapper>
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    setIsModalOpened: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
}

export default Modal;