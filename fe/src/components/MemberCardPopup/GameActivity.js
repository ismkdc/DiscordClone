import React from 'react';
import styled from 'styled-components';

import unknownGameIconUrl from '../../icons/unknownGameIcon.svg';

const StyledGameActivity = styled.div`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.05);

  .description {
    margin-bottom: 8px;

    text-transform: uppercase;
    font-size: 0.75em;
    font-weight: 900;
  }

  .info {
    display: flex;
  }

  .game-icon {
    width: 40px;
    height: 40px;
    background-image: url(${unknownGameIconUrl});
  }

  .game-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 0.95em;
      font-weight: 600;
    }

    .duration {
      margin-top: 2px;
      font-size: 0.9em;
      font-weight: 200;
    }
  }
`;

const GameActivity = ({ activity }) => (
  <StyledGameActivity>
    <div className="description">Playing a game</div>
    <div className="info">
      <div className="game-icon" />
      <div className="game-info">
        <div className="name">{activity.name}</div>
        <div className="duration">{activity.duration}</div>
      </div>
    </div>
  </StyledGameActivity>
);

export default GameActivity;
