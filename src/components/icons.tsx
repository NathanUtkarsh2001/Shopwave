import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 7.27C2 6.13 2.65 5.16 3.64 4.78C5.2 4.17 6.8 4.17 8.36 4.78C9.35 5.16 10 6.13 10 7.27V12" />
      <path d="M10 12C10 10.87 9.35 9.84 8.36 9.46C6.8 8.84 5.2 8.84 3.64 9.46C2.65 9.84 2 10.87 2 12" />
      <path d="M14 12c0 1.13.65 2.16 1.64 2.54C17.2 15.16 18.8 15.16 20.36 14.54C21.35 14.16 22 13.13 22 12V7.27" />
      <path d="M22 7.27C22 8.4 21.35 9.37 20.36 9.75C18.8 10.36 17.2 10.36 15.64 9.75C14.65 9.37 14 8.4 14 7.27" />
    </svg>
  ),
};
