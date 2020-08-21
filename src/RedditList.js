import React from "react";
import { Link } from "react-router-dom";


const RedditItem = ({ thumbnail, created, num_comments, author, score, title, permalink }) => {
  return (
    <Link to={permalink}>
      <figure className="Item">
        <img className="record" src={thumbnail} alt={title} />
        <figcaption>
          <h3>{title}</h3>
          <div>Created: {new Date(created*1000).toLocaleDateString()}</div>
          <div>Score {score}</div>
          <div>Comments: {num_comments}</div>
          <div>Posted by: {author} </div>
        </figcaption>
      </figure>
    </Link>
  );
};

const RedditList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <RedditItem 
          key={item.data.id} 
          thumbnail={item.data.thumbnail}
          created={item.data.created}
          num_comments={item.data.num_comments}
          author={item.data.author}
          score={item.data.score}
          title={item.data.title}
          permalink={item.data.permalink}
        />
      ))}
    </div>
  );
};

export default RedditList
  