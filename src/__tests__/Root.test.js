import React from 'react';
import { cleanup, fireEvent, render, waitForDomChange } from '@testing-library/react';
import Root from 'Root';

afterEach(cleanup);

const renderRoot = () => {
    const utils = render(
        <Root />
    );
    const root = utils.getByTestId('root');

    return { ...utils, root };

}


describe("Application do", () => {
    it("render modal when clicking plus button", async () => {
        const { root, getByTestId } = renderRoot();

        // check if root is rendered 
        expect(root).toBeInTheDocument();

        // check if button is rendered
        const button = getByTestId("add_button");
        expect(getByTestId('add_button')).toBeInTheDocument();

        // fire click event on button
        fireEvent.click(button);
        await waitForDomChange();

        expect(getByTestId("modal")).toBeInTheDocument();
    });
});