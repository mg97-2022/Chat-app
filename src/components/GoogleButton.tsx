import React from "react";

const GoogleButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="google">
      <button onClick={onClick} type="button">
        login with google
      </button>
    </div>
  );
};

export default GoogleButton;
