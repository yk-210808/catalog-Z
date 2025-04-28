import React from 'react';
import ProviderTree from './src/providers/ProviderTree';

export const wrapRootElement = ({ element }) => {
  return <ProviderTree>{element}</ProviderTree>;
};
