import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { theme } from 'theme/mainTheme';
import { ThemeProvider } from 'styled-components';
import Modal from 'components/Modal/Modal';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';

afterEach(cleanup);

const renderModal = () => {
    const utils = render(
        <ThemeProvider theme={theme}>
            <Modal toggleModal={() => ''} setIsModalOpened={() => ''} title="Title">
                Modal
            </Modal>
        </ThemeProvider>
    );

    const modal = utils.getByText(/modal/i);

    return { ...utils, modal };
};

const renderButton = () => {
    const utils = render(
        <ThemeProvider theme={theme}>
            <ButtonIcon data-testid="open-modal-btn" />
        </ThemeProvider>
    );
    const button = utils.getByTestId("open-modal-btn");

    return { ...utils, button };

}


describe("Modal", () => {
    it("renders modal", () => {
        const { modal } = renderModal();
        expect(modal).toBeInTheDocument();
    });

    it("renders modal when click button", () => {
        const { button } = renderButton();

        // check if button is rendered
        expect(button).toBeInTheDocument;

        // fire click event on button
        fireEvent.click(button);
        const { modal } = renderModal();
        expect(modal).toBeInTheDocument();

    })
});