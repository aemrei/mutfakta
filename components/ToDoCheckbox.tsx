import React from "react";

export enum ToDoState {
  NotStarted,
  InProgress,
  Done,
}

type ToDoCheckboxProps = {
  state: ToDoState;
  text: string;
  onChange: (state: ToDoState) => void;
};

export default function ToDoCheckbox(props: ToDoCheckboxProps) {
  const { state, onChange, text } = props;
  const stateUi: { state: ToDoState; ui: React.ReactChild }[] = [
    {
      state: ToDoState.NotStarted,
      ui: (
        <div
          className="inline-block h-6 w-6 cursor-pointer rounded-md bg-gray-400"
          onClick={(event) => onChange(ToDoState.InProgress)}
        />
      ),
    },
    {
      state: ToDoState.InProgress,
      ui: (
        <div
          className="inline-block h-6 w-6 cursor-pointer rounded-md bg-orange-600"
          onClick={(event) => onChange(ToDoState.Done)}
        />
      ),
    },
    {
      state: ToDoState.Done,
      ui: (
        <div
          className="inline-block h-6 w-6 cursor-pointer rounded-md bg-green-600"
          onClick={(event) => onChange(ToDoState.NotStarted)}
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
