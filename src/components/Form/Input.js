import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Placeholder = styled.span`
    display: block;
    font-size: ${({ theme }) => theme.font.size.xxs};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.gray};
`;

const InputField = styled.input`
    display: block;
    width: 100%;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
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
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
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

const Input = ({ textarea, value, name, onChange }) => {

    return (
        <>
            {textarea ?
                <Label>
                    <Textarea id={name} value={value} onChange={onChange} name={name} />
                    <Placeholder>Description</Placeholder>
                </Label>
                :
                <Label>
                    <InputField value={value} onChange={onChange} type="text" name={name} id={name} />
                    <Placeholder>Title</Placeholder>
                </Label>
            }
        </>
    )
};

Input.propTypes = {
    textarea: PropTypes.bool,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
    textarea: false,
}

export default Input;