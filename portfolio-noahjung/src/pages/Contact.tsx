import MessageWindow from '../component/MessageWindow';
import NavPane from '../component/NavPane';
import ParticleText from '../component/ParticleText';

const Contact = () => {
  return (
    <div>
      <NavPane />
      <MessageWindow />
      <div className="flex">
        <ParticleText text={'NOAHJUNGKR0408@GMAIL.COM'} />
      </div>
    </div>
  );
};

export default Contact;
