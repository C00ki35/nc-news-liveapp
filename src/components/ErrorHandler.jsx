import React from "react";

const ErrorHandler = props => {
  return (
    <main className="error">
      <p>
        {props.message === ""
          ? "Sorry, there has been a server error"
          : props.message}
      </p>
    </main>
  );
};

export default ErrorHandler;
