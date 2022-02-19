import React from "react";
import NextLink from "next/link";

type BigButtonProps = {
  children: React.ReactNode;
  icon: string;
  href: string;
  onClick: () => void;
};

function BigButton({ children, icon, href, onClick }: BigButtonProps) {
  return (
    <NextLink href={href} passHref>
      <a
        className="sm:1/2 relative ml-8 mt-5 flex h-16 w-2/3 cursor-pointer items-center justify-center rounded-r-lg bg-orange-700 p-3 font-sans text-2xl tracking-widest hover:bg-orange-600 md:w-1/3 lg:w-1/4"
        onClick={() => onClick()}
      >
        <div
          className="absolute top-0 -left-8 h-16 w-16 rounded-full border-2 border-orange-300 bg-orange-900 bg-cover"
          style={{ backgroundImage: `url('${icon}')` }}
        ></div>
        <div className="text-orange-200">{children}</div>
      </a>
    </NextLink>
  );
}

export default BigButton;
