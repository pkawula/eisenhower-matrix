import React, { useReducer } from 'react';
import Button from 'components/Button/Button';
import styled from 'styled-components';
import Input from './Input';
import Priority from './Priority';

const FormWrapper = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 2em;
`;

const FormSection = styled.section`
    display: block;
    width: 46%;
    margin: 0;
`;

const SectionHeading = styled.h3`
    text-align: center;
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.font.color.primary};
    margin: 0 0 1em;
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: 3em;
    flex-basis: 100%;
    justify-content: flex-end;
    align-items: center;
`;

const StyledButton = styled(Button)`
    &:first-child {
        margin-right: .5em;
    }
    &:last-child {
        margin-left: .5em;
    }
`;

const Form = () => {

    const [values, setValues] = useReducer((state, newState) => ({ ...state, ...newState }), {
        title: '',
        description: ''
    });

    const [prioritiesChecked, setPrioritiesChecked] = useReducer((state, newState) => ({ ...state, ...newState }), {
        importance: null,
        urgency: null,
    });

    const handleUserInput = e => {
        const { value } = e.target;
        const { name: type } = e.target;

        setValues({ [type]: value });
    }

    const handleUserPick = e => {
        const { id: type } = e.target;

        switch (type) {
            case 'important':
                setPrioritiesChecked({ importance: true });
                break;

            case 'less_important':
                setPrioritiesChecked({ importance: false });
                break;

            case 'urgent':
                setPrioritiesChecked({ urgency: true });
                break;

            case 'less_urgent':
                setPrioritiesChecked({ urgency: false });
                break;

            default:
                break;

        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        console.log(prioritiesChecked);
    }

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <FormSection>
                <SectionHeading>Describe your task</SectionHeading>
                <Input name="title" value={values.title} onChange={handleUserInput} />
                <Input name="description" value={values.description} onChange={handleUserInput} textarea />
            </FormSection>
            <FormSection>
                <SectionHeading>Choose priority</SectionHeading>
                <Priority onChange={handleUserPick} importance />
                <Priority onChange={handleUserPick} urgency />
            </FormSection>
            <ButtonsContainer>
                <StyledButton type="submit" primary>Save</StyledButton>
                <StyledButton cancel>Cancel</StyledButton>
            </ButtonsContainer>
        </FormWrapper>
    );
};

export default Form;