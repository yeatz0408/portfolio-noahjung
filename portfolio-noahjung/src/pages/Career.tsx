import { useMemo } from "react"
import NavPane from "../component/NavPane"
import Carousel from "../component/Carousel"
import type { SizedTextProps } from "../component/Carousel"
import { DEV_START_DATE } from "../assets/constant/PersonalInfo"

interface ExperiencedTech {
    category: string
    techs: string
}

const Career = () => {
    const today = new Date()
    const devStartDate = new Date(DEV_START_DATE)
    const numOfMonths = (today.getFullYear() - devStartDate.getFullYear()) * 12 + (today.getMonth() - devStartDate.getMonth())
    const devExpYear = useMemo<string>(() => {
        if (numOfMonths < 36) return String(3)
        const years = Math.trunc(numOfMonths / 12)
        if (numOfMonths % 12 >= 5 && numOfMonths % 12 <= 9) {
            return String(years) + ".5"
        } else if (numOfMonths % 12 >= 10) {
            return String(years + 1)
        }
        return String(years)
    }, [numOfMonths])

    const careerSummaryTexts: SizedTextProps[] = [
        {
            topText: "JLPT",
            topTextSize: 20,
            mainText: "N1",
            mainTextSize: 90,
            subText: "",
            subTextSize: 0,
            verticalGap: 15,
            color: "#f59e0b"
        },
        {
            topText: "TOEIC",
            topTextSize: 20,
            mainText: "985",
            mainTextSize: 80,
            subText: "pts",
            subTextSize: 25,
            verticalGap: 15,
            color: "#10b981"
        },
        {
            topText: "DEVELOPMENT",
            topTextSize: 14,
            mainText: devExpYear,
            mainTextSize: 85,
            subText: "YEARS",
            subTextSize: 20,
            verticalGap: 15,
            color: "red"
        },
        {
            topText: "Designed & implemented",
            topTextSize: 14,
            mainText: "500+",
            mainTextSize: 80,
            subText: "APIs",
            subTextSize: 20,
            verticalGap: 25,
            color: "#ec4899"
        },
        {
            topText: "Designed & implemented",
            topTextSize: 14,
            mainText: "20",
            mainTextSize: 85,
            subText: "SCREENS",
            subTextSize: 20,
            verticalGap: 25,
            color: "#0ea5e9"
        },
        {
            topText: "VERSATILITY",
            topTextSize: 14,
            mainText: "50",
            mainTextSize: 85,
            subText: "LIBS",
            subTextSize: 20,
            verticalGap: 20,
            color: "#8b5cf6"
        }
    ];

    const experiencedTechs : ExperiencedTech[] = [
        {category: "Languages", techs: "Java, Python, JavaScript, TypeScript, VBA, HTML, CSS"},
        {category: "Backend Frameworks", techs: "Spring Boot, Spring DevTool, Spring Security, Spring AI, Spring REST, FastAPI"},
        {category: "Frontend Frameworks", techs: "React, Zustand, React-router-dom, MUI (Material UI), Bootstrap 5, CKEditor5"},
        {category: "Data Storage", techs: "PostgreSQL, MySQL, MicrosoftSQL, ElasticSearch, Redis, ChromaDB"},
        {category: "Data Access Tools", techs: "MyBatis, JpaRepository, JDBC"},
        {category: "AI related", techs: "LangChain, OpenAI API, Ollama, OCR Tesseract Engine, Apache Tika"},
        {category: "Infra & protocols", techs: "Docker, HTTP, REST API, OAuth 2.0, OpenLdap, Google Drive API, Microsoft Graph API"}
    ]

    return (<>
        <NavPane />
        <div className="pt-10">
            <Carousel sizedTextProps={careerSummaryTexts} />
        </div>
        <section className="mx-10 mt-15 space-y-8 text-gray-800 dark:text-gray-200 leading-relaxed">
            <div className="border-l-4 border-amber-500 pl-6">
                <p>
                    Noah Jung is a full-stack web developer with experience in both backend and frontend technologies.
                    He primarily uses <strong>Java</strong> and <strong>Spring Boot</strong> for backend development, 
                    and <strong>TypeScript</strong> with <strong>React</strong> for frontend development. 
                    He has mainly worked with <strong>PostgreSQL</strong> as his database, 
                    and also has some experience with <strong>Elasticsearch</strong>.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-2">Experience</h3>
                    <p className="mb-4">
                        He worked for one year at <strong>RSP Corp</strong> in Tokyo, contributing to a B2B search engine. 
                        Following this, he joined <strong>EBA Technologies</strong>, applying his full-stack expertise 
                        to a tire manufacturing and sales management system.
                    </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-2">Scope</h3>
                    <p>
                        Involved in all stages of development—from <strong>requirement definition</strong> to <strong>design</strong> and <strong>implementation</strong>. 
                        These roles have provided deep exposure to a variety of database technologies, frameworks, and libraries.
                    </p>
                </div>
            </div>
        </section>
        <section className="mt-20">
            <h2>Experienced Technologies</h2>
            <div className="overflow-hidden mx-10 my-10 rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm sm:text-base border-collapse bg-white dark:bg-gray-900">
                    <tbody>
                        {experiencedTechs.map((tech: ExperiencedTech, ind: number) => (
                            <tr 
                                key={`${ind}-${tech.category}`}
                                className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                                <th className="w-1/4 sm:w-1/5 bg-gray-50 dark:bg-gray-800/50 px-4 py-4 font-bold text-gray-900 dark:text-gray-100 text-left align-top uppercase tracking-wider text-[11px] sm:text-xs">
                                    {tech.category}
                                </th>
                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {tech.techs}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    </>)
}

export default Career