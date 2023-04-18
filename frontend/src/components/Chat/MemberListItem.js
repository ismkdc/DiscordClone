import React from 'react';
import styled from 'styled-components';

import UserAvatar from '../UserAvatar';

import colors from '../../utils/colors';

const StyledMember = styled.div`
  margin: 0 0 0 8px;
  padding: 1px 0 1px 8px;
  height: 40px;
  border-radius: 3px;
  cursor: pointer;

  display: flex;
  align-items: center;

  :hover {
    background: ${colors.memberHoverBg};

    .avatar-wrapper .status {
      border-color: ${colors.memberHoverBg};
    }
  }

  .member-inner {
    .username {
      color: ${props => props.color || colors.memberUsernameOnline};
      font-size: 1em;
    }

    .status {
      color: ${colors.memberStatus};
      font-size: 0.7em;

      strong {
        font-weight: 800;
      }
    }
  }
`;

const MemberListItem = ({ member, color, onMemberClick }) => (
  <StyledMember color={color} onClick={e => onMemberClick(e, member)}>
    <UserAvatar className="avatar-wrapper" avatarUrl={member.avatar} />

    <div className="member-inner">
      <div className="username">{member.username}</div>
      {member.activity && (
        <div className="status">
          Chating <strong>{member.activity.name}</strong>
        </div>
      )}
    </div>
  </StyledMember>
);

export default MemberListItem;
