import React from "react";

const CommonProgress = ({ progress }: progress) => {
  return (
    <div className="progressar">
      <progress
        className="progress progress-success w-56"
        value={progress}
        max="100"
      ></progress>
    </div>
  );
};

export default CommonProgress;
