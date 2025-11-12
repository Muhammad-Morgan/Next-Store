import { Skeleton } from "../ui/skeleton";

const LoadingTable = ({ row = 5 }: { row?: number }) => {
  const tableRow = Array.from({ length: row }, (_, index) => {
    return (
      <div className="mb-4" key={index}>
        <Skeleton className="w-full h-8 rounded " />
      </div>
    );
  });
  return <>{tableRow}</>;
};

export default LoadingTable;
