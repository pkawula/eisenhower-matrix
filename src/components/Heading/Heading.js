import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledHeading = styled.h2`
    font-size: ${({ theme }) => theme.font.size.l};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.font.color.primary};
    text-align: center;
    margin: 0 auto 2em;
`;

const Heading = ({ children }) => <StyledHeading>{children}</StyledHeading>;

Heading.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
}

export default Heading;