import NavPane from "../component/NavPane"
import Carousel from "../component/Carousel"
import type { SizedTextProps } from "../component/Carousel"

const Career = () => {

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
            mainText: "3",
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