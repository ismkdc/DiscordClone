import React from 'react';
import styled from 'styled-components';

const StyledCounter = styled.div`
  margin: 10px 0;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
`;

const OnlineFriendsCounter = ({ online }) => <StyledCounter>{online} Online</StyledCounter>;

export default OnlineFriendsCounter;
