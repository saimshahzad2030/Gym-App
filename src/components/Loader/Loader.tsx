import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

type loaderType = {
  color?:string
  className?:string
  size?:number
}
function LoaderComp({ color, className, size }:loaderType) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        className ? className : ""
      }`}
    >
      <CircularProgress
        style={{ color: color ? color : "white" }}
        size={size ? size : 18}
      />
    </div>
  );
}

export default LoaderComp;
