import Knife from "@/svg/Knife";
import React from "react";

type CompleteButtonProps = {
  className?: string;
  onClick: () => void;
  text: string;
};

function CompleteButton({ text, onClick, className }: CompleteButtonProps) {
  return (
    <button
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <div className="flex flex-row items-center rounded-md bg-green-700 px-1 pl-2 pr-0 font-bold text-green-200 hover:bg-green-600">
        <span className="ml-2 font-['Wallpoet']">{text}</span>
        <Knife className="inline-block" />
      </div>
    </button>
  );
}

export default CompleteButton;
