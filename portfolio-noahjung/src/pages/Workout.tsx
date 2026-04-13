import React from 'react';
import NavPane from '../component/NavPane';
import MessageWindow from '../component/MessageWindow';

import gymPic from '../assets/img/workout.jpg';
import military from '../assets/img/military.jpg';
import ImageContainer from '../common/ImageContainer';

interface FitnessMetric {
  category: string;
  details: string;
}

const Workout: React.FC = () => {
  const fitnessMetrics: FitnessMetric[] = [
    {
      category: 'Personal Records',
      details: 'Deadlift: 170kg | Squat: 150kg | Bench Press: 120kg',
    },
    {
      category: 'Caloric Intake',
      details:
        'Targeting 2200+ kcal daily to sustain energy for high-level cognitive and physical performance.',
    },
    {
      category: 'Macronutrients',
      details:
        '120g+ Protein, 250g+ Carbohydrates, balanced with high-quality healthy fats.',
    },
    {
      category: 'Core Focus',
      details:
        'Compound lifting, muscle group mechanics, and strict routine adherence.',
    },
  ];

  return (
    <>
      <NavPane />
      <div className="w-full flex justify-center pt-10">
        <MessageWindow />
      </div>
      <div className="pt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Noah Jung
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wider text-sm">
            Software Engineer & Fitness Athlete
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <ImageContainer src={gymPic} size={450} />
      </div>

      <section className="mx-10 mt-15 space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed">
        <div className="pl-6">
          <p>
            Noah brings the same rigorous discipline to physical fitness as he
            does to software engineering. Originating from his military service,
            his commitment to physical excellence is an integral part of his
            daily life, providing a foundation for his intense development work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 pt-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-2">
              Daily Routine
            </h3>
            <p className="mb-4">
              Maintains a strict <strong>5:00 AM wake-up</strong> schedule. This
              allows for dedicated hours of algorithm study and an intensive
              workout session before the standard workday even begins.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-2">
              Training Philosophy
            </h3>
            <p>
              Treats fitness with an engineering mindset. He leverages a deep
              understanding of <strong>muscle group mechanics</strong> and{' '}
              <strong>nutritional science</strong> to optimize recovery,
              strength gains, and overall efficiency.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="mx-10 text-xl font-bold text-gray-900 dark:text-gray-100">
          Metrics & Nutrition
        </h2>
        <div className="overflow-hidden mx-10 my-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm sm:text-base border-collapse bg-white dark:bg-gray-900">
            <tbody>
              {fitnessMetrics.map((metric: FitnessMetric, ind: number) => (
                <tr
                  key={`${ind}-${metric.category}`}
                  className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <th className="w-1/4 sm:w-1/5 bg-gray-50 dark:bg-gray-800/50 px-4 py-4 font-bold text-gray-900 dark:text-gray-100 text-left align-top uppercase tracking-wider text-[11px] sm:text-xs">
                    {metric.category}
                  </th>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {metric.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center py-10">
          <img
            src={military}
            className="w-1/2 h-auto rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.5)] border border-white/20"
          />
        </div>
      </section>
    </>
  );
};

export default Workout;
