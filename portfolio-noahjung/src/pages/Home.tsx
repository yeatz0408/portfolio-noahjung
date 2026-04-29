import React, { useEffect } from 'react';
import fuji from '../assets/img/fuji.jpg';
import ImageContainer from '../common/ImageContainer';
import TechCarousel from '../component/Carousel';
import type { SizedImageProps } from '../component/Carousel';
import NavPane from '../component/NavPane';
import MessageWindow from '../component/MessageWindow';
import { useUIStore } from '../store/useStore';
import Footer from '../component/Footer';

import java from '../assets/img/tech/java.jpeg';
import springboot from '../assets/img/tech/spring_boot.png';
import javascript from '../assets/img/tech/javascript.png';
import typescript from '../assets/img/tech/typescript.png';
import react from '../assets/img/tech/react.png';
import postgresql from '../assets/img/tech/postgresql.jpg';
import elasticsearch from '../assets/img/tech/elasticsearch.png';
import mybatis from '../assets/img/tech/mybatis.jpg';
import zustand from '../assets/img/tech/zustand.png';
import docker from '../assets/img/tech/docker.png';
import aws from '../assets/img/tech/aws.png';
import redis from '../assets/img/tech/redis.png';
import oci from '../assets/img/tech/oci.png';

const Home: React.FC = () => {
  const isNavPaneOpen = useUIStore((state) => state.isNavPaneOpen);
  const toggleIsNavPaneOpen = useUIStore((state) => state.toggleIsNavPaneOpen);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!isNavPaneOpen) {
        toggleIsNavPaneOpen();
      }
    }, 7000);
    return () => clearTimeout(timerId);
  }, []);

  const techImages: SizedImageProps[] = [
    { src: aws, width: 140, height: 100 },
    { src: oci, width: 130, height: 90 },
    { src: docker, width: 150, height: 90 },
    { src: java, width: 75, height: 100 },
    { src: springboot, width: 210, height: 90 },
    { src: javascript, width: 90, height: 90 },
    { src: typescript, width: 140, height: 80 },
    { src: react, width: 140, height: 90 },
    { src: postgresql, width: 130, height: 105 },
    { src: elasticsearch, width: 130, height: 90 },
    { src: redis, width: 130, height: 90 },
    { src: mybatis, width: 150, height: 90 },
    { src: zustand, width: 150, height: 90 },
  ];

  return (
    <div className="pt-10">
      <NavPane />
      {fadeInCSS}
      <h1 className="fadeIn-img">Noah Jung</h1>
      <br />
      <h2 className="fadeIn-img">Fullstack Web Developer</h2>
      <br />
      <div className="w-full flex justify-center">
        <ImageContainer src={fuji} size={450} />
      </div>
      <div className="fadeIn-img2 mx-20 mt-7.5">
        <TechCarousel sizedImagesProps={techImages} />
      </div>
      <MessageWindow />
      <Footer />
    </div>
  );
};

const fadeInCSS = (
  <style>
    {`
      .fadeIn-img {
        opacity: 0;
        animation: fadeIn 2s ease-in;
        animation-fill-mode: forwards;
      }

      .fadeIn-img2 {
        opacity: 0;
        animation: fadeIn 2s ease-in;
        animation-fill-mode: forwards;
        animation-delay: 3.5s;
      }

      @keyframes fadeIn {
        0%, 100% { opacity: 0; }
        100% { opacity: 1; }
      }
    `}
  </style>
);

export default Home;
