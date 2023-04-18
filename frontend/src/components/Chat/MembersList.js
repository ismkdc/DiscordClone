import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Centrifuge, Subscription } from 'centrifuge';

import colors from '../../utils/colors';
import data from '../../data';

import ScrollableArea from '../ScrollableArea';
import MemberListItem from './MemberListItem';

const StyledMemberList = styled.div`
  background: ${colors.grayNormal};
  width: 240px;
  flex-shrink: 0;

  position: relative;
`;

const StyledRoleName = styled.div`
  color: hsla(0, 0%, 100%, 0.4);
  height: 40px;
  font-size: 0.8em;
  line-height: 20px;
  padding: 20px 8px 0 16px;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
`;

const centrifuge = new Centrifuge('wss://ws-discord.ismkdc.com/connection/websocket');

const MembersList = ({ guildRolesList, members, onMemberClick }) => {
  const [onlineMembers, setOnlineMembers] = useState([]);

  useEffect(() => {
    const privateSub = centrifuge.newSubscription('user-' + window.btoa(window.localStorage.getItem('user')));
    privateSub.subscribe();

    const addSub = centrifuge.newSubscription('add-online-user');
    addSub.subscribe();

    const delSub = centrifuge.newSubscription('del-online-user');
    delSub.subscribe();

    centrifuge.connect();

    addSub.on('publication', (ctx) => {
      let user = {
        id: ctx.data.Id,
        username: ctx.data.Name,
        avatar: ctx.data.ProfileImageUrl,
        activity: {},
        tag: 7126,
        roles: [],
      };

      data.users[ctx.data.Id] = user;
      roleSeparators['online'].members.push(user);

      setOnlineMembers((onlineMembers) => [
        ...onlineMembers,
        user,
      ]);
    });

    delSub.on('publication', (ctx) => {
      var delUser = JSON.stringify(ctx.data);
      delUser.hide = true;
    });

    return () => {
      addSub.unsubscribe();
      delSub.unsubscribe();
      centrifuge.disconnect();
    };
  }, []);

  const roleSeparators = { online: { name: 'Online', members: onlineMembers } };

  members.forEach((member) => {
    let addedToRole = false;

    member.roles.forEach((roleId) => {
      if (addedToRole) return;

      const role = guildRolesList[roleId];

      if (role.isSeparated) {
        if (roleSeparators.hasOwnProperty(roleId)) {
          roleSeparators[roleId].members.push(member);
        } else {
          roleSeparators[roleId] = {
            name: role.name,
            members: [member],
            color: role.color,
          };
        }
        addedToRole = true;
      }
    });

    if (!addedToRole) {
      roleSeparators['online'].members.push(member);
    }
  });

  const renderMemberList = () => {
    const users = Object.values(data.users).filter(user => !user.hide);
    const userCount = users.length;
    return (
      <React.Fragment>
        <StyledRoleName>
          {userCount} Online
        </StyledRoleName>
        {
          users.map(user => (
            <MemberListItem
              key={user.id}
              member={user}
              color={"white"}
              onMemberClick={onMemberClick}
            />
          ))
        }
      </React.Fragment>
    );
  };
  

  return (
    <StyledMemberList>
      <ScrollableArea forceVertical tinyStyle autoHide>
        {renderMemberList()}
      </ScrollableArea>
    </StyledMemberList>
  );
};

export default MembersList;
