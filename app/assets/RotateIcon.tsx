import React, { FunctionComponent, HTMLAttributes } from "react";

const RotateIcon: FunctionComponent<HTMLAttributes<HTMLOrSVGElement>> = (
  props
) => (
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#FFEFEF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 4v6h6"
    />
    <path
      stroke="#FFEFEF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
    />
  </svg>
);
export default RotateIcon;
