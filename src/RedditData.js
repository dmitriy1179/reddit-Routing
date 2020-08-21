import React from "react";
import RedditList from "./RedditList"
import RedditFetch from "./RedditFetch"

const RedditData = () => {
  const [records, setRecords] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [limitsValue, setLimitsValue] = React.useState(10);
  const [categoryValue, setCategoryValue] = React.useState("reactjs");
  const [labelAfter, setLabelAfter] = React.useState(null);
  const [labelBefore, setLabelBefore] = React.useState(null);
  const [distCount, setDistCount] = React.useState(0);
  const [arrDistCount, setArrDistCount] = React.useState([])
  const changeLimits = (event) => {
    setLimitsValue(event.target.value);
  }
  const changeCategory = (event) => {
    setCategoryValue(event.target.value)
  }
  const getNextRedditData = async () => {
    setArrDistCount((arrDistCount) => arrDistCount.concat(distCount))
    setCount(arrDistCount.reduce((acc, curVal) => acc + curVal, 0));
   
    const data = await RedditFetch(categoryValue, limitsValue, count, labelAfter, null);
    console.log(data)
    setLabelAfter(data.after);
    setLabelBefore(data.before);
    setDistCount(data.dist)
    setRecords(data.children);
  }

  const getPrevRedditData = async () => {
    const data = await RedditFetch(categoryValue, arrDistCount[arrDistCount.length-1], count, null, labelBefore)
    setArrDistCount((arrDistCount) => arrDistCount.slice(0, arrDistCount.length-1));
    setCount(arrDistCount.reduce((acc, curVal) => acc + curVal, 0));
    console.log("countPrev", count);
    console.log("arrDistCount", arrDistCount);
    setLabelAfter(data.after);
    setLabelBefore(data.before);
    setDistCount(data.dist)
    setRecords(data.children);  
  }


  React.useEffect(() => {
    (async () => {
      setArrDistCount([]);
      setCount(0);
      const data = await RedditFetch(categoryValue, limitsValue, 0)
      console.log(data)
      setDistCount(data.dist)
      setRecords(data.children);
      setLabelAfter(data.after);
      setLabelBefore(data.before);

    })()
  }, [limitsValue, categoryValue]);
  console.log("arrDistCount", arrDistCount)

  console.log("countNext", count)

  return (
    <>
      <select value={limitsValue} onChange={changeLimits} name="Limits">
        <option key={5} value={5}>5</option>
        <option key={10} selectedvalue={10}>10</option>
        <option key={25} value={25}>25</option>
      </select>
      <select value={categoryValue} onChange={changeCategory} name="Category">
        <option key={"angular"} value={"angular"}>angular</option>
        <option key={"reactjs"} selectedvalue={"reactjs"}>reactjs</option>
        <option key={"php"} value={"php"}>php</option>
      </select>
      <button type="button" onClick={getPrevRedditData}>Prev</button>
      <button type="button" onClick={getNextRedditData}>Next</button>
      <section>
        <RedditList items={records} />
      </section>
    </>
    
  )
}

export default RedditData