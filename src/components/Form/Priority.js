import React from 'react';
import styled, { css } from 'styled-components';

const PrioritySection = styled.section`
    display: block;
    width: 100%;
`;

const Heading = styled.h4`
    font-size: ${({ theme }) => theme.font.size.xxs};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.gray};
`;

const Label = styled.label`
    cursor: pointer;
    width: 100%;

    &:first-child {
        button {
            margin-right: .5em;
        }
    }

    &:last-child {
        button {
            margin-left: .5em;
        }
    }
`;

const RadioButton = styled.button`
    display: inline-block;
    margin: 0;
    padding: .25em .5em;
    border-radius: .5em;
    text-align: center;
    border: 2px solid;
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.normal};
    color: ${({ theme }) => theme.font.color.secondary};
    box-shadow: ${({ theme }) => theme.boxShadow};
    transition: transform .125s ease-out;
    transform-origin: center center;
    outline-offset: .25em;
    outline-color: ${({ theme }) => theme.colors.green};
    pointer-events: none;

    ${({ green }) => green && css`
        background-color: ${({ theme }) => theme.colors.green};
        border-color: ${({ theme }) => theme.colors.green};
    `};

    ${({ orange }) => orange && css`
        background-color: ${({ theme }) => theme.colors.orange};
        border-color: ${({ theme }) => theme.colors.orange};
    `};
`;

const InputRadio = styled.input`
    width: 0px;
    height: 0px;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    position: absolute;

    &:checked {
        ~ button {
            border-color: ${({ theme }) => theme.colors.blue};
        }
    }
`;

const Priority = ({ importance, urgency, onChange }) => {
    const handleClick = e => e.preventDefault();

    return (
        <>
            {importance &&
                <PrioritySection>
                    <Heading>Importance</Heading>
                    <Label green>
                        <InputRadio onChange={onChange} name="importance" id="important" type="radio" />
                        <RadioButton onClick={handleClick} green>important</RadioButton>
                    </Label>
                    <Label>
                        <InputRadio onChange={onChange} name="importance" id="less_important" type="radio" />
                        <RadioButton onClick={handleClick} orange>less important</RadioButton>
                    </Label>
                </PrioritySection>
            }
            {urgency &&
                <PrioritySection>
                    <Heading>Urgency</Heading>
                    <Label green>
                        <InputRadio onChange={onChange} name="urgency" id="urgent" type="radio" />
                        <RadioButton onClick={handleClick} green>urgent</RadioButton>
                    </Label>
                    <Label>
                        <InputRadio onChange={onChange} name="urgency" id="less_urgent" type="radio" />
                        <RadioButton onClick={handleClick} orange>less urgent</RadioButton>
                    </Label>
                </PrioritySection>
            }
        </>
    )
};

export default Priority;