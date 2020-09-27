import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const PrioritySection = styled.section`
    display: block;
    width: 100%;
`;

const Heading = styled.h4`
    font-size: ${({ theme }) => theme.font.size.xxs};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme, isErrored }) => isErrored ? theme.colors.red : theme.colors.gray};
`;

const Label = styled.label`
    cursor: pointer;
    width: 100%;
    position: relative;
    overflow: hidden;

    &:first-child {
        span {
            margin-right: .5em;
        }
    }

    &:last-child {
        span {
            margin-left: .5em;
        }
    }
`;

const RadioButton = styled.span`
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
    width: 100%;
    height: 200%;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    cursor: pointer;

    &:focus {
        ~ span { 
            outline: 2px solid ${({ theme }) => theme.colors.green};
            outline-offset: 2px;
        }
    }

    &:checked {
        ~ span {
            border-color: ${({ theme }) => theme.colors.blue};
        }
    }

    &:checked:focus {
        ~ span {
            outline: none;
        }
    }
`;

const Priority = ({ isErrored, importance, urgency, onChange }) => {

    return (
        <>
            {importance &&
                <PrioritySection>
                    <Heading isErrored={isErrored}>Importance</Heading>
                    <Label>
                        <InputRadio onChange={onChange} name="importance" id="important" type="radio" />
                        <RadioButton green>important</RadioButton>
                    </Label>
                    <Label>
                        <InputRadio onChange={onChange} name="importance" id="less_important" type="radio" />
                        <RadioButton orange>less important</RadioButton>
                    </Label>
                </PrioritySection>
            }
            {urgency &&
                <PrioritySection>
                    <Heading isErrored={isErrored}>Urgency</Heading>
                    <Label>
                        <InputRadio onChange={onChange} name="urgency" id="urgent" type="radio" />
                        <RadioButton green>urgent</RadioButton>
                    </Label>
                    <Label>
                        <InputRadio onChange={onChange} name="urgency" id="less_urgent" type="radio" />
                        <RadioButton orange>less urgent</RadioButton>
                    </Label>
                </PrioritySection>
            }
        </>
    )
};

Priority.propTypes = {
    importance: PropTypes.bool,
    urgency: PropTypes.bool,
    isErrored: PropTypes.bool.isRequired,
};

PropTypes.defaultProps = {
    importance: false,
    urgency: false,
}

export default Priority;