import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { TasksContext } from 'contexts/TasksContext';
import { REMOVE_TASK, UPDATE_TASK } from 'reducers/Tasks';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Form from 'components/Form/Form';

const Wrapper = styled.main`
    display: block;
    width: 100%;
    max-width: 1200px;
    margin: 3em auto 2em;
`;

const Message = styled.h2`
    font-size: ${({ theme }) => theme.font.size.l};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.colors.gray};
    text-align: center;
    opacity: .7;
`;

const Heading = styled.h2`
    font-size: ${({ theme }) => theme.font.size.l};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.font.color.primary};
    text-align: center;
    margin: 0 auto 2em;
`;

const TasksGroupWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    @media screen and (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
        flex-wrap: wrap;
        position: relative;

        &::after, &::before {
            content: '';
            width: 200px;
            height: 4px;
            background-color: ${({ theme }) => theme.colors.gray};
            border-radius: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: .7;
        }

        &::after {
            transform: translate(-50%, -50%) rotate(90deg);
        }
    }
`;

const TasksGroup = styled.section`
    display: block;
    width: 100%;
    padding: 1em;
    border-radius: .5em;
    margin: .5em auto;

    ${({ green }) => green && css`
        background-color: ${({ theme }) => theme.colors.green};
    `};

    ${({ blue }) => blue && css`
        background-color: ${({ theme }) => theme.colors.blue};
    `};

    ${({ orange }) => orange && css`
        background-color: ${({ theme }) => theme.colors.orange};
    `};

    ${({ red }) => red && css`
        background-color: ${({ theme }) => theme.colors.red};
    `};

    @media screen and (min-width: 1024px) {
        flex-basis: 47%;
        min-height: 300px;
        margin: 1em auto;
    }
`;

const TasksGroupTitle = styled.h3`
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    color: ${({ theme }) => theme.font.color.secondary};
    margin: 0 0 .5em;
    text-align: center;
    line-height: 1.5em;
    padding-bottom: .5em;
    border-bottom: 2px solid ${({ theme }) => theme.font.color.secondary};
`;

const StyledButton = styled(Button)`
    background-color: ${({ theme }) => theme.bg.primary};
    color: ${({ theme }) => theme.font.color.primary};
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    border-radius: 1em;
    padding: .5em 1em;
    margin: .5em;
    line-height: 1;
    
    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }

    ${({ done }) => done && css`
        text-decoration: line-through;
        opacity: .5;
    `}
`;

const DetailsSection = styled.section`
    display: block;
    width: 100%;
    margin: 1em auto;

    &:first-of-type {
        margin-top: 2em;
    }
`;

const DetailsSectionPriority = styled.span`
    display: inline-block;
    margin: 0 .25em;
    padding: .25em .5em;
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    color: ${({ theme }) => theme.font.color.secondary};
    text-align: center;
    border-radius: .5em;

    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }

    ${({ green }) => green && css`
        background-color: ${({ theme }) => theme.colors.green};
    `};

    ${({ orange }) => orange && css`
        background-color: ${({ theme }) => theme.colors.orange};
    `};
`;

const DetailsSectionTitle = styled.h3`
    color: ${({ theme }) => theme.font.color.primary};
    font-size: ${({ theme }) => theme.font.size.s};
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    text-align: left;
    margin: 0 0 .5em;
`;

const DetailsSectionDescription = styled.p`
    color: ${({ theme }) => theme.font.color.primary};
    font-size: ${({ theme }) => theme.font.size.xs};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    margin: 0;
    text-align: justify;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 2em;
`;

const StyledActionButton = styled(Button)`
    margin: 0 .5em;

    ${({ secondary }) => secondary && css`
        background-color: ${({ theme }) => theme.colors.blue};
    `}

    &:first-of-type {
        margin-left: 0;
    }

    &:last-of-type {
        margin-right: 0;
    }
