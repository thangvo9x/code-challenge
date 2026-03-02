// components/Skeleton.tsx
export default function Skeleton() {
    return (
      <div className="animate-pulse bg-white p-6 rounded-2xl shadow-lg w-[400px] space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    );
  }