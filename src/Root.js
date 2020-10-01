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

const Root = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <GlobalStyle />
        <TasksContextProvider>
          <ArchivedTasksContextProvider>
            <Switch>
              <Route path={routes.archive} component={Archive} />
              <Route exac path={routes.home} component={Main} />
            </Switch>
          </ArchivedTasksContextProvider>
        </TasksContextProvider>
      </HelmetProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default Root;
