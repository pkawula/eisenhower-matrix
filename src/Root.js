import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import Header from 'components/Header/Header';
import TasksWrapper from 'components/TasksWrapper/TasksWrapper';
import Modal from 'components/Modal/Modal';

const Root = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened(!isModalOpened);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header toggleModal={toggleModal} />
      <TasksWrapper />
      {isModalOpened && <Modal title="Add new task" setIsModalOpened={setIsModalOpened} toggleModal={toggleModal}>sdhadjas bdkasd</Modal>}
    </ThemeProvider>

  )
}

export default Root;
