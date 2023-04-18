import React from 'react';
import styled from 'styled-components';

import ScrollbarStyles from './ScrollbarStyles';
import GlobalStyle from './GlobalStyle';
import Navbar from './Navbar';
import Channels from './Channels';
import Chat from './Chat';
import MemberCardPopup from './MemberCardPopup';
import TooltipsContainer from './Tooltip/TooltipsContainer';

import data from '../data';

const StyledApp = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;

  .app-content {
    flex: 1 1 auto;
  }
`;

class App extends React.Component {
  state = {
    currentArea: 'CHAT',
    selectedGuildId: 1111,
    selectedChannelsId: {},
    selectedPrivateChannelId: 333
  };

  getSelectedGuild = () => {
    const { selectedGuildId } = this.state;
    return selectedGuildId ? data.guilds.find(g => g.id === selectedGuildId) : null;
  };

  getGuildSelectedChannel = () => {
    const guild = this.getSelectedGuild();
    if (!guild) return null;

    const categoriesChannels = guild.categories.map(c => c.channels);
    // Here we could use flat() to merge the channels but it is still experimental
    const channels = [].concat(...categoriesChannels);

    const id = this.state.selectedChannelsId[guild.id] || guild.welcomeChannelId;
    return channels.find(channel => channel.id === id);
  };

  getSelectedChannelData = () => {
    const { currentArea, selectedPrivateChannelId } = this.state;
    if (currentArea === 'HOME') {
      const dm = data.directMessages.find(dm => dm.id === selectedPrivateChannelId);
      return {
        id: selectedPrivateChannelId,
        name: data.users[dm.userId].username,
        messages: dm.messages
      };
    }
    if (currentArea === 'CHAT') {
      const channel = this.getGuildSelectedChannel();
      return {
        id: channel.id,
        name: channel.name,
        messages: channel.messages || []
      };
    }
  };

  handleHomeClick = () => {
    this.setState({ selectedGuildId: null, currentArea: 'HOME' });
  };

  handleGuildClick = guildId => {
    this.setState({ selectedGuildId: guildId, currentArea: 'CHAT' });
  };

  handleChannelClick = (guildId, channelId) => {
    const { currentArea } = this.state;
    if (currentArea === 'HOME') {
      this.setState({
        selectedPrivateChannelId: channelId
      });
    }
    if (currentArea === 'CHAT') {
      this.setState({
        selectedChannelsId: {
          ...this.state.selectedChannelsId,
          [guildId]: channelId
        }
      });
    }
  };

  render() {
    const { selectedGuildId } = this.state;
    const selectedGuild = this.getSelectedGuild();
    const showPrivateChannels = !selectedGuild;
    const selectedChannelData = this.getSelectedChannelData();

    return (
      <StyledApp>
        <GlobalStyle />
        <ScrollbarStyles />

        <Navbar
          onHomeClick={this.handleHomeClick}
          onGuildClick={this.handleGuildClick}
          selectedGuildId={selectedGuildId}
        />
        <Channels
          showPrivateChannels={showPrivateChannels}
          guild={selectedGuild}
          selectedChannelId={selectedChannelData.id}
          onChannelClick={this.handleChannelClick}
        />
        <Chat
          className="app-content"
          isPrivate={showPrivateChannels}
          channelName={selectedChannelData.name}
          guild={selectedGuild}
          messages={selectedChannelData.messages}
        />

        <TooltipsContainer
          ref={node => {
            TooltipsContainer.instance = TooltipsContainer.instance || node;
          }}
        />
        <MemberCardPopup
          guildRolesList={selectedGuild ? selectedGuild.roles : []}
          ref={node => {
            MemberCardPopup.instance = MemberCardPopup.instance || node;
          }}
        />
      </StyledApp>
    );
  }
}

export default App;
