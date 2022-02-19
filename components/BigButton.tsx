import React from "react";

function BigButton({ children, ...props }) {
  return (
    <div className="w-1/2 md:w-1/3 lg:w-1/4 h-16 bg-violet-700 p-3 rounded-r-lg relative ml-8 mt-5 flex justify-center items-center text-2xl font-sans tracking-widest cursor-pointer">
      <div className="absolute top-0 -left-8 h-16 w-16 bg-violet-900 rounded-full border-2 border-violet-300"></div>
      <div className="text-violet-200">Ana öğün</div>
    </div>
  );
}

export default BigButton;
