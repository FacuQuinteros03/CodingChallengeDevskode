import React from 'react';

const LoadingBurger: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="rounded-lg p-8 flex flex-col items-center">
        <div className="animate-spin">
          <img src="/assets/burger.png" alt="Loading" className="w-16 h-16" />
        </div>
        <p className="mt-4 text-white ">Loading delicious foods...</p>
      </div>
    </div>
  );
};

export default LoadingBurger;
