import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../db/firebase';
import {
  EuiButton,
  EuiCard,
  EuiConfirmModal,
  EuiFlexItem,
  EuiOverlayMask,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

import { WeatherCardStyles } from './WeatherCardStyles';
import WeatherCardDescription from './WeatherCardDescription';
import WeatherCardTemperatures from './WeatherCardTemperatures';
import { dateFormatDDMMYY } from '../../../utils/dateFormat';

function WeatherCard({ data, canDelete, ...rest }) {
  const classes = WeatherCardStyles();
  const [isEmptyModalVisible, setIsEmptyModalVisible] = useState(false);
  const { nombre, nombre_provincia } = data.municipio;
  const { id } = rest;
  const weatherCardInfoDelete = `${nombre} - ${dateFormatDDMMYY(data.fecha)}`;

  const handleDeleteSearch = () => setIsEmptyModalVisible(true);
  const closeModal = () => setIsEmptyModalVisible(false);

  const deleteSearch = async (id) =>
    await db
      .collection('searches')
      .doc(id)
      .delete()
      .then(() => closeModal());

  return (
    <EuiFlexItem>
      <EuiCard
        className={classes.card}
        layout="horizontal"
        title={nombre}
        description={nombre_provincia}
      >
        <WeatherCardDescription data={data} />
        <WeatherCardTemperatures data={data} />
        <EuiSpacer size="m" />
        {canDelete && (
          <EuiFlexItem grow={false}>
            <EuiButton
              size="s"
              fill
              color="danger"
              iconType="trash"
              iconSide="right"
              onClick={handleDeleteSearch}
            >
              Delete search
            </EuiButton>
          </EuiFlexItem>
        )}
      </EuiCard>
      {isEmptyModalVisible && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Your are going to delete..."
            buttonColor="danger"
            onCancel={closeModal}
            onConfirm={() => deleteSearch(id)}
            cancelButtonText="Cancel"
            confirmButtonText="Delete"
          >
            <EuiText>
              <h4>{weatherCardInfoDelete}</h4>
            </EuiText>
          </EuiConfirmModal>
        </EuiOverlayMask>
      )}
    </EuiFlexItem>
  );
}

WeatherCard.propTypes = {
  data: PropTypes.shape({}).isRequired,
  canDelete: PropTypes.bool,
};

WeatherCard.defaultProps = {
  canDelete: false,
};

export default WeatherCard;
