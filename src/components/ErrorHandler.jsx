import React from "react";
import { Link } from "@reach/router";

const ErrorHandler = props => {
  return (
    <main className="error">
      <p>Oops...</p>
      <p>{props.error.status}</p>
      <p>{props.error.msg}</p>
      <Link to={`/`}>View Articles</Link>
    </main>
  );
};

export default ErrorHandler;
