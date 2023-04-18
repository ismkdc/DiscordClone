import React from 'react';
import styled from 'styled-components';

import UserAvatar from '../../components/UserAvatar';
import ActivityIcon from '../../icons/Activity';
import LibraryIcon from '../../icons/Library';
import StoreIcon from '../../icons/Store';
import PersonWavingIcon from '../../icons/PersonWaving';
import closeIconUrl from '../../icons/close.svg';

import colors from '../../utils/colors';
import data from '../../data';

const StyledPrivateChannels = styled.div`
  margin: 20px 0 8px;

  .header {
    margin-top: 12px;
    padding: 9px 20px;

    font-size: 0.77em;
    text-transform: uppercase;
    color: #fff;
    opacity: 0.3;
  }
`;

const StyledChannel = styled.div`
  padding: 8px;
  margin: 1px 0 1px 8px;
  height: ${props => (props.smallHeight ? 40 : 42)}px;

  display: flex;
  align-items: center;
  font-size: 0.95em;

  color: #fff;
  cursor: pointer;
  border-radius: 3px;

  &.active {
    background-color: ${colors.privateChannelSelectedBackground};

    .avatar-wrapper .status {
      border-color: rgb(68, 72, 78);
    }
  }

  :hover .close {
    display: block;
  }

  :hover:not(.active) {
    background-color: ${colors.grayLight};

    .avatar-wrapper .status {
      border-color: ${colors.grayLight};
    }
  }

  &.active,
  &:hover {
    svg,
    span {
      opacity: 1;
      color: #fff;
    }
  }

  svg {
    margin-right: 18px;
    width: 24px;
    height: 24px;
    opacity: 0.6;
  }

  span {
    color: ${colors.channelName};
  }

  .avatar-wrapper {
    margin-right: 12px;
  }

  .username {
    flex: 1 1 auto;
  }

  .close {
    border: 0;
    width: 18px;
    height: 18px;
    display: none;
    justify-self: flex-end;

    background: url(${closeIconUrl}) 50% no-repeat;
    background-size: 18px 18px;
    opacity: 0.3;
    cursor: pointer;
  }
`;

const PrivateChannels = ({ selectedChannelId, onChannelClick }) => (
  <StyledPrivateChannels>
    <StyledChannel>
      <ActivityIcon />
      <span>Activity</span>
    </StyledChannel>
    <StyledChannel>
      <LibraryIcon />
      <span>Library</span>
    </StyledChannel>
    <StyledChannel>
      <StoreIcon />
      <span>Store</span>
    </StyledChannel>
    <StyledChannel>
      <PersonWavingIcon />
      <span>Friends</span>
    </StyledChannel>

    <div className="header">Direct Messages</div>

    {data.directMessages.map(directMessage => {
      const user = data.users[directMessage.userId];

      return (
        <StyledChannel
          key={directMessage.id}
          className={directMessage.id === selectedChannelId ? 'active' : ''}
          onClick={() => onChannelClick(null, directMessage.id)}
          smallHeight
        >
          <UserAvatar className="avatar-wrapper" avatarUrl={user.avatar} />
          <span className="username">{user.username}</span>
          <button className="close" />
        </StyledChannel>
      );
    })}
  </StyledPrivateChannels>
);

export default PrivateChannels;
