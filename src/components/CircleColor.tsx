import type { HTMLAttributes } from "react";

interface Iprops extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color , ...rest }: Iprops) => {
  return (
    <>
      <span
        className={`rounded-full  w-4 h-4 inline-block cursor-pointer`}
        style={{ backgroundColor: color }}
        {...rest}
      ></span>
    </>
  );
};

export default CircleColor;
