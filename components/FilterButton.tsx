import Filter from "@/svg/Filter";
import React from "react";

type FilterButtonProps = {
  className?: string;
  onClick?: () => void;
};

function FilterButton({ onClick, className }: FilterButtonProps) {
  return (
    <button
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
      }}
    >
      <div className="">
        <Filter className="inline-block" />
      </div>
    </button>
  );
}

export default FilterButton;
