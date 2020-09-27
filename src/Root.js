import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from 'components/Header/Header';
import TasksWrapper from 'components/TasksWrapper/TasksWrapper';
import Modal from 'components/Modal/Modal';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import Form from 'components/Form/Form';
import TasksContextProvider from 'contexts/TasksContext';

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 1em;
  right: calc(((100vw - 1200px)/2) + 1em);
  opacity: .7;
  transition: opacity .125s linear;

  &:hover {
    opacity: 1;
  }
`;

const Root = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened(!isModalOpened);

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <GlobalStyle />
        <TasksContextProvider>
          <>
            {isModalOpened &&
              <Helmet>
                <body className="modalOpened" />
              </Helmet>}
            <Header toggleModal={toggleModal} />
            <TasksWrapper />
            <StyledButtonIcon onClick={toggleModal} />
            {isModalOpened && <Modal title="Add new task" setIsModalOpened={setIsModalOpened} toggleModal={toggleModal}>
              <Form toggleModal={toggleModal} /></Modal>}
          </>
        </TasksContextProvider>
      </HelmetProvider>
    </ThemeProvider>

  )
}

export default Root;
