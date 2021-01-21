import React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';

function Loader() {
  return (
    <SemanticLoader active inline='centered'>Loading...</SemanticLoader>
  );
}

export default Loader;
