import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import Form from '../Form/Form';
import TasksContextProvider from 'contexts/TasksContext';

afterEach(cleanup);

const mockedFunctions = {
    toggleModal: jest.fn(),
}

const renderForm = () => {
    const utils = render(
        <ThemeProvider theme={theme}>
            <TasksContextProvider>
                <Form toggleModal={mockedFunctions.toggleModal} />
            </TasksContextProvider>
        </ThemeProvider>
    )
    const form = utils.getByTestId("form");

    return { ...utils, form };
};

it('Form testing', () => {
    const { form, getByLabelText, getByTestId, getByText } = renderForm();
    const inputTitle = getByLabelText(/title/i);
    const inputDescription = getByLabelText(/description/i);
    const priorityLabels = {
        important: getByLabelText('important'),
        less_important: getByLabelText('less important'),
        urgent: getByLabelText('urgent'),
        less_urgent: getByLabelText('less urgent'),
    }
    const priorityRadioInputs = {
        important: getByTestId('important'),
        less_important: getByTestId('less_important'),
        urgent: getByTestId('urgent'),
        less_urgent: getByTestId('less_urgent'),
    }
    const saveBtn = getByText(/save/i);

    // check if form is rendered
    expect(form).toBeInTheDocument();

    // check if inputs are rendered
    expect(inputTitle).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();

    // check if priority buttons are rendered
    expect(priorityLabels.important).toBeInTheDocument();
    expect(priorityLabels.less_important).toBeInTheDocument();
    expect(priorityLabels.urgent).toBeInTheDocument();
    expect(priorityLabels.less_urgent).toBeInTheDocument();

    // check if priority radio inputs are rendered
    expect(priorityRadioInputs.important).toBeInTheDocument();
    expect(priorityRadioInputs.less_important).toBeInTheDocument();
    expect(priorityRadioInputs.urgent).toBeInTheDocument();
    expect(priorityRadioInputs.less_urgent).toBeInTheDocument();

    // define title and description variables
    const title = "Write tests for priority rendering";
    const description = "Tests should check if the proper buttons are rendered and also check if user can click on button which will set the input as chosen";

    // try to add new task
    // add and check title
    fireEvent.input(inputTitle, { target: { value: title } });
    expect(inputTitle).toHaveValue(title);

    // add and check description
    fireEvent.input(inputDescription, { target: { value: description } });
    expect(inputDescription).toHaveValue(description);

    // choose priorities
    // choose importance
    fireEvent.click(priorityLabels.important);
    expect(priorityRadioInputs.important).toHaveProperty("checked", true);

    // choose urgency
    fireEvent.click(priorityLabels.less_urgent);
    expect(priorityRadioInputs.less_urgent).toHaveProperty("checked", true);

    // saving the task
    fireEvent.click(saveBtn);
    expect(mockedFunctions.toggleModal).toHaveBeenCalledTimes(1);
});