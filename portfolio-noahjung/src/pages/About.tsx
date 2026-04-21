import React from 'react';
import NavPane from '../component/NavPane';
import MessageWindow from '../component/MessageWindow';
import Footer from '../component/footer';

const About: React.FC = () => {
  return (
    <>
      <NavPane />
      <MessageWindow />
      <h1>About this Website</h1>
      <Footer />
    </>
  );
};

export default About;
