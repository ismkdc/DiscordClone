import React from 'react';
import styled from 'styled-components';

const StyledTooltip = styled.div`
  padding: 1px 11px 0;
  height: 32px;
  max-width: 290px;

  font-size: 0.9em;
  font-weight: 500;
  line-height: 32px;
  white-space: nowrap;

  color: rgba(255, 255, 255, 0.95);
  background: #000;
  border-radius: 5px;

  ::after {
    content: ' ';
    position: absolute;
    border-width: 5px;
    border-style: solid;
  }

  &.right::after {
    margin-top: -5px;
    top: 50%;
    right: 100%;
    border-color: transparent black transparent transparent;
  }

  &.top::after {
    margin-left: -5px;
    top: 100%;
    left: 50%;
    border-color: black transparent transparent transparent;
  }

  &.bottom::after {
    margin-left: -5px;
    bottom: 100%;
    left: 50%;
    border-color: transparent transparent black transparent;
  }
`;

const Tooltip = ({ children, direction }) => (
  <StyledTooltip className={direction}>{children}</StyledTooltip>
);

export default Tooltip;
