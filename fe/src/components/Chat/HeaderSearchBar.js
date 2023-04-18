import React, { useState } from 'react';
import styled from 'styled-components';

import searchBarClearUrl from '../../icons/searchBarClear.svg';
import searchBarEyeGlassUrl from '../../icons/searchBarEyeGlass.svg';

const StyledHeaderSearchBar = styled.div`
  margin: 0 4px 0 8px;
  height: 28px;
  width: ${props => (props.expanded ? '244px' : '144px')};
  display: flex;

  transition: width 0.2s ease-in-out 0.1s;
  background-color: hsla(0, 0%, 100%, 0.1);
  border-radius: 3px;

  &:focus-within {
    width: 244px;
  }

  .input-wrapper {
    margin: 5px 0;
    flex: 1 1 auto;
  }

  input {
    padding: 0;
    border: 0;
    background: 0;
    width: 100%;
    height: 100%;

    outline: none;
    white-space: pre-wrap;
    overflow-wrap: break-word;

    color: #fff;
    font-size: 0.85em;
    margin: 0 6px;

    ::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  .icon-wrapper {
    margin: 4px 5px;
    width: 18px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;

    i {
      width: 18px;
      height: 18px;
      display: block;
      position: absolute;

      opacity: 0;
      transition: all 0.1s linear;
      z-index: 1;

      &.visible {
        opacity: 0.3;
        z-index: 2;
      }
    }

    .searchBarClear {
      cursor: pointer;
      background-image: url(${searchBarClearUrl});

      &.visible {
        transform: rotate(90deg);
      }

      :hover {
        opacity: 0.6;
      }
    }

    .searchBarEyeGlass {
      background-image: url(${searchBarEyeGlassUrl});

      &.visible {
        transform: rotate(0deg);
      }
    }
  }
`;

const HeaderSearchBar = () => {
  const [text, setText] = useState('');
  const hasText = !!text;

  return (
    <StyledHeaderSearchBar expanded={hasText}>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <div className="icon-wrapper" role="button">
        <i className={`searchBarEyeGlass ${!hasText ? 'visible' : ''}`} />
        <i
          className={`searchBarClear ${hasText ? 'visible' : ''}`}
          onClick={() => setText('')}
        />
      </div>
    </StyledHeaderSearchBar>
  );
}

export default HeaderSearchBar;