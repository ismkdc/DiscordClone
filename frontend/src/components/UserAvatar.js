import React from 'react';
import styled from 'styled-components';

import constants from '../utils/constants';
import colors from '../utils/colors';

const StyledUserAvatar = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  margin-right: 10px;
  position: relative;
  box-sizing: content-box;
  transition: 0.1s opacity ease-in;

  :hover {
    opacity: ${props => (props.fadeHover ? 0.85 : 1)};
  }

  .avatar {
    width: ${props => props.size};
    height: ${props => props.size};
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    overflow: hidden;
  }

  .fadeHover:hover {
    opacity: 0.9;
  }

  .status {
    position: absolute;
    width: ${props => props.statusSize};
    height: ${props => props.statusSize};

    background-clip: padding-box;
    border-color: ${colors.grayNormal};
    border-style: solid;
    border-width: ${props => (props.isBig ? 3 : 2)}px;
    border-radius: 999px;
    bottom: ${props => (props.isBig ? 0 : -4)}px;
    right: ${props => (props.isBig ? 0 : -2)}px;
  }

  .status.online {
    background-color: #43b581;
    box-shadow: ${props => props.isBig && 'inset 0 0 0 2px rgba(180, 225, 205, 0.6)'};
  }
`;

const UserAvatar = ({ className, avatarUrl, isBig, fadeHover, children }) => {
  const avatarSize = (isBig ? 90 : 30) + 'px';
  const statusSize = (isBig ? 18 : 10) + 'px';

  return (
    <StyledUserAvatar
      className={className}
      size={avatarSize}
      statusSize={statusSize}
      fadeHover={fadeHover}
      isBig={isBig}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url(${avatarUrl || constants.defaultAvatar})` }}
      >
        {children}
      </div>
      <div className="status online" />
    </StyledUserAvatar>
  );
};

export default UserAvatar;
