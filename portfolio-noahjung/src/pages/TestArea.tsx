import React from 'react';
import { useEffect, useRef } from 'react';
import NavPane from '../component/NavPane';
import Quiz from '../practice/Quiz';
import Pokemon from '../practice/Pokemon';
import MessageWindow from '../component/MessageWindow';

const TestArea: React.FC = () => {
  return (
    <>
      <div>
        <NavPane />
        <Pokemon pokemonId={3} />
      </div>
    </>
  );
};

export default TestArea;
