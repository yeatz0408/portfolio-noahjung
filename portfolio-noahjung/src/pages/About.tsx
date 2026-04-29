import React from 'react';
import NavPane from '../component/NavPane';
import MessageWindow from '../component/MessageWindow';
import Footer from '../component/Footer';

interface TechStack {
  category: string;
  details: string;
}

interface GitLink {
  type: string;
  url: string;
}

interface DeploymentInfo {
  type: string;
  details: string;
}

const About: React.FC = () => {
  const specs: TechStack[] = [
    {
      category: 'frontend',
      details: 'React.ts, Zustand, Tailwind',
    },
    {
      category: 'backend',
      details: 'Spring Boot, Spring AI',
    },
    {
      category: 'database',
      details: 'PostgreSQL, Redis',
    },
    {
      category: 'LLM',
      details: 'Unperiodically changes',
    },
  ];

  const gitLinks: GitLink[] = [
    {
      type: 'frontend',
      url: 'https://github.com/yeatz0408/portfolio-noahjung-fe',
    },
    {
      type: 'backend',
      url: 'Private',
    },
  ];

  const deploymentInfo: DeploymentInfo[] = [
    {
      type: 'frontend deployment',
      details: 'Vercel',
    },
    {
      type: 'backend deployment',
      details: 'Oracle Cloud Infrastructure (OCI)',
    },
    {
      type: 'CI / CD',
      details: 'GitHub Actions pipeline for both frontend and backend',
    },
  ];

  return (
    <>
      <NavPane />
      <div className="w-full flex justify-center pt-10">
        <MessageWindow />
      </div>

      <div className="pt-10">
        <p className="mx-10 text-2xl sm:text-2xl text-gray-900 text-left pl-10">
          This website is a portfolio website of Noah Jung.
        </p>
      </div>
      <br></br>

      <section className="mt-10">
        <p className="mx-10 text-2xl sm:text-3xl font-bold text-gray-900 text-left pl-10">
          TechStack
        </p>
        <div className="overflow-hidden mx-10 my-6 rounded-xl border border-gray-200">
          <table className="w-full border-collapse bg-white">
            <tbody>
              {specs.map((item, ind) => (
                <tr
                  key={ind}
                  className="border-b last:border-b-0 border-gray-200 transition-colors hover:bg-gray-50"
                >
                  <th className="w-1/3 sm:w-1/4 bg-gray-50 px-6 py-6 font-bold text-gray-900 text-left align-top uppercase tracking-wider text-sm sm:text-base">
                    {item.category}
                  </th>
                  <td className="px-6 py-6 text-gray-700 text-left align-top leading-relaxed font-mono text-base sm:text-lg">
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <p className="mx-10 text-2xl sm:text-3xl font-bold text-gray-900 text-left pl-10">
          Git
        </p>
        <div className="overflow-hidden mx-10 my-6 rounded-xl border border-gray-200">
          <table className="w-full border-collapse bg-white">
            <tbody>
              {gitLinks.map((item, ind) => (
                <tr
                  key={ind}
                  className="border-b last:border-b-0 border-gray-200 transition-colors hover:bg-gray-50"
                >
                  <th className="w-1/3 sm:w-1/4 bg-gray-50 px-6 py-6 font-bold text-gray-900 text-left align-top uppercase tracking-wider text-sm sm:text-base">
                    {item.type}
                  </th>
                  <td className="px-6 py-6 text-gray-700 text-left align-top leading-relaxed font-mono text-base sm:text-lg">
                    {item.url}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <p className="mx-10 text-2xl sm:text-3xl font-bold text-gray-900 text-left pl-10">
          Release & Deployment
        </p>
        <div className="overflow-hidden mx-10 my-6 rounded-xl border border-gray-200">
          <table className="w-full border-collapse bg-white">
            <tbody>
              {deploymentInfo.map((item, ind) => (
                <tr
                  key={ind}
                  className="border-b last:border-b-0 border-gray-200 transition-colors hover:bg-gray-50"
                >
                  <th className="w-1/3 sm:w-1/4 bg-gray-50 px-6 py-6 font-bold text-gray-900 text-left align-top uppercase tracking-wider text-sm sm:text-base">
                    {item.type}
                  </th>
                  <td className="px-6 py-6 text-gray-700 text-left align-top leading-relaxed font-mono text-base sm:text-lg">
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
