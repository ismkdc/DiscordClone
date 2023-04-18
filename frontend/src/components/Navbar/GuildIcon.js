import React from 'react';
import styled from 'styled-components';
import colors from '../../utils/colors';
import DiscordIcon from '../../icons/Discord';

const StyledGuildIcon = styled.a.attrs({ href: '#' })`
  margin-top: 10px;
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  background: ${props => (props.selected ? colors.primary : colors.grayNormal)};
  background-image: ${props => props.icon && `url(${props.icon})`};
  background-size: cover;
  background-position: center;
  border-radius: ${props => (props.selected ? '15px' : '50%')};

  transition: 0.3s ease;
  text-decoration: none;
  color: #fff;

  &.add {
    background: transparent;
    border: 1px dashed ${colors.addGuildBorder};
    color: ${colors.addGuildBorder};

    font-weight: 400;
    font-size: 2.1em;

    :hover {
      border-color: hsla(0, 0%, 100%, 0.75);
      color: hsla(0, 0%, 100%, 0.75);
    }
  }

  :hover:not(.add) {
    background-color: ${colors.primary};
    border-radius: 15px;
  }

  ::before {
    content: ' ';
    display: ${props => (props.selected ? 'block' : 'none')};
    width: 10px;
    height: 40px;
    position: absolute;
    left: -15px;
    border-radius: 20px;
    background: #fff;
  }
`;

const HomeIcon = styled(DiscordIcon)`
  color: ${colors.homeIcon};
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const GuildIcon = ({ name, icon, selected, isHome, isAdd, onClick, ...props }) => {
  let content = name;
  if (isHome) {
    content = <HomeIcon />;
  }
  if (isAdd) {
    content = '+';
  }

  return (
    <StyledGuildIcon
      selected={selected}
      icon={icon}
      onClick={onClick}
      className={isAdd ? 'add' : ''}
      {...props}
    >
      {!icon ? content : ''}
    </StyledGuildIcon>
  );
};

export default GuildIcon;
