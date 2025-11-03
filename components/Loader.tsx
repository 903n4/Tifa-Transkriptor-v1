
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-400"></div>
      <p className="text-lg text-teal-300 font-semibold">Processing Audio...</p>
      <p className="text-sm text-gray-400">This may take a few moments.</p>
    </div>
  );
};

export default Loader;
