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
  const changeLimits = (event) => {
    setLimitsValue(event.target.value);
  }
  const changeCategory = (event) => {
    setCategoryValue(event.target.value)
  }
  const getNextRedditData = async () => {
    const data = await RedditFetch(categoryValue, limitsValue, count, labelAfter, null);
    setCount((count) => count + +limitsValue);
    setLabelAfter(data.after);
    setLabelBefore(data.before);
    setRecords(data.children);
  }
  const getPrevRedditData = async () => {
    const data = await RedditFetch(categoryValue, limitsValue, count, null, labelBefore)
    setLabelAfter(data.after);
    setLabelBefore(data.before);
    setRecords(data.children);
    setCount((count) => count - +limitsValue);
    if (labelBefore === null) {
      setCount(0)
    }
  
  }
  React.useEffect(() => {
    (async () => {
      setCount(0);
      const data = await RedditFetch(categoryValue, limitsValue, 0)
      setRecords(data.children);
      setLabelAfter(data.after);
      setLabelBefore(data.before);

    })()
  }, [limitsValue, categoryValue]);
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