import HistoryDate from "./components/HistoryDate/HistoryDate"
import Slider from "./components/Slider/Slider"
import SliderArrow from "./components/SliderArrow/SliderArrow"
import Year from "./components/Year/Year"

function App() {
  const handleCircleClick = () => {
    console.log("Клик по кругу!")
  }
return (
<div className="App">
  <div className="bg">
    <div className="grid">
        <div className="first"></div>
        <div className="second"></div>
        <div className="third"></div>
        <div className="fourth"></div>
    </div>
    <div className="circle" onClick={handleCircleClick}></div>
  </div>
  <HistoryDate/>
  <Year year_start={"2015"} year_end={"2022"}/>
  <SliderArrow slide_num="06" slide_len="06"/>
  <Slider/>
</div>
)}
export default App