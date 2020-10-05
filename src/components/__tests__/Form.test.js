import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import Form from '../Form/Form';
import TasksContextProvider from 'contexts/TasksContext';

afterEach(cleanup);

const renderForm = () => {
    const utils = render(
        <ThemeProvider theme={theme}>
            <TasksContextProvider>
                <Form toggleModal={() => console.log('hello')} />
            </TasksContextProvider>
        </ThemeProvider>
    )
    const form = utils.getByTestId("form");

    return { ...utils, form };
};

it('Form testing', () => {
    const { form, getByLabelText } = renderForm();

    // check if form is rendered
    expect(form).toBeInTheDocument();

    // check if inputs are rendered
    expect(form).toBeInTheDocument();
});