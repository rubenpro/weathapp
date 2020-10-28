import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiText,
  EuiTitle,
} from '@elastic/eui';

import { dateFormatDDMMYY } from '../../../utils/dateFormat';

function WeatherCardDescription({ data }) {
  return (
    <EuiFlexItem>
      <EuiFlexGroup
        alignItems="center"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        <EuiFlexItem>
          <EuiText size="xs">
            {dateFormatDDMMYY(data.fecha)} - {data.hora}
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup
            direction="row"
            alignItems="center"
            justifyContent="flexEnd"
            gutterSize="none"
          >
            <EuiIcon type="tear" size="l" color="primary" />
            <EuiTitle size="s">
              <div>{data.lluvia}%</div>
            </EuiTitle>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
}

WeatherCardDescription.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default WeatherCardDescription;
