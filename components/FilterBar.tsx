import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterConditions, filterSlice } from "store/FilterSlice";
import { MenuItem } from "store/MenuSlice";
import FilterButton from "./FilterButton";
import FilterCheckbox, { FilterState } from "./FilterCheckbox";

function FilterBar() {
  const [opened, setOpened] = React.useState(false);
  const dispatch = useDispatch();
  const filter = useSelector<any, FilterConditions>((state) => state.filter);

  return (
    <>
      <div
        className={classNames({
          "h-14": !opened,
          "h-72": opened,
        })}
      />
      <div
        className={classNames(
          "fixed bottom-0 left-0 right-0 flex flex-col bg-gradient-to-b from-orange-300 to-orange-400 pr-6 pt-4",
          {
            "justify-center": !opened,
            "justify-start": opened,
            "h-14": !opened,
            "h-72": opened,
          },
        )}
      >
        <div className="mx-4 my-2 flex h-10 w-full items-center justify-between rounded-lg border-2 bg-orange-200 py-1 pl-3 pr-1">
          #yemek #salata
          <FilterButton onClick={() => setOpened(!opened)} />
        </div>
        <div className="p-3">
          <FilterCheckbox
            state={(filter && filter["yemek"]) || FilterState.Ignore}
            text="Yemek"
            onChange={(value) => {
              dispatch(filterSlice.actions.setFilter({ key: "yemek", value }));
            }}
          />
        </div>
      </div>
    </>
  );
}

export default FilterBar;
