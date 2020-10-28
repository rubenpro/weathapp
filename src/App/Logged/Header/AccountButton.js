import React from 'react';
import PropTypes from 'prop-types';
import { EuiHeaderSectionItemButton } from '@elastic/eui';
import UserAvatar from '../User/UserAvatar';

function AccountButton({ isOpen, onClick }) {
  return (
    <EuiHeaderSectionItemButton
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onClick}
    >
      <UserAvatar />
    </EuiHeaderSectionItemButton>
  );
}

AccountButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AccountButton;
