import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Input from './Input';
import { theme } from 'theme/mainTheme';
import { ThemeProvider } from 'styled-components';

afterEach(cleanup);

const renderInput = props => {
    const utils = render(
        <ThemeProvider theme={theme}>
            <Input placeholder="name" name="name" value="name" onChange={() => console.log('hello')} {...props} isErrored={false} />
        </ThemeProvider>
    );

    const input = utils.getByPlaceholderText("name");

    return { ...utils, input };
};


describe("Input field", () => {
    it("renders input element", () => {
        const { input } = renderInput();
        expect(input).toBeInTheDocument();
    });

    it("displays proper value", () => {
        const { input } = renderInput();

        fireEvent.change(input, { target: { value: 'name' } });

        expect(input).toHaveValue("name");
    });
});