import React from "react";

function Test(props) {
  return (
    <>
      <h1>{props.name}</h1>
      <div
        style={{
          backgroundColor: "red",
          color: "white",
        }}
      >
        Salut je suis {props.name}
      </div>
    </>
  );
}

export default Test;
