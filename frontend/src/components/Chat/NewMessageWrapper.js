import React from 'react';
import styled from 'styled-components';
import NewMessageForm from './NewMessageForm';

const StyledNewMessageWrapper = styled.div`
  margin: 0 20px;
`;

const StyledContainer = styled.div`
  border-top: 1px solid hsla(0, 0%, 100%, 0.06);
  margin-bottom: 30px;
  padding-top: 20px;
`;

const NewMessageWrapper = ({ channelName, isPrivate }) => (
  <StyledNewMessageWrapper>
    <StyledContainer>
      <NewMessageForm channelName={channelName} isPrivate={isPrivate} />
    </StyledContainer>
  </StyledNewMessageWrapper>
);

export default NewMessageWrapper;
