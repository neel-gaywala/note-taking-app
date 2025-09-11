import Skeleton from "./Skeleton";

const NoteCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <Skeleton className="h-6 mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Skeleton className="h-3 w-20" />
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default NoteCardSkeleton;