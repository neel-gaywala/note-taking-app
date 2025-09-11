interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-600 rounded";
  const classes = className ? `${baseClasses} ${className}` : baseClasses;
  
  return (
    <div
      className={classes}
      {...props}
    />
  );
};

export default Skeleton;