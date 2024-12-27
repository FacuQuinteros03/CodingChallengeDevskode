import React from 'react';
import { BsXCircle } from 'react-icons/bs';

const NoResultsFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
      <BsXCircle size={100} className="text-gray-700" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">No results</h2>
      <p className="text-gray-500 text-center">
        It seems we can't find any products that match your search.
        <br />
        ¿How about you try another one?
      </p>
    </div>
  );
};

export default NoResultsFound;
