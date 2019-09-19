import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v1';
import Fade from 'react-reveal/Fade';
import { withPrefix, Link } from 'gatsby';
import bp from './breakpoints';

const Outer = styled.div`
  &.home {
    max-width: ${p => p.theme.width.max} !important;
    margin: 50px auto !important;
    @media ${bp.small} {
      margin: 100px auto !important;
    }
  }
  &.page {
  }
  padding: 0;
`;

const Inner = styled.div`
  margin: 0 auto;

  @media ${bp.small} {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    transition: transform 1s;
  }

  a {
    margin: 30px auto;
    display: block;
    @media ${bp.small} {
      margin: 0;
    }
    padding: 0;
    position: relative;
    &:hover {
      img {
        transform: scale(1.03);
      }
    }
  }
`;

const Tile = styled.div`
  width: 100%;
  height: auto;
`;

const Thumb = styled.picture`
  img,
  source {
    transition: transform 0.2s;
  }
`;

const Name = styled.h2`
  padding: 0 5px;
  margin: 0;
  font-size: 1.5em;
  @media ${bp.small} {
    padding: 0;
  }
`;

const Recommended = styled.h2`
  font-size: 22px;
  font-weight: 700;
  padding: 0 5px;
  margin-bottom: 10px;
  @media ${bp.small} {
    padding: 0;
  }
`;

const Mosaic = ({ content, home }) => {
  const inner = content.map(each => {
    const {
      frontmatter: { title, opening },
      fields: { fullPath },
    } = each.node;

    const path = fullPath.substring(1);

    const jpgImage = home ? opening : `.${opening}`;
    // const jpgImage = webpImage.replace('.webp', '.jpg').replace('.gif', '.jpg');

    return (
      <Link key={uuid()} to={path}>
        <Tile>
          <Thumb>
            <img src={jpgImage} alt="" />
          </Thumb>
          {/* <Name>{title}</Name> */}
        </Tile>
      </Link>
    );
  });

  if (home) {
    return (
      <Outer className="home">
        <Fade>
          <Inner>{inner}</Inner>
        </Fade>
      </Outer>
    );
  }
  return (
    <Outer className="page">
      <Fade>
        <Recommended>outras histórias</Recommended>
        <Inner>{inner}</Inner>
      </Fade>
    </Outer>
  );
};

Mosaic.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        opening: PropTypes.string.isRequired,
      }),
      fields: PropTypes.shape({
        fullPath: PropTypes.string,
      }),
    })
  ).isRequired,
  home: PropTypes.bool,
};

Mosaic.defaultProps = {
  home: false,
};

export default Mosaic;
