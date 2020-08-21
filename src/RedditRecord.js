import React from "react"
import { useParams } from "react-router-dom"

const RedditRecord = () => {
  const { permalink } = useParams()
  const [data, setData] = React.useState(null);
  let partUrl = ""
  for (let i = 0; i < permalink.length-1; i++) {
    partUrl += permalink[i]
  }
  console.log(partUrl);
  fetch(`https://www.reddit.com${partUrl}.json`)
    .then((res) => res.json())
    .then((record) => setData(record));
  
  console.log("data", data)
  return (
    <div>Ok</div>
  )
};

export default RedditRecord  