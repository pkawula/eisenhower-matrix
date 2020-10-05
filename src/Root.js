import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TasksContextProvider from 'contexts/TasksContext';
import ArchivedTasksContextProvider from 'contexts/ArchivedTasksContext';
import { routes } from 'routes';
import Main from 'views/Main';
import Archive from 'views/Archive';

const Wrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

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
    <Wrapper data-testid="root">
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
              <StyledButtonIcon data-testid="add_button" onClick={toggleModal} />
              {isModalOpened && <Modal title="Add new task" setIsModalOpened={setIsModalOpened} toggleModal={toggleModal}>
                <Form toggleModal={toggleModal} /></Modal>}
            </>
          </TasksContextProvider>
        </HelmetProvider>
      </ThemeProvider>
    </Wrapper>
  )
}

export default Root;
