function Placeholder() {
  return (
    <div className="bg-white rounded-sm px-4 py-3 flex flex-col animate-pulse">
      <div className="space-y-1 flex-1">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { Placeholder };
