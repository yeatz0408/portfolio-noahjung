import React from 'react';
import NavPane from '../component/NavPane';
import Pokemon from '../practice/pokemon/page/Pokemon';

const TestArea: React.FC = () => {
  return (
    <>
      <div>
        <NavPane />
        <Pokemon />
      </div>
    </>
  );
};

export default TestArea;
