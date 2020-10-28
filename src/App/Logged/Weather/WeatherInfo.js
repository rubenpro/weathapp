import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { db } from '../../../db/firebase';
import {
  EuiComboBox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';

import { WeatherInfoStyles } from './WeatherInfoStyles';
import lowercaseKeys from '../../../utils/lowercaseKeys';
import ElTiempoAPI from '../../../Api/ElTiempoAPI';
import WeatherCard from './WeatherCard';
import WeatherLastSearches from './WeatherLastSearches';
import { LoggedContext } from '../LoggedContext';
import Header from '../Header/Header';

function WeatherInfo() {
  const classes = WeatherInfoStyles();
  const [selectedOption, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentMunicipio, setCurrentMunicipio] = useState({});
  const [municipiosBarcelona, setMunicipiosBarcelona] = useState([]);
  const [sessionSearches, setSessionSearches] = useState([]);

  const getMunicipiosBarcelona = async () => {
    setIsLoading(true);
    await ElTiempoAPI.getMunicipiosBarcelona().then((barcelona) => {
      const { municipios } = barcelona;
      const municipiosBarcelona = [];
      municipios.map((municipio) => {
        const municipioLowerCase = lowercaseKeys(municipio);
        const label = municipioLowerCase.nombre;
        const id_municipio = municipioLowerCase.codigoine.substring(0, 5);
        return municipiosBarcelona.push({
          ...municipioLowerCase,
          label,
          id_municipio,
        });
      });
      setMunicipiosBarcelona(municipiosBarcelona);
      setOptions(municipiosBarcelona);
    });
    setIsLoading(false);
  };

  const getMunicipio = async (municipio) => {
    setIsLoading(true);
    if (municipio) {
      const { codprov, id_municipio } = municipio;
      return await ElTiempoAPI.getMunicipioData(codprov, id_municipio).then(
        (data) => {
          const { municipio } = data;
          const now = new Date();
          const hora = now.toLocaleTimeString();
          const municipioData = {
            ...data,
            municipio: lowercaseKeys(municipio),
            hora,
          };
          setCurrentMunicipio(municipioData);
          setSessionSearches([...sessionSearches, municipioData]);
          const s = JSON.parse(sessionStorage.getItem('sessionSearches')) || [];
          s.push(municipioData);
          sessionStorage.setItem('sessionSearches', JSON.stringify(s));
          setIsLoading(false);
        },
      );
    }
    return [];
  };

  const onChange = (selectedOption) => {
    getMunicipio(selectedOption[0]);
    setSelected(selectedOption);
  };

  const onSearchChange = (searchValue) => {
    setOptions(
      municipiosBarcelona.filter((municipio) =>
        municipio.label.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    getMunicipiosBarcelona();
  }, []);

  const saveSearch = async (municipio) =>
    await db.collection('searches').doc().set({ municipio });

  const save = () => {
    const searches = JSON.parse(sessionStorage.getItem('sessionSearches'));
    searches.forEach((search) => saveSearch(search));
  };

  const clear = () => sessionStorage.clear();

  return (
    <LoggedContext.Provider value={{ save, clear }}>
      <Header />
      <EuiFlexGroup gutterSize="none" className={classes.container}>
        {/* TODO: Export to SearchAsyncCombo component */}
        <EuiFlexItem grow={3} className={classes.currentSearch}>
          <EuiComboBox
            placeholder="Search a Barcelona's Municipality"
            async
            singleSelection={{ asPlainText: true }}
            options={options}
            selectedOptions={selectedOption}
            isLoading={isLoading}
            onChange={onChange}
            onSearchChange={onSearchChange}
            isClearable={false}
            className={classes.searchCombo}
          />
          <EuiSpacer size="s" />
          <EuiFlexItem grow={false}>
            {!_.isEmpty(currentMunicipio) && (
              <WeatherCard data={currentMunicipio} />
            )}
          </EuiFlexItem>
        </EuiFlexItem>
        <EuiFlexItem grow={7}>
          <WeatherLastSearches />
        </EuiFlexItem>
      </EuiFlexGroup>
    </LoggedContext.Provider>
  );
}

export default WeatherInfo;
