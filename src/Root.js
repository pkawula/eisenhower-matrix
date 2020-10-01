import React, { useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from 'components/Header/Header';
import TasksWrapper from 'components/TasksWrapper/TasksWrapper';
import Modal from 'components/Modal/Modal';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import Form from 'components/Form/Form';
import TasksContextProvider from 'contexts/TasksContext';
import ArchivedTasksContextProvider from 'contexts/ArchivedTasksContext';
import { ReactComponent as ArchiveIcon } from 'icons/archive.svg';
import { ArchivedTasks } from 'actions';

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 1em;
  right: calc(((100vw - 1200px)/2) + 1em);
  opacity: .7;
  transition: opacity .125s linear;

  &:hover {
    opacity: 1;
  }

  ${({ gray }) => gray && css`
    bottom: 5em;
    right: calc(((100vw - 1200px)/2) + 1em);

    background-color: ${({ theme }) => theme.colors.gray};
  `}
`;

const StyledArchiveIcon = styled(ArchiveIcon)`
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: ${({ theme }) => theme.bg.primary};
`;

const Root = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened(!isModalOpened);

  const hasArchivedTasks = ArchivedTasks.get() ? true : false;

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <GlobalStyle />
        <TasksContextProvider>
          <ArchivedTasksContextProvider>
            <>
              {isModalOpened &&
                <Helmet>
                  <body className="modalOpened" />
                </Helmet>}
              <Header toggleModal={toggleModal} />
              <TasksWrapper />
              <StyledButtonIcon onClick={toggleModal} />
              {hasArchivedTasks && <StyledButtonIcon gray data-title="View archived tasks" title="View archived tasks"><StyledArchiveIcon /></StyledButtonIcon>}
              {isModalOpened && <Modal title="Add new task" setIsModalOpened={setIsModalOpened} toggleModal={toggleModal}>
                <Form toggleModal={toggleModal} /></Modal>}
            </>
          </ArchivedTasksContextProvider>
        </TasksContextProvider>
      </HelmetProvider>
    </ThemeProvider>

  )
}

export default Root;
