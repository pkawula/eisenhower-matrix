import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
`;

const Placeholder = styled.span`
    display: block;
    font-size: ${({ theme }) => theme.font.size.xxs};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme, isErrored }) => isErrored ? theme.colors.red : theme.colors.gray};
`;

const InputField = styled.input`
    display: block;
    width: 100%;
    border: none;
    border-bottom: 2px solid ${({ theme, isErrored }) => isErrored ? theme.colors.red : theme.colors.gray};
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.normal};
    color: ${({ theme }) => theme.font.color.primary};
    padding: .25em 0;
    outline: none;

    &:focus, &:not([value=""]) {
        border-bottom-color: ${({ theme }) => theme.colors.blue};

        ~ span {
            color: ${({ theme }) => theme.colors.blue};
        }
    }
`;

const Textarea = styled.textarea`
    display: block;
    width: 100%;
    border: none;
    border-bottom: 2px solid ${({ theme, isErrored }) => isErrored ? theme.colors.red : theme.colors.gray};
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.normal};
    color: ${({ theme }) => theme.font.color.primary};
    padding: .25em 0;
    outline: none; 
    resize: vertical;
    min-height: 100px;
    max-height: 300px;

    ~ span {
        margin-top: 1em;
    }

    &:focus, &:not(:empty) {
        border-bottom-color: ${({ theme }) => theme.colors.blue};

        ~ span {
            color: ${({ theme }) => theme.colors.blue};
        }
    }
`;

const StyledCounter = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    font-size: ${({ theme }) => theme.font.size.xxs};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.gray};
`;

const Input = ({ isErrored, textarea, value, name, onChange, placeholder, inputSignCount }) => {

    return (
        <>
            {textarea ?
                <Label>
                    <Textarea placeholder={placeholder} isErrored={isErrored} id={name} value={value} onChange={onChange} name={name} />
                    <Placeholder isErrored={isErrored}>{placeholder}</Placeholder>
                </Label>
                :
                <Label>
                    <InputField placeholder={placeholder} isErrored={isErrored} value={value} onChange={onChange} type="text" name={name} id={name} />
                    <Placeholder isErrored={isErrored}>{placeholder}</Placeholder>
                    <StyledCounter>{inputSignCount}/30</StyledCounter>
                </Label>
            }
        </>
    )
};

Input.propTypes = {
    textarea: PropTypes.bool,
    isErrored: PropTypes.bool,
    inputSignCount: PropTypes.number,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
};

Input.defaultProps = {
    textarea: false,
    isErrored: false,
    inputSignCount: 0,
}

export default Input;