import { useSelector } from "react-redux";

export default function LoadingOverlay() {
  const loadingCount = useSelector((state) => state.loading.loadingCount);

  if (loadingCount === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}
