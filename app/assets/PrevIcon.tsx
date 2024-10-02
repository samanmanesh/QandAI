import React, { FunctionComponent, HTMLAttributes } from "react";

const PrevIcon: FunctionComponent<HTMLAttributes<HTMLOrSVGElement>> = (
  props
) => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width={29}
      height={21}
      fill="none"
      viewBox="0 0 29 21"
      {...props}
    >
      <g fill="#fff" clipPath="url(#a)">
        <path d="m25.518 11.43-22.478.072a.67.67 0 0 1-.617-.382.59.59 0 0 1 .142-.68l7.974-7.503a.7.7 0 0 1 .943-.003.594.594 0 0 1 .002.881l-6.84 6.436 20.87-.068c.369-.001.667.277.668.621s-.295.624-.664.625M11.062 18.953a.7.7 0 0 1-.472-.181L5.24 13.804a.594.594 0 0 1-.003-.88.7.7 0 0 1 .942-.004l5.35 4.967a.594.594 0 0 1 .002.881.7.7 0 0 1-.47.185" />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="#fff"
            d="M0 0H27.914V19.9386H0z"
            transform="matrix(-1 .00324 .00324 1 28.895 .826)"
          />
        </clipPath>
      </defs>
    </svg>
);
export default PrevIcon;
