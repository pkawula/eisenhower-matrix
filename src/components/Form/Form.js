import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TasksContext } from 'contexts/TasksContext';
import { ADD_TASK, UPDATE_TASK } from 'reducers/Tasks';
import Button from 'components/Button/Button';
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

const Error = styled.p`
    display: block;
    font-size: ${({ theme }) => theme.font.size.xxs};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.red};
    margin: .5em 0 0;
    text-align: left;
`;

const Form = ({ toggleModal, editData: { title, description, importance, urgency, done, ID } }) => {

    const { dispatch } = useContext(TasksContext);

    const [values, setValues] = useReducer((state, newState) => ({ ...state, ...newState }), {
        title,
        description
    });

    const [prioritiesChecked, setPrioritiesChecked] = useReducer((state, newState) => ({ ...state, ...newState }), {
        importance,
        urgency,
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

        setErrors({
            title: '',
            description: '',
            importance: '',
            urgency: ''
        });

        const errs = [];

        if (title === '') errs.push({ title: 'Title is required' });
        if (description === '') errs.push({ description: 'Description is required' });
        if (importance === null) errs.push({ importance: 'Choose the importance' });
        if (urgency === null) errs.push({ urgency: 'Choose the urgency' });

        if (errs.length > 0) {

            errs.forEach(err => setErrors(err))

            return false;
        }

        return true;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { title, description } = values;
        const { importance, urgency } = prioritiesChecked;

        if (checkFields() === false) return;

        toggleModal();

        if (ID) return dispatch({
            type: UPDATE_TASK,
            payload: {
                ID,
                title,
                description,
                importance,
                urgency,
                done
            }
        })

        return dispatch({
            type: ADD_TASK,
            payload: {
                title,
                description,
                importance,
                urgency,
                done: false,
            }
        });
    }

    return (
        <FormWrapper data-testid="form" onSubmit={handleSubmit}>
            <FormSection>
                <SectionHeading>Describe your task</SectionHeading>
                <Input placeholder="title" isErrored={errors.title ? true : false} name="title" value={values.title} onChange={handleUserInput} />
                {errors.title && <Error>{errors.title}</Error>}
                <Input placeholder="description" isErrored={errors.description ? true : false} name="description" value={values.description} onChange={handleUserInput} textarea />
                {errors.description && <Error>{errors.description}</Error>}
            </FormSection>
            <FormSection>
                <SectionHeading>Choose priority</SectionHeading>
                <Priority chosen={importance} isErrored={errors.importance ? true : false} onChange={handleUserPick} importance />
                {errors.importance && <Error>{errors.importance}</Error>}
                <Priority chosen={urgency} isErrored={errors.urgency ? true : false} onChange={handleUserPick} urgency />
                {errors.urgency && <Error>{errors.urgency}</Error>}
            </FormSection>
            <ButtonsContainer>
                <StyledButton type="submit" primary>Save</StyledButton>
                <StyledButton onClick={toggleModal} cancel>Cancel</StyledButton>
            </ButtonsContainer>
        </FormWrapper>
    );
};

Form.propTypes = {
    editData: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        importance: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        urgency: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        done: PropTypes.bool,
        ID: PropTypes.string,
    }),
    toggleModal: PropTypes.func.isRequired,
};

Form.defaultProps = {
    editData: {
        title: '',
        description: '',
        importance: null,
        urgency: null,
        done: false,
        ID: null,
    },
};

export default Form;