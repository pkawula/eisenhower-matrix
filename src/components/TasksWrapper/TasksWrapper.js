import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { TasksContext } from 'contexts/TasksContext';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

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
    margin: 0 0 1em;
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
    const { tasks } = useContext(TasksContext);

    const [isModalOpened, setIsModalOpened] = useState(false);

    const toggleModal = () => setIsModalOpened(!isModalOpened);

    const { title, description } = { title: "your title", description: 'sdnasjdbjasfsaskd jksadb kjasjhd ksajf ks fiag f aif sf a f asf  fas' };

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
                            {tasks.filter(({ importance, urgency }) => importance && urgency).map(({ title }) =>
                                <StyledButton onClick={toggleModal}>{title}</StyledButton>
                            )}
                        </TasksGroup>
                        <TasksGroup blue>
                            <TasksGroupTitle>Schedule</TasksGroupTitle>
                            {tasks.filter(({ importance, urgency }) => importance && !urgency).map(({ title }) =>
                                <StyledButton>{title}</StyledButton>
                            )}
                        </TasksGroup>
                        <TasksGroup orange>
                            <TasksGroupTitle>Delegate</TasksGroupTitle>
                            {tasks.filter(({ importance, urgency }) => !importance && urgency).map(({ title }) =>
                                <StyledButton>{title}</StyledButton>
                            )}
                        </TasksGroup>
                        <TasksGroup red>
                            <TasksGroupTitle>Don't do</TasksGroupTitle>
                            {tasks.filter(({ importance, urgency }) => !importance && !urgency).map(({ title }) =>
                                <StyledButton>{title}</StyledButton>
                            )}
                        </TasksGroup>
                    </TasksGroupWrapper>
                    {isModalOpened &&
                        <Modal title='Task details' setIsModalOpened={setIsModalOpened} toggleModal={toggleModal}>
                            <DetailsSection>
                                <DetailsSectionTitle>
                                    Priority
                                </DetailsSectionTitle>
                                <DetailsSectionPriority green>Important</DetailsSectionPriority>
                                <DetailsSectionPriority orange>Urgent</DetailsSectionPriority>
                            </DetailsSection>
                            <DetailsSection>
                                <DetailsSectionTitle>
                                    {title}
                                </DetailsSectionTitle>
                                <DetailsSectionDescription>
                                    {description}
                                </DetailsSectionDescription>
                            </DetailsSection>
                            <ButtonsWrapper>
                                <StyledActionButton>Mark as done</StyledActionButton>
                                <StyledActionButton secondary>Edit</StyledActionButton>
                                <StyledActionButton onClick={toggleModal} cancel>Delete</StyledActionButton>
                            </ButtonsWrapper>
                        </Modal>
                    }
                </>
            }
        </Wrapper>
    )
}

export default TasksWrapper;