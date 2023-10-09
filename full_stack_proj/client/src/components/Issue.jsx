import React from "react";

export default function Issue(props) {
  const { title, description, imgUrl, _id } = props;
  return (
    <div className="issue_info">
      <h1> {title} </h1>
      <h3> {description} </h3>
      <img src={imgUrl} alt={imgUrl} width={200} />
    </div>
  )
}
