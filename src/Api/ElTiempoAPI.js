const API_URL = 'https://www.el-tiempo.net/api/json/v2';

const ElTiempoAPI = {
  getMunicipiosBarcelona: () =>
    fetch(`${API_URL}/provincias/08/municipios`).then((res) => res.json()),

  getMunicipioData: (codprov, id) =>
    fetch(`${API_URL}/provincias/${codprov}/municipios/${id}`).then((res) =>
      res.json(),
    ),
};

export default ElTiempoAPI;
