import React from 'react';
import styled from 'styled-components';

import AtIcon from '../icons/At';
import HashtagIcon from '../icons/Hashtag';

const StyledChannelName = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: #8a8e94;
    margin-right: 3px;
  }

  span {
    margin-top: 3px;
    font-weight: ${props => (props.isHeader ? 600 : 500)};
    font-size: ${props => (props.isHeader ? '1.1em' : '1em')};
    color: ${props => props.textColor || '#72767d'};
  }
`;

const ChannelName = ({ name, textColor, isHeader, isUser }) => (
  <StyledChannelName isHeader={isHeader} textColor={textColor}>
    {isUser ? <AtIcon /> : <HashtagIcon />}
    <span>{name}</span>
  </StyledChannelName>
);

export default ChannelName;
