import React from "react";

function Status({ status, project }: { status: boolean; project: string }) {
  return (
    <div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div>{project}</div>
        <div className="mx-5">Etat : </div>
        <div
          // className="bg-primary"
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: status ? "green" : "red",
          }}
        />
      </div>
    </div>
  );
}

export default Status;
