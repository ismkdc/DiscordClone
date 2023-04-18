import React from 'react';
import styled from 'styled-components';

const StyledContentHeader = styled.div`
  height: 48px;
  flex: 0 0 auto;
  padding: 0 8px 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 2px 0 rgba(0, 0, 0, 0.06);
  color: #fff;
  z-index: 99;
`;

const ContentHeader = ({ content, rightContent }) => (
  <StyledContentHeader>
    <div>{content}</div>
    <div>{rightContent}</div>
  </StyledContentHeader>
);

export default ContentHeader;
