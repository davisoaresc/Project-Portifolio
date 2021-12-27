import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './Context';
import fetchPlanets from '../services/fetchApi';

const NUMBER_ZERO = 0;

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ filterByName: { name: '' },
    filterByNumericValues: [
      { column: '',
        comparison: '',
        value: NUMBER_ZERO,
      },
    ] });

  const handleFetchPlanets = async () => {
    const planetsList = await fetchPlanets();
    setData(planetsList.results);
  };

  useEffect(() => {
    handleFetchPlanets();
  }, []);

  const contextValue = {
    data,
    filters,
    setFilters,
  };

  return (
    <myContext.Provider value={ contextValue }>
      { children }
    </myContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
