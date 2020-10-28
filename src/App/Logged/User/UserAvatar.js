import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { EuiAvatar } from '@elastic/eui';
import { useUser } from 'reactfire';

const UserAvatar = ({ size }) => {
  const user = useUser();

  return (
    <EuiAvatar
      color="#017D73"
      initialsLength={1}
      name={user ? _.upperCase(user.email) : 'Guest'}
      size={size}
    />
  );
};

UserAvatar.propTypes = {
  size: PropTypes.oneOf(['none', 's', 'm', 'l', 'xl']),
};

UserAvatar.defaultProps = {
  size: 'm',
};

export default UserAvatar;
