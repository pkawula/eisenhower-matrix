import React, { useReducer, useContext } from 'react';
import Button from 'components/Button/Button';
import styled from 'styled-components';
import Input from './Input';
import Priority from './Priority';
import { TasksContext } from 'contexts/TasksContext';
import { ADD_TASK } from 'reducers/Tasks';

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

const Form = ({ toggleModal }) => {

    const { dispatch } = useContext(TasksContext);

    const [values, setValues] = useReducer((state, newState) => ({ ...state, ...newState }), {
        title: '',
        description: ''
    });

    const [prioritiesChecked, setPrioritiesChecked] = useReducer((state, newState) => ({ ...state, ...newState }), {
        importance: null,
        urgency: null,
    });

    const [errors, setErrors] = useReducer((state, newState) => ({ ...state, ...newState }), {
        title: '',
        description: '',
        importance: '',
        urgency: ''
    })

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

    const checkFields = () => {
        const { title, description } = values;
        const { importance, urgency } = prioritiesChecked;

        if (title === '') setErrors({ title: 'Please give your task a title' });
        if (description === '') setErrors({ description: 'Please add description' });
        if (importance === null) setErrors({ importance: 'Please choose how important it is' });
        if (urgency === null) setErrors({ urgency: 'Please choose how urgent it is' });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { title, description } = values;
        const { importance, urgency } = prioritiesChecked;

        checkFields();

        console.log(errors)


        return dispatch({
            type: ADD_TASK,
            payload: {
                title,
                description,
                importance,
                urgency
            }
        });

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
                <StyledButton onClick={toggleModal} cancel>Cancel</StyledButton>
            </ButtonsContainer>
        </FormWrapper>
    );
};

export default Form;