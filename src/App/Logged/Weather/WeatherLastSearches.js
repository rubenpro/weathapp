import React, { useState, useEffect } from 'react';
import { db } from '../../../db/firebase';
import { useUser } from 'reactfire';
import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';

import WeatherCard from './WeatherCard';

function WeatherLastSearches() {
  const user = useUser();
  const [firebaseUserSearches, setFirebaseUserSearches] = useState([]);

  /* REAL TIME */
  /* const getLastSearches = () => {
    db.collection('searches')
      .orderBy('municipio.fecha', 'desc')
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) =>
          data.push({ ...doc.data(), id: doc.id }),
        );
        setFirebaseUserSearches(data);
      });
  }; */

  const getLastSearches = async () => {
    const querySnapshot = await db
      .collection('searches')
      .orderBy('municipio.fecha', 'desc')
      .orderBy('municipio.hora', 'desc')
      .get();
    const data = [];
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
    setFirebaseUserSearches(data);
  };

  useEffect(() => {
    getLastSearches();
  }, []);

  return (
    <>
      {user && (
        <EuiFlexItem>
          <EuiSpacer size="xs" />
          <EuiText>
            <h3 className="roboto">
              <EuiTextColor color="secondary">Last searches</EuiTextColor>
            </h3>
          </EuiText>
          <EuiSpacer size="s" />
          <EuiFlexGrid columns={3}>
            {firebaseUserSearches.map((search) => (
              <WeatherCard
                key={search.id}
                data={search.municipio}
                canDelete={true}
                {...search}
              />
            ))}
          </EuiFlexGrid>
        </EuiFlexItem>
      )}
    </>
  );
}

export default WeatherLastSearches;
