import React from 'react';
import PropTypes from 'prop-types';
import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiStat } from '@elastic/eui';

import { WeatherCardTemperaturesStyles } from './WeatherCardTemperaturesStyles';

function WeatherCardTemperatures({ data }) {
  const classes = WeatherCardTemperaturesStyles();
  const temperatureTitle = (temperature) => `${temperature}ºC`;

  return (
    <EuiFlexItem className={classes.container}>
      <EuiPanel>
        <EuiFlexGroup alignItems="center" responsive={false}>
          <EuiFlexItem>
            <EuiStat
              title={temperatureTitle(data.temperatura_actual)}
              description="Current"
              textAlign="center"
              titleSize="s"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat
              title={temperatureTitle(data.temperaturas.max)}
              description="Max."
              textAlign="center"
              titleSize="s"
              titleColor="danger"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiStat
              title={temperatureTitle(data.temperaturas.min)}
              description="Min."
              textAlign="center"
              titleSize="s"
              titleColor="primary"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </EuiFlexItem>
  );
}

WeatherCardTemperatures.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default WeatherCardTemperatures;
