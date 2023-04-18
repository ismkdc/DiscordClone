import React from 'react';
import styled from 'styled-components';

import colors from '../../utils/colors';

const StyledWelcomeChannelMessage = styled.div`
  margin: 0 20px;
  padding-bottom: 14px;
  height: 95px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  background-position: 0 100%, 100% 100%;
  background-repeat: no-repeat;
  background-size: 192px 80px, 216px 64px;
  background-image: url(https://discordapp.com/assets/5eed3f20bc3c75fd5ff63c60df8f679d.png),
    url(https://discordapp.com/assets/129bf63f677720a34bc7ffeb74468a0e.png);

  color: ${colors.welcomeChannelMessage};
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.02);
`;

const WelcomeChannelMessage = ({ channelName }) => (
  <StyledWelcomeChannelMessage>
    <span>
      Welcome to the beginning of the <strong>#{channelName}</strong> channel.
    </span>
  </StyledWelcomeChannelMessage>
);

export default WelcomeChannelMessage;
