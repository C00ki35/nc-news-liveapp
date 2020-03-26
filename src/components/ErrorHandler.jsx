import React from "react";

const ErrorHandler = props => {
  return (
    <main className="error">
      <p>Oops...</p>
      <p>Status:{props.error.status}</p>
      <p></p>

      <p>{props.error.msg}</p>
    </main>
  );
};

export default ErrorHandler;
