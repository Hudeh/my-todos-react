import React from 'react';
import Div from './Div';

const SoloPage = ({ children }) => {



  return (
    <Div
      sx={{
        display: 'flex',
        minWidth: 0,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Div>
  );
};

export default SoloPage;
