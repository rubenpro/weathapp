import React from 'react';
import PropTypes from 'prop-types';
import { EuiTextColor, EuiTitle } from '@elastic/eui';

const AppTitle = ({ size }) => (
  <EuiTitle size={size}>
    <h1 className="roboto fontweight-500 main-title ta-center">
      <EuiTextColor color="secondary">Weath</EuiTextColor>
      <EuiTextColor color="default">App</EuiTextColor>
      <span role="img" aria-label="temperature">
        🌡️
      </span>
    </h1>
  </EuiTitle>
);

AppTitle.propTypes = {
  size: PropTypes.oneOf(['xxxs', 'xxs', 'xs', 's', 'm', 'l']),
};

AppTitle.defaultProps = {
  size: 's',
};

export default AppTitle;
