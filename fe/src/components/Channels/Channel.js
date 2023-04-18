import React from 'react';
import styled from 'styled-components';

import colors from '../../utils/colors';
import ChannelName from '../ChannelName';

const StyledChannel = styled.div`
  margin: 2px 0 2px 8px;
  padding: 0 8px;
  height: 32px;
  background-color: ${props => (props.isSelected ? colors.channelSelected : 0)};
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;

  :hover {
    background-color: ${props => (props.isSelected ? colors.channelSelected : colors.grayLight)};

    span {
      color: ${props => (props.isSelected ? 0 : colors.channelHoveredText)};
    }
  }
`;

const Channel = ({ name, isSelected, onClick }) => (
  <StyledChannel isSelected={isSelected} onClick={onClick}>
    <ChannelName name={name} textColor={isSelected && '#fff'} />
  </StyledChannel>
);

export default Channel;
