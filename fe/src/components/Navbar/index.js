import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';
import GuildIcon from './GuildIcon';
import OnlineFriendsCounter from './OnlineFriendsCounter';
import ScrollableArea from '../ScrollableArea';
import { TooltipWrapper } from '../Tooltip';

import data from '../../data';

const StyledNavbar = styled.div`
  width: 70px;
  background: ${colors.grayDarker};
  position: relative;
  flex-shrink: 0;
  padding-bottom: 8px;

  .content {
    padding-bottom: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const GuildSeparator = styled.div`
  height: 2px;
  width: 30px;
  background: ${colors.separator};
`;

const Navbar = ({ onHomeClick, onGuildClick, selectedGuildId }) => (
  <StyledNavbar>
    <ScrollableArea invisible>
      <div className="content">
        <TooltipWrapper content="Home" direction="right">
          <GuildIcon isHome={true} selected={!selectedGuildId} onClick={onHomeClick} />
        </TooltipWrapper>
        <OnlineFriendsCounter online={data.friendsOnlineCount} />

        <GuildSeparator />

        {data.guilds.map(guild => (
          <TooltipWrapper key={guild.id} content={guild.name} direction="right">
            <GuildIcon
              name={guild.initials}
              icon={guild.icon}
              selected={selectedGuildId === guild.id}
              onClick={() => onGuildClick(guild.id)}
            />
          </TooltipWrapper>
        ))}

        <TooltipWrapper content="Add a Server" direction="right">
          <GuildIcon isAdd={true} />
        </TooltipWrapper>
      </div>
    </ScrollableArea>
  </StyledNavbar>
);

export default Navbar;
