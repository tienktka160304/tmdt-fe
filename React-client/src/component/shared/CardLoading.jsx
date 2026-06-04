export default function CardLoading(params) {
  return (
    <div
      className="max-w-xs rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
      aria-hidden="true"
    >
      <div className="h-52 animate-pulse cursor-wait overflow-hidden rounded-t-lg bg-loading align-middle opacity-50"></div>
      <div className="p-6">
        <h5 className="mb-2 animate-pulse text-xl font-medium">
          <span className="inline-block min-h-[1em] w-6/12 flex-auto cursor-wait bg-loading align-middle opacity-50"></span>
        </h5>
        <p className="mb-4 animate-pulse">
          <span className="inline-block min-h-[1em] w-7/12 flex-auto cursor-wait bg-loading align-middle opacity-50"></span>
          <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-loading align-middle opacity-50"></span>
          <span className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-loading align-middle opacity-50"></span>
          <span className="inline-block min-h-[1em] w-6/12 flex-auto cursor-wait bg-loading align-middle opacity-50"></span>
          <span className="inline-block min-h-[1em] w-8/12 flex-auto cursor-wait bg-loading align-middle opacity-50"></span>
        </p>
      </div>
    </div>
  );
}
