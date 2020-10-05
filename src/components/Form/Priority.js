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
    width: 100%;
    cursor: pointer;
    padding: .25em .5em;
    border-radius: .5em;
    border: 2px solid;
    box-shadow: ${({ theme }) => theme.boxShadow};
    color: ${({ theme }) => theme.font.color.secondary};
    position: relative;

    ${({ green }) => green && css`
        background-color: ${({ theme }) => theme.colors.green};
        border-color: ${({ theme }) => theme.colors.green};
    `};

    ${({ orange }) => orange && css`
        background-color: ${({ theme }) => theme.colors.orange};
        border-color: ${({ theme }) => theme.colors.orange};
    `};

    &:first-child {
            margin-right: .5em;
    }

    &:last-child {
            margin-left: .5em;
    }

    &:focus-within {
        box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.colors.blue};
    }
`;

const InputRadio = styled.input`
    width: 100%;
    height: 0px;
    opacity: 1;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    outline: none;
`;

const Priority = ({ isErrored, importance, urgency, onChange }) => {

    return (
        <>
            {importance &&
                <PrioritySection>
                    <Heading isErrored={isErrored}>Importance</Heading>
                    <Label green>
                        important
                        <InputRadio data-testid="important" onChange={onChange} name="importance" id="important" type="radio" />
                    </Label>
                    <Label orange>
                        less important
                        <InputRadio data-testid="less_important" onChange={onChange} name="importance" id="less_important" type="radio" />
                    </Label>
                </PrioritySection>
            }
            {urgency &&
                <PrioritySection>
                    <Heading isErrored={isErrored}>Urgency</Heading>
                    <Label green>
                        urgent
                        <InputRadio data-testid="urgent" onChange={onChange} name="urgency" id="urgent" type="radio" />
                    </Label>
                    <Label orange>
                        less urgent
                        <InputRadio data-testid="less_urgent" onChange={onChange} name="urgency" id="less_urgent" type="radio" />
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