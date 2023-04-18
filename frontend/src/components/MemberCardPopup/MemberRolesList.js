import React from 'react';
import styled from 'styled-components';

const StyledRolesList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledRole = styled.li`
  margin: 0 4px 4px 0;
  padding: 4px 8px 4px 4px;
  border: 1px solid ${props => props.color};
  border-radius: 11px;

  font-size: 0.7em;
  font-weight: 500;
  height: 22px;
  display: flex;
  align-items: center;

  .circle {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    border: 0;

    background: ${props => props.color};
    border-radius: 50%;
  }

  .name {
    margin-top: 2px;
    max-width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const MemberRolesList = ({ rolesList, memberRoles }) => (
  <StyledRolesList>
    {memberRoles.map(roleId => {
      const role = rolesList[roleId];

      return (
        <StyledRole key={roleId} color={role.color}>
          <button className="circle" />
          <span className="name">{role.name}</span>
        </StyledRole>
      );
    })}
  </StyledRolesList>
);

export default MemberRolesList;
