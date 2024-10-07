import React, { FunctionComponent, HTMLAttributes } from "react";

const ErrorIcon: FunctionComponent<HTMLAttributes<HTMLOrSVGElement>> = (
  props
) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={24}
  height={24}
  viewBox="0 0 24 24"
  className=""
  {...props}
>
  <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6m-3 16h-2v-2h2zm0-4h-2V6h2z" />
</svg>
)
export default ErrorIcon;
