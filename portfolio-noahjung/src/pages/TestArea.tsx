import React from 'react';
import { useEffect, useRef } from 'react';
import NavPane from '../component/NavPane';
import Quiz from '../practice/Quiz';
import Pokemon from '../practice/Pokemon';
import MessageWindow from '../component/MessageWindow';

const TestArea: React.FC = () => {
  const explorers = [
    { name: 'Yuri', age: 27, oxygen: 85, active: true },
    { name: 'Valentina', age: 26, oxygen: 100, active: true },
    { name: 'Buzz', age: 39, oxygen: 40, active: false },
    { name: 'Sally', age: 32, oxygen: 95, active: true },
  ];

  const names = explorers
    .sort((a, b) => a.age - b.age)
    .filter((e) => e.active)
    .map((e) => e.name);
  console.log(names);

  const filteredExplorers = explorers
    .sort((a, b) => a.age - b.age)
    .filter((e) => e.active);

  filteredExplorers.forEach((n) =>
    console.log(`Explorer ${n.name} has ${n.oxygen}%`)
  );

  const remainingOxygen = explorers.reduce((acc, cur) => acc + cur.oxygen, 0);
  console.log(remainingOxygen);

  const optimist = explorers.some((e) => e.oxygen < 50);
  console.log('optimist: ', optimist);

  const perfectionist = filteredExplorers.every((fe) => fe.oxygen > 50);
  console.log('perfectionist: ', perfectionist);

  return (
    <>
      <div>
        <NavPane />
        <Quiz />
        <Pokemon pokemonId={3} />
        {/* <MessageWindow /> */}
      </div>
    </>
  );
};

export default TestArea;
