import React from 'react';
import styled from 'styled-components';

// The parent of ScrollableArea should have "position" set to "relative"
// otherwise the scrollable area will overflow the content
const StyledScrollableArea = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;

  .scroller {
    flex: 1 1 auto;
    overflow-y: auto;
    flex-grow: 1;

    /* Firefox fix */
    min-height: 0;
  }

  .scroller.force-vertical {
    overflow-y: scroll;
  }
`;

const ScrollableArea = ({ children, forceVertical, tinyStyle, autoHide, invisible }) => (
  <StyledScrollableArea>
    <div
      className={[
        'scroller',
        forceVertical && 'force-vertical',
        !tinyStyle && 'scrollbar-default',
        tinyStyle && 'scrollbar-tiny',
        autoHide && 'scrollbar-autoHide',
        invisible && 'scrollbar-invisible'
      ].join(' ')}
    >
      {children}
    </div>
  </StyledScrollableArea>
);

export default ScrollableArea;
