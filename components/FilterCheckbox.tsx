import React from "react";

export enum FilterState {
  Ignore,
  Include,
  Exclude,
}

type FilterCheckboxProps = {
  state: FilterState;
  text: string;
  onChange: (state: FilterState) => void;
};

export default function FilterCheckbox(props: FilterCheckboxProps) {
  const { state, onChange, text } = props;
  const stateUi: { state: FilterState; ui: React.ReactChild }[] = [
    {
      state: FilterState.Ignore,
      ui: (
        <div
          className="inline-block h-6 w-6 shrink-0 cursor-pointer rounded-md bg-gray-400"
          onClick={(event) => onChange(FilterState.Include)}
        />
      ),
    },
    {
      state: FilterState.Include,
      ui: (
        <div
          className="inline-block h-6 w-6 shrink-0 cursor-pointer rounded-md bg-green-600"
          onClick={(event) => onChange(FilterState.Exclude)}
        />
      ),
    },
    {
      state: FilterState.Exclude,
      ui: (
        <div
          className="inline-block h-6 w-6 shrink-0 cursor-pointer rounded-md bg-red-900"
          onClick={(event) => onChange(FilterState.Ignore)}
        />
      ),
    },
  ];
  const StateUiItem = stateUi.find((item) => item.state === state)?.ui;

  if (!StateUiItem) {
    return null;
  }

  return (
    <div className="flex align-middle">
      {StateUiItem} <span className="ml-1.5">{text}</span>
    </div>
  );
}
