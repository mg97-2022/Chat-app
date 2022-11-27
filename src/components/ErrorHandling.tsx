import React from "react";

type errorProps = {
  error: boolean;
  isLoading: boolean;
};

const ErrorHandling = ({ error, isLoading }: errorProps) => {
  return (
    <>
      {isLoading && !error && <p className="loading">loading...</p>}
      {!isLoading && error && (
        <div className="error">
          <span>something went wrong!</span>
          <span> please try again</span>
        </div>
      )}
    </>
  );
};

export default ErrorHandling;
