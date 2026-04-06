import { useMemo } from "react"
import NavPane from "../component/NavPane"
import Carousel from "../component/Carousel"
import type { SizedTextProps } from "../component/Carousel"
import { DEV_START_DATE } from "../assets/constant/PersonalInfo"

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

    return (<>
        <NavPane />
        <div className="pt-10">
            <Carousel sizedTextProps={careerSummaryTexts} />
        </div>
    </>)
}

export default Career