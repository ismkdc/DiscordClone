import React, { useRef } from 'react';
import styled from 'styled-components';

import AttachButton from './AttachButton';
import NewMessageButtons from './NewMessageButtons';

const StyledNewMessageForm = styled.form`
  border-radius: 5px;
  background: rgba(114, 118, 125, 0.3);
  display: flex;
  align-items: center;
`;

const StyledDivider = styled.div`
  margin: 0 0;
  width: 1px;
  height: 34px;
  background-color: hsla(0, 0%, 100%, 0.1);
`;

const StyledTextarea = styled.textarea`
  margin: 2px 2px 2px 0;
  background: 0;
  border: 0;
  outline: 0;
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 0.9375rem;
  letter-spacing: -0.025rem;
  line-height: 1.25rem;
  max-height: 144px;
  min-height: 20px;
  padding: 10px;
  resize: none;
  width: 100%;
`;

const NewMessageForm = ({ channelName, isPrivate }) => {

  const textareaRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const message = textareaRef.current.value;
      textareaRef.current.value = '';
      
      event.preventDefault();
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://write-api-discord.ismkdc.com/write-api/messages/create', false);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authentication', window.localStorage.getItem('token').replace(/['"]+/g, ''));
      
      xhr.send(JSON.stringify({ message }));

      if (xhr.status === 200) {
        
      } else {
        console.error('Error sending message:', xhr.statusText);
      }
    }
  };


  return (
    <StyledNewMessageForm>
      <AttachButton />

      <StyledDivider />

      <StyledTextarea
        rows={1}
        placeholder={`Message ${(isPrivate ? '@' : '#') + channelName}`}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
      />

      <NewMessageButtons />
    </StyledNewMessageForm>
  );
};

export default NewMessageForm;