`;

const TasksWrapper = () => {
    const { tasks, dispatch } = useContext(TasksContext);

    const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false);
    const [isEditModalOpened, setIsEditModalOpened] = useState(false);
    const [chosenTask, setChosenTask] = useState({});

    const togglePreviewModal = () => setIsPreviewModalOpened(!isPreviewModalOpened);
    const toggleEditModal = () => setIsEditModalOpened(!isEditModalOpened);

    const chooseTask = task => {
        togglePreviewModal();
        setChosenTask(task);
    }

    const deleteTask = id => {
        dispatch({
            type: REMOVE_TASK,
            id
        });

        togglePreviewModal();
    }

    const markAsDone = ({ ID, title, description, importance, urgency, done }) => {
        dispatch({
            type: UPDATE_TASK,
            payload: {
                ID,
                title: title,
                description: description,
                importance: importance,
                urgency: urgency,
                done: !done
            }
        });

        togglePreviewModal();
    }

    const editTask = () => {
        togglePreviewModal();
        toggleEditModal();
    }

    return (
        <Wrapper>
            {!tasks.length > 0 ?
                <Message>nothing todo, yet..</Message>
                :
                <>
                    <Heading>Your tasks</Heading>
                    <TasksGroupWrapper>
                        <TasksGroup green>
                            <TasksGroupTitle>Do first</TasksGroupTitle>
                            {tasks.filter(({ importance, urgency }) => importance && urgency).map(task =>
                                <StyledButton done={task.done ? true : false} key={task.ID} onClick={() => chooseTask(task)}>{task.title}</StyledButton>
                            )}
                        </TasksGroup>
                        <TasksGroup blue>
                            <TasksGroupTitle>Schedule</TasksGroupTitle>
                            {tasks.filter(({ importance, urgency }) => importance && !urgency).map(task =>
                                <StyledButton done={task.done ? true : false} key={task.ID} onClick={() => chooseTask(task)}>{task.title}</StyledButton>
                            )}
                        </TasksGroup>
                        <TasksGroup orange>
                            <TasksGroupTitle>Delegate</TasksGroupTitle>
                            {tasks.filter(({ importance, urgency }) => !importance && urgency).map(task =>
                                <StyledButton done={task.done ? true : false} key={task.ID} onClick={() => chooseTask(task)}>{task.title}</StyledButton>
                            )}
                        </TasksGroup>
                        <TasksGroup red>
                            <TasksGroupTitle>Don't do</TasksGroupTitle>
                            {tasks.filter(({ importance, urgency }) => !importance && !urgency).map(task =>
                                <StyledButton done={task.done ? true : false} key={task.ID} onClick={() => chooseTask(task)}>{task.title}</StyledButton>
                            )}
                        </TasksGroup>
                    </TasksGroupWrapper>
                    {isPreviewModalOpened &&
                        <Modal title='Task details' setIsModalOpened={setIsPreviewModalOpened} toggleModal={togglePreviewModal}>
                            <DetailsSection>
                                <DetailsSectionTitle>
                                    Priority
                                </DetailsSectionTitle>
                                <DetailsSectionPriority green>{chosenTask.importance ? 'important' : 'less important'}</DetailsSectionPriority>
                                <DetailsSectionPriority orange>{chosenTask.urgency ? 'urgent' : 'less urgent'}</DetailsSectionPriority>
                            </DetailsSection>
                            <DetailsSection>
                                <DetailsSectionTitle>
                                    {chosenTask.title}
                                </DetailsSectionTitle>
                                <DetailsSectionDescription>
                                    {chosenTask.description}
                                </DetailsSectionDescription>
                            </DetailsSection>
                            <ButtonsWrapper>
                                <StyledActionButton onClick={() => markAsDone(chosenTask)}>{chosenTask.done ? 'Undone task' : 'Mark as done'}</StyledActionButton>
                                <StyledActionButton onClick={() => editTask()} secondary>Edit</StyledActionButton>
                                <StyledActionButton onClick={() => deleteTask(chosenTask.ID)} cancel>Delete</StyledActionButton>
                            </ButtonsWrapper>
                        </Modal>
                    }
                    {isEditModalOpened &&
                        <Modal title="Edit task" setIsModalOpened={setIsEditModalOpened} toggleModal={toggleEditModal}>
                            <Form toggleModal={toggleEditModal} editData={chosenTask} />
                        </Modal>
                    }
                </>
            }
        </Wrapper>
    )
}

export default TasksWrapper;