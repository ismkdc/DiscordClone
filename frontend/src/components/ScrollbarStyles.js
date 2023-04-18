import { createGlobalStyle } from 'styled-components';
import colors from '../utils/colors';

export default createGlobalStyle`
  /*
   * Default
   */
  .scrollbar-default::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  .scrollbar-default::-webkit-scrollbar-corner {
    background: none;
    border: none;
  }

  .scrollbar-default::-webkit-scrollbar-thumb,
  .scrollbar-default::-webkit-scrollbar-track {
    background-clip: padding-box;
    border-radius: 7px;
    border-style: solid;
    border-width: 3px;
  }

  .scrollbar-default::-webkit-scrollbar-thumb {
    background-color: ${colors.scrollbarThumbBackground};
    border-color: ${colors.grayLight};
  }
  .scrollbar-default::-webkit-scrollbar-track {
    background-color: ${colors.scrollbarTrackBackground};
    border-color: transparent;
  }

  /*
   * Tiny
   */
  .scrollbar-tiny::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .scrollbar-tiny::-webkit-scrollbar-thumb,
  .scrollbar-tiny::-webkit-scrollbar-track {
    background-clip: padding-box;
    border-radius: 7px;
    border-style: solid;
  }

  .scrollbar-tiny::-webkit-scrollbar-thumb {
    background-color: ${colors.scrollbarTinyThumbBackground};
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: move;
  }

  .scrollbar-tiny::-webkit-scrollbar-track {
    background-color: transparent;
    border: 2px solid transparent;
  }

  /*
   * Auto Hide
   */
  .scrollbar-autoHide::-webkit-scrollbar-thumb,
  .scrollbar-autoHide::-webkit-scrollbar-track {
    visibility: hidden;
  }
  .scrollbar-autoHide:hover::-webkit-scrollbar-thumb,
  .scrollbar-autoHide:hover::-webkit-scrollbar-track {
    visibility: visible;
  }

  /*
   * Invisible
   */
  .scrollbar-invisible::-webkit-scrollbar {
    width: 0;
  }
`;
