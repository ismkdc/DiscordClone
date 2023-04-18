import React from 'react';
import styled from 'styled-components';

import Tooltip from './Tooltip';

const StyledTooltipsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledTooltipWrapper = styled.div`
  position: absolute;
  z-index: 999;

  top: ${props => props.position && props.position.y}px;
  left: ${props => props.position && props.position.x}px;

  &.bottom {
    transform: translateX(-50%);
  }

  &.top {
    transform: translate(-50%, -100%);
  }

  &.right {
    transform: translateY(-50%);
  }
`;

export default class TooltipsContainer extends React.Component {
  state = { isVisible: false };

  static instance;
  static show(config) {
    this.instance && this.instance.showTooltip(config);
  }
  static hide() {
    this.instance && this.instance.hideTooltip();
  }

  showTooltip = ({ content, direction, position }) => {
    this.setState({
      isVisible: true,
      direction,
      content,
      position
    });
  };

  hideTooltip = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const { isVisible, direction, content, position } = this.state;

    return (
      <StyledTooltipsContainer>
        {isVisible && (
          <StyledTooltipWrapper className={direction} position={position}>
            <Tooltip direction={direction}>{content}</Tooltip>
          </StyledTooltipWrapper>
        )}
      </StyledTooltipsContainer>
    );
  }
}
