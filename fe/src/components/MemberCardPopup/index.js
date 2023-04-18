import React from 'react';
import styled from 'styled-components';
import MemberCardPopupWrapper from './MemberCardPopupWrapper';

const StyledMemberCardPopup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export default class MemberCardPopup extends React.Component {
  state = { isPopupVisible: false };

  static instance;
  static show(config) {
    this.instance && this.instance.showPopup(config);
  }

  showPopup = ({ direction, position, member }) => {
    this.setState({
      isPopupVisible: true,
      direction,
      position,
      member
    });
  };

  closePopup = () => {
    this.setState({ isPopupVisible: false });
  };

  render() {
    const { isPopupVisible, direction, position, member } = this.state;
    const { guildRolesList } = this.props;

    return (
      <StyledMemberCardPopup>
        {isPopupVisible && (
          <MemberCardPopupWrapper
            direction={direction}
            position={position}
            member={member}
            guildRolesList={guildRolesList}
            onClose={this.closePopup}
          />
        )}
      </StyledMemberCardPopup>
    );
  }
}
