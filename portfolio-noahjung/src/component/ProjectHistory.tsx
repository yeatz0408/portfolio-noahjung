export interface ProjectHistoryData {
  name: string;
  period: string;
  employer: string;
  scope: string;
  background: string;
  features?: string[];
}

interface ProjectHistoryProps {
  data: ProjectHistoryData[];
}

function ProjectHistory({ data }: ProjectHistoryProps) {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold px-10 mb-8">Project History</h2>
      <div className="space-y-12 m-10">
        {data.map((project) => (
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm sm:text-base border-collapse bg-white">
              <tbody>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th
                    colSpan={2}
                    className="px-6 py-5 text-left font-bold text-gray-900 text-xl tracking-tight"
                  >
                    {project.name}
                  </th>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="w-1/3 sm:w-1/5 bg-gray-50 px-6 py-4 font-bold text-gray-900 text-left align-top uppercase tracking-wider text-[11px] sm:text-xs">
                    Period
                  </th>
                  <td className="px-6 py-4 text-gray-700 text-left">
                    {project.period}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-6 py-4 font-bold text-gray-900 text-left align-top uppercase tracking-wider text-[11px] sm:text-xs">
                    Employer
                  </th>
                  <td className="px-6 py-4 text-gray-700 text-left">
                    {project.employer}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-6 py-4 font-bold text-gray-900 text-left align-top uppercase tracking-wider text-[11px] sm:text-xs">
                    Scope
                  </th>
                  <td className="px-6 py-4 text-gray-700 text-left">
                    {project.scope}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 px-6 py-4 font-bold text-gray-900 text-left align-top uppercase tracking-wider text-[11px] sm:text-xs">
                    Background
                  </th>
                  <td className="px-6 py-4 text-gray-700 text-left">
                    {project.background}
                  </td>
                </tr>
                {project.features && (
                  <tr>
                    <th className="bg-gray-50 px-6 py-4 font-bold text-gray-900 text-left align-top uppercase tracking-wider text-[11px] sm:text-xs">
                      Features
                    </th>
                    <td className="px-6 py-4 text-gray-700 text-left">
                      <ul className="list-disc list-inside space-y-1">
                        {project.features.map((feature) => (
                          <li>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectHistory;
