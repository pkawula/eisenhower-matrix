import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import { Helmet } from 'react-helmet';
import Header from 'components/Header/Header';
import TasksWrapper from 'components/TasksWrapper/TasksWrapper';
import Modal from 'components/Modal/Modal';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';

const StyledButtonIcon = styled(ButtonIcon)`
  position: absolute;
  bottom: 2em;
  right: 2em;
`;

const Root = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const toggleModal = () => setIsModalOpened(!isModalOpened);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isModalOpened &&
        <Helmet>
          <body className="modalOpened" />
        </Helmet>}
      <Header toggleModal={toggleModal} />
      <TasksWrapper />
      <StyledButtonIcon onClick={toggleModal} />
      {isModalOpened && <Modal title="Add new task" setIsModalOpened={setIsModalOpened} toggleModal={toggleModal}>sdhadjas bdkasd</Modal>}
    </ThemeProvider>

  )
}

export default Root;
