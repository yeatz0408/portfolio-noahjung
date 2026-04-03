import NavPane from "../component/NavPane"
import Carousel from "../component/Carousel"
import type { SizedTextProps } from "../component/Carousel"

const Career = () => {

    const careerSummaryTexts: SizedTextProps[] = [
        { topText: "JLPT", topTextSize: 30, mainText: "N1", mainTextSize: 50, subText: "", subTextSize: 20, color: "black" },
        { topText: "TOEIC", topTextSize: 30, mainText: "985", mainTextSize: 50, subText: "", subTextSize: 20, color: "black" },
        { topText: "development experience", topTextSize: 30, mainText: "3", mainTextSize: 50, subText: "years", subTextSize: 20, color: "black" },
        { topText: "designed & implemented", topTextSize: 30, mainText: "500", mainTextSize: 50, subText: "APIs", subTextSize: 20, color: "black" },
        { topText: "designed & implemented", topTextSize: 30, mainText: "20", mainTextSize: 50, subText: "Screens", subTextSize: 20, color: "black" },
        { topText: "Worked with over", topTextSize: 30, mainText: "50", mainTextSize: 50, subText: "libraries", subTextSize: 20, color: "black" },
        { topText: "designed & implemented", topTextSize: 30, mainText: "20", mainTextSize: 50, subText: "Screens", subTextSize: 20, color: "black" },
        { topText: "designed & implemented", topTextSize: 30, mainText: "20", mainTextSize: 50, subText: "Screens", subTextSize: 20, color: "black" },
        { topText: "designed & implemented", topTextSize: 30, mainText: "20", mainTextSize: 50, subText: "Screens", subTextSize: 20, color: "black" },
    ]

    return (<>
        <NavPane />
        <div className="pt-10">
            <Carousel sizedTextProps={careerSummaryTexts} />
        </div>
    </>)
}

export default Career