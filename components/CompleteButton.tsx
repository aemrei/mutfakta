import Finish from "@/svg/Finish";
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
      <div className="flex flex-row items-center rounded-md bg-green-800 px-3 py-1 text-center font-bold uppercase text-green-200 hover:bg-green-700">
        <Finish className="inline-block" />
        <span className="ml-2 font-['Wallpoet']">{text}</span>
      </div>
    </button>
  );
}

export default CompleteButton;
