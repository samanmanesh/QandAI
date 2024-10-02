import React, { FunctionComponent, HTMLAttributes } from "react";

const ReturnIcon: FunctionComponent<HTMLAttributes<HTMLOrSVGElement>> = (
  props
) => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 14 4 9l5-5"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 20v-7a4 4 0 0 0-4-4H4"
      />
    </svg>
);
export default ReturnIcon;
