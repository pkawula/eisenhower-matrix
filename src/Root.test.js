import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { theme } from 'theme/mainTheme';
import { ThemeProvider } from 'styled-components';
import Modal from 'components/Modal/Modal';

afterEach(cleanup);

const renderModal = () => {
    const utils = render(
        <ThemeProvider theme={theme}>
            <Modal toggleModal={() => ''} setIsModalOpened={() => ''} title="Modal testig">
                Hello
            </Modal>
        </ThemeProvider>
    );

    const modal = utils.getByText(/modal/i);

    return { ...utils, modal };
};


describe("Modal", () => {
    it("renders modal", () => {
        const { modal } = renderModal();
        expect(modal).toBeInTheDocument();
    });
});