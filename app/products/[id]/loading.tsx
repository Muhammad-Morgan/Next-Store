import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-[400px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-[350px]" />
        <Skeleton className="h-6 w-[300px]" />
      </div>
    </div>
  );
};

export default loading;
