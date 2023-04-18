import React from 'react';

const PinIcon = ({ className }) => (
  <svg name="Pin" className={className} width="16" height="16" viewBox="0 0 26 26">
    <g fill="none" fillRule="evenodd">
      <path d="M1 1h24v24H1" />
      <path
        fill="currentColor"
        d="M15 15V6h-4v9h-.50899482C10.22788048 15 10 15.2238576 10 15.5c0 .2680664.2198305.5.49100518.5h5.01798964C15.77211952 16 16 15.7761424 16 15.5c0-.2680664-.2198305-.5-.49100518-.5H15zm2-9h1V4H8v2h1v8l-2 2v2h5.2v4h1.6v-4H19v-2l-2-2V6z"
      />
    </g>
  </svg>
);

export default PinIcon;
