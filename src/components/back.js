import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withPrefix } from 'gatsby';

const BackLink = styled.div`
  a {
    padding: 0 0 0 20px;
    position: relative;
    font-weight: 700;
    &:before {
      content: '‹';
      top: -2px;
      left: 0;
      position: absolute;
      font-size: 1.5em;
    }
    &:hover {
      &:before {
        content: '«';
      }
    }
  }
`;

const Back = ({ to }) => {
  return (
    <BackLink>
      <Link direction="right" to={withPrefix(to)}>
        Córrego do Feijão
      </Link>
    </BackLink>
  );
};

Back.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Back;
