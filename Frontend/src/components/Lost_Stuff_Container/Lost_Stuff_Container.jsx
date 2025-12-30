import React from "react";

const Lost_Stuff_Container = ({
    itemName,
    location,
    imageUrl,
    description,
    reportType,
}) => {
    return (
        <div className="antialiased text-gray-900">
            <div className="p-4 flex items-center justify-center">

                {/* CARD */}
                <div
                    className="bg-gray-200 rounded-lg shadow-2xl
                     xl:w-80 lg:w-72 md:w-64 sm:w-1/2
                     h-80 flex flex-col
                     group transition-transform duration-300 hover:-translate-y-2"
                >

                    {/* IMAGE */}
                    <div className="h-36 w-full overflow-hidden shrink-0">
                        {imageUrl && (
                            <img
                                className="h-full w-full object-cover
                           transition-transform duration-300 group-hover:scale-110"
                                src={imageUrl}
                                alt={itemName}
                            />
                        )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 flex flex-col flex-1 group-hover:bg-gray-700 transition-colors overflow-y-auto scrollbar-thin">

                        <span className="text-xs uppercase tracking-wide text-gray-500 group-hover:text-gray-300">
                            {reportType}
                        </span>

                        <h3 className="text-lg font-semibold mt-1 group-hover:text-white">
                            {itemName}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-300">
                            📍 {location}
                        </p>

                        {/* 🔥 SCROLLABLE DESCRIPTION (FIXED HEIGHT) */}
                        <div className="mt-2 max-h-[90px]  pr-2 ">
                            <p className="text-sm text-gray-500 group-hover:text-white">
                                {description}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lost_Stuff_Container;
