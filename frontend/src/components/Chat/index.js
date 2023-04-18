import React, { useState } from 'react';
import styled from 'styled-components';

import ContentHeader from '../ContentHeader';
import HeaderActionBar from './HeaderActionBar';
import ChannelName from '../ChannelName';
import MessagesWrapper from './MessagesWrapper';
import NewMessageWrapper from './NewMessageWrapper';
import MembersList from './MembersList';
import MemberCardPopup from '../MemberCardPopup';

import constants from '../../utils/constants';
import colors from '../../utils/colors';

const StyledChat = styled.div`
  background: ${colors.grayLight};

  display: flex;
  flex-direction: column;

  .content-wrapper {
    display: flex;
    height: 100%;
  }

  .messages-container {
    flex: 1 1 auto;

    display: flex;
    flex-direction: column;
  }
`;

const Chat = ({ className, isPrivate, channelName, guild, messages }) => {
  const [membersListVisible, setMembersListVisible] = useState(true);

  const toggleMembersListVisible = () => {
    setMembersListVisible(!membersListVisible);
  };

  const handleMemberListMemberClick = (element, member) => {
    const guildMember = guild.members.find(m => m.userId === member.id);
    const memberWithRoles = {
      ...member,
      roles: guildMember ? guildMember.roles : null
    };

    const { currentTarget: target } = element;
    const targetRect = target.getBoundingClientRect();
    MemberCardPopup.show({
      direction: 'right',
      position: { x: targetRect.left - constants.memberCardWidth, y: targetRect.top },
      member: memberWithRoles
    });
  };

  return (
    <StyledChat className={className}>
      <ContentHeader
        content={<ChannelName name={channelName} isHeader isUser={isPrivate} textColor="#fff" />}
        rightContent={
          <HeaderActionBar
            isMembersListActive={membersListVisible}
            onMembersToggleClick={toggleMembersListVisible}
          />
        }
      />

      <div className="content-wrapper">
        <div className="messages-container">
          <MessagesWrapper
            guild={guild}
            messages={messages}
            channelName={channelName}
            isPrivate={isPrivate}
          />
          <NewMessageWrapper channelName={channelName} isPrivate={isPrivate} />
        </div>

        {!isPrivate && membersListVisible && (
          <MembersList
            guildRolesList={guild.roles}
            members={guild.members}
            onMemberClick={handleMemberListMemberClick}
          />
        )}
      </div>
    </StyledChat>
  );
};

export default Chat;
