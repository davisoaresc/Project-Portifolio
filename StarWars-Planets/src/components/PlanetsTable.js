import React, { useContext, useState, useEffect } from 'react';
import myContext from '../context/Context';

function PlanetsTable() {
  const { data, filters, setFilters } = useContext(myContext);
  const [dataFilter, setDataFilter] = useState([]);
  const [dropDownState, setDropDownState] = useState('population');
  const [getComparison, setGetComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [columns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

  useEffect(() => {
    if (data.length !== 0) {
      setDataFilter(data);
    }
  }, [data]);

  const filterName = ({ target }) => {
    setFilters({ ...filters, filterByName: { name: target.value } });
    setDataFilter(data
      .filter((planet) => planet.name.toLowerCase().includes(target.value)));
  };

  const dropDown = ({ target }) => {
    setDropDownState(target.value);
  };

  const inputNumber = ({ target }) => {
    setNumber(target.value);
  };

  const comparison = ({ target }) => {
    setGetComparison(target.value);
  };

  const buttonFilter = () => {
    setFilters({ ...filters,
      filterByNumericValues: [
        {
          column: dropDownState,
          comparison: getComparison,
          value: number },
      ] });
    const indexColumn = columns.indexOf(dropDownState);
    columns.splice(indexColumn, 1);
    if (getComparison === 'maior que') {
      setDataFilter(data
        .filter((planet) => Number(planet[dropDownState]) > Number(number)));
    } if (getComparison === 'menor que') {
      setDataFilter(data
        .filter((planet) => Number(planet[dropDownState]) < Number(number)));
    } if (getComparison === 'igual a') {
      setDataFilter(data
        .filter((planet) => Number(planet[dropDownState]) === Number(number)));
    }
  };

  return (
    <div>
      <h1>StarWars Planets</h1>
      <form className="form-inline">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Filtrar por nome"
            data-testid="name-filter"
            onChange={ filterName }
          />
        </div>
        <div className="form-group">
          <select
            data-testid="column-filter"
            id="dropdown"
            onChange={ dropDown }
            className="form-control"
          >
            {columns.map((item) => <option key={ item }>{item}</option>)}
          </select>
        </div>
        <div className="form-group">
          <select
            className="form-control"
            data-testid="comparison-filter"
            id="comparison"
            onChange={ comparison }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </div>
        <div className="form-group">
          <input
            data-testid="value-filter"
            value={ number }
            type="number"
            onChange={ inputNumber }
            className="form-control"
          />
        </div>
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ buttonFilter }
          className="btn btn-success"
        >
          Filter
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            dataFilter
              .map((planet, index) => (
                <tr key={ index }>
                  <td>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>{ planet.films }</td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default PlanetsTable;
// end
