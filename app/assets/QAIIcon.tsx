import React, { FunctionComponent, HTMLAttributes } from "react";

const QAIcon: FunctionComponent<HTMLAttributes<HTMLOrSVGElement>> = (
  props
) => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width={53}
      height={58}
      fill="none"
      viewBox="0 0 53 58"
      {...props}
    >
      <path
        fill="#000"
        d="m37.349 41.91-1.23-.718-1.436 2.46 1.23.718zm8.332 8.158a1.425 1.425 0 0 0 1.435-2.46zm-9.768-5.698 9.768 5.698 1.435-2.46-9.767-5.698z"
      />
      <path
        stroke="#000"
        strokeWidth={3.10121}
        d="M43.956 28.081c-1.123 10.113 4.07 21.884-15.534 21.884-16.13.768-18.82-9.255-21.507-21.892-1.537-11.943 0-21.891 21.507-21.891 17.138 0 20.825 6.84 17.138 15.795-.79 2.034-1.197 2.441-1.604 6.104Z"
      />
      <path
        fill="#000"
        d="M14.92 38.608h-3.263l9.436-25.697h3.212l9.436 25.697h-3.263L22.8 16.977h-.2zm1.204-10.037h13.15v2.76h-13.15zM36.49 38.608V19.336h2.96v19.272zm1.505-22.484a2.1 2.1 0 0 1-1.493-.59 1.9 1.9 0 0 1-.614-1.418q0-.828.614-1.418.628-.59 1.493-.59.867 0 1.481.59.627.59.627 1.418t-.627 1.418q-.615.59-1.48.59"
      />
    </svg>
);
export default QAIcon;
