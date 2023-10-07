const SkeletonProductCard = () => {
    return (
        <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden m-4 w-auto">
            <div className="h-40 bg-gray-300 ease-in-out animate-pulse"></div>
            <div className="p-4 min-h-[260px]">
                <div className="animate-pulse ease-linear space-y-2">
                    <div className="h-4 w-1/2 bg-gray-300"></div>
                    <div className="h-4 w-1/4 bg-gray-300"></div>
                    <div className="h-4 w-3/4 bg-gray-300"></div>
                    <div className="h-4 w-2/3 bg-gray-300"></div>
                </div>
                <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center space-x-2 animate-pulse">
                        <div className="h-8 w-16 bg-gray-300"></div>
                        <div className="h-8 w-16 bg-gray-300"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-20 bg-gray-300"></div>
                        <div className="h-10 w-20 bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SkeletonProductCard