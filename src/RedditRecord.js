import React from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom";

function HomeButton() {
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  return (
    <button 
      type="button"
      onClick={handleClick}
      style={{cursor: "pointer", width: "150px", margin: "20px auto"}}
    >
      To home page
    </button>
  );
}

const RedditRecord = () => {
  const { subreddit, id, link } = useParams()
  const [data, setData] = React.useState(null);
  const [comments, setComments] = React.useState(false)
  const handleClick = () => {
    setComments(!comments)
  }
  const loadData = async () => {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${id}/${link}.json`
      );
    const record = await response.json();
    setData(record);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  if (data === null) {
    return null
  }
  return (
    <>
      <HomeButton />
      <figure className="Record">
        <img 
          src={data[0].data.children[0].data.thumbnail}
          alt={data[0].data.children[0].data.title}
        />
        <figcaption>
          <h3>{data[0].data.children[0].data.title}</h3>
          <div>Created: {new Date(data[0].data.children[0].data.created*1000).toLocaleDateString()}</div>
          <div>Score {data[0].data.children[0].data.score}</div>
          <div>
            <span>Comments: {data[0].data.children[0].data.num_comments}</span>
          </div>
          <div>Posted by: {data[0].data.children[0].data.author} </div>
          <button 
            type="button" 
            onClick={handleClick} 
            style={{cursor: "pointer", width: "90%", marginTop: "15px"}}
          >
            View comments
          </button>
        </figcaption>
      </figure>
      {comments === false ? null :
        (data[1].data.children.length === 0) ? <div>No comments</div> :
        <div>
          {data[1].data.children.map((child) => (
            <div className="Comments" key={child.data.id}>
              <span style={{fontSize: "10px"}}>Posted by {child.data.author} {new Date(child.data.created*1000).toLocaleDateString()}</span>
              <div style={{padding: "10px 0px"}}>
                {child.data.body}
              </div>
            </div>
          ))}
      </div>
      }
      
    </>
  )
};

export default RedditRecord  