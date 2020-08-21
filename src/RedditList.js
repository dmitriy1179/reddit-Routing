import React from "react";
import { Link } from "react-router-dom";


const RedditItem = ({ thumbnail, created, num_comments, author, score, title, permalink, subreddit, id }) => {
  let link = permalink.split("/")
  link = link[link.length-2]
  return (
    <Link to={`/r/${subreddit}/comments/${id}/${link}`}>
      <figure className="Item">
        <img src={thumbnail} alt={title} />
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
    <div className="ItemList">
      {items.map((item) => (
        <RedditItem key={item.data.id} {...item.data} />
      ))}
    </div>
  );
};

export default RedditList
  