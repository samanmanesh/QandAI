import React, { FunctionComponent, HTMLAttributes } from "react";

const NextIcon: FunctionComponent<HTMLAttributes<HTMLOrSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={21}
    fill="none"
    viewBox="0 0 29 21"
    {...props}
    // className="stroke-current " 
  >
    <g fill="#fff" clipPath="url(#a)">
      <path d="M3.535 11.289h22.478a.67.67 0 0 0 .616-.384.59.59 0 0 0-.145-.68l-7.998-7.477a.7.7 0 0 0-.942 0 .594.594 0 0 0 0 .881l6.86 6.414H3.534c-.368 0-.666.279-.666.623s.298.623.667.623M18.014 18.766a.7.7 0 0 0 .471-.183l5.333-4.984a.594.594 0 0 0 0-.881.7.7 0 0 0-.942 0l-5.333 4.984a.594.594 0 0 0 0 .881c.13.122.3.183.47.183" />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          d="M0 0H27.914V19.9386H0z"
          transform="translate(.123 .697)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default NextIcon;
