import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const ResponseDisplay: React.FC = () => {
  const { isLoading, error, data, count, lastModified } = useSelector(
    (state: RootState) => state.response
  );

  return (
    <div>
      <p>Count: {count}</p>
      {!isLoading && error && <p>Error: {error}</p>}
      {lastModified && <p>Last modified: {lastModified}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && <p>{data}</p>}
    </div>
  );
};

export default ResponseDisplay;
