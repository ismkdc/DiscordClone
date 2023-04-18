import React, { useState } from 'react';
import styled from 'styled-components';

import PlusAlt from '../../icons/PlusAlt';
import Channel from './Channel';
import ExpandArrowIcon from '../../icons/ExpandArrow';

import colors from '../../utils/colors';

const StyledCategory = styled.div`
  padding-top: 28px;
`;

const StyledCategoryHeading = styled.div`
  padding: 0 8px 0 18px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: 700;
  color: ${colors.channelName};

  > svg {
    color: ${colors.channelName};
    position: absolute;
    left: 3px;
    top: 2px;
    transform: rotateZ(${props => (props.isCollapsed ? 270 : 0)}deg);
  }

  :hover {
    color: ${colors.channelHoveredText};
    > svg {
      color: ${colors.channelHoveredText};
    }
  }
`;

const StyledAddButton = styled.button`
  background: 0;
  border: 0;
  margin: 0;
  padding: 0;
  height: 18px;
  width: 18px;
  cursor: pointer;

  svg * {
    fill: ${colors.channelName};
  }
`;

const Category = ({ name, channels, guildId, selectedChannelId, onChannelClick }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <StyledCategory>
      <StyledCategoryHeading onClick={() => setCollapsed(!isCollapsed)} isCollapsed={isCollapsed}>
        <ExpandArrowIcon />
        {name}

        <StyledAddButton>
          <PlusAlt />
        </StyledAddButton>
      </StyledCategoryHeading>

      {channels.map(channel => {
        const isSelected = selectedChannelId === channel.id;
        const render = !isCollapsed || isSelected;

        return (
          render && (
            <Channel
              key={channel.id}
              name={channel.name}
              isSelected={isSelected}
              onClick={() => onChannelClick(guildId, channel.id)}
            />
          )
        );
      })}
    </StyledCategory>
  );
};

export default Category;
