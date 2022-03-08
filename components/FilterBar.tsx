import { filterSections } from "@/utils/filtering";
import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterConditions, filterSlice } from "store/FilterSlice";
import { MenuItem } from "store/MenuSlice";
import FilterButton from "./FilterButton";
import FilterCheckbox, { FilterState } from "./FilterCheckbox";

type FilterItemProps = {
  id: string;
  text: string;
};

function FilterItem({ id, text }: FilterItemProps) {
  const dispatch = useDispatch();
  const state =
    useSelector<any, FilterState>((state) => state.filter.tags[id]) || FilterState.Ignore;
  return (
    <FilterCheckbox
      state={state}
      text={text}
      onChange={(value) => {
        dispatch(filterSlice.actions.setFilter({ id, value }));
      }}
    />
  );
}

function SearchBox() {
  const dispatch = useDispatch();
  const searchQuery = useSelector<any, string>((state) => state.filter.searchQuery);
  return (
    <input
      className="flex-grow bg-transparent outline-none"
      value={searchQuery}
      onChange={(event) => dispatch(filterSlice.actions.setSearchQuery(event.target.value))}
    />
  );
}

function FilterBar() {
  const [opened, setOpened] = React.useState(false);

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
          "fixed bottom-0 left-0 right-0 flex flex-col bg-gradient-to-b from-orange-300 to-orange-400 pr-6 pt-1",
          {
            "justify-center": !opened,
            "justify-start": opened,
            "h-14": !opened,
            "h-72": opened,
          },
        )}
      >
        <div className="mx-4 my-2 flex h-10 w-full items-center justify-between rounded-lg border-2 bg-orange-200 py-1 pl-3 pr-1">
          <SearchBox />
          <FilterButton onClick={() => setOpened(!opened)} />
        </div>
        <div className={classNames("overflow-x-scroll px-3", { hidden: !opened })}>
          {filterSections.map((section) => (
            <div key={section.title} className="mb-4 flex flex-col">
              <h3 className="mt-3 font-bold">{section.title}</h3>
              <div className="mt-1 flex gap-3 overflow-y-scroll ">
                {section.items.map((item) => (
                  <FilterItem key={item.id} id={item.id} text={item.text} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FilterBar;
