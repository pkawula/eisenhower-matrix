import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { routes } from 'routes';
import Header from 'components/Header/Header';
import TasksWrapper from 'components/TasksWrapper/TasksWrapper';
import Modal from 'components/Modal/Modal';
import Form from 'components/Form/Form';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { ReactComponent as ArchiveIcon } from 'icons/archive.svg';
import { Link } from 'react-router-dom';
import { TasksContext } from 'contexts/TasksContext';
import Heading from 'components/Heading/Heading';
import { ArchivedTasksContext } from 'contexts/ArchivedTasksContext';

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 1em;
  right: calc(((100vw - 100%)/2) + 1em);
  opacity: .7;
  transition: opacity .125s linear;

  @media screen and (min-width: 1200px) {
  right: calc(((100vw - 1200px)/2) + 1em);
  }

  &:hover {
    opacity: 1;
  }

  ${({ gray }) => gray && css`
    bottom: 5em;

    background-color: ${({ theme }) => theme.colors.gray};
  `}
`;

const StyledArchiveIcon = styled(ArchiveIcon)`
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  fill: ${({ theme }) => theme.bg.primary};
`;

const Main = () => {
  const { tasks } = useContext(TasksContext);
  const { archivedTasks } = useContext(ArchivedTasksContext);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened(!isModalOpened);


  return (
    <>
      {isModalOpened &&
        <Helmet>
          <body className="modalOpened" />
        </Helmet>}
      <Header toggleModal={toggleModal} />
      <Heading>Your tasks</Heading>
      <TasksWrapper tasks={tasks} />
      <StyledButtonIcon data-testid="add_button" onClick={toggleModal} />
      {archivedTasks.length > 0 && <Link to={routes.archive}><StyledButtonIcon gray data-title="View archived tasks" title="View archived tasks"><StyledArchiveIcon /></StyledButtonIcon></Link>}
      {isModalOpened && <Modal title="Add new task" setIsModalOpened={setIsModalOpened} toggleModal={toggleModal}>
        <Form toggleModal={toggleModal} /></Modal>}
    </>
  );
}

export default Main;