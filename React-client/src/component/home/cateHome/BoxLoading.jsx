export default function BoxLoading(params) {
  return (
    <div className="mr-4">
      <div className="clip h-[140px] w-[140px] animate-pulse cursor-wait bg-loading align-middle opacity-50 sm:h-[150px] sm:w-[150px] lg:h-[160px] lg:w-[160px] xl:h-[190px] xl:w-[190px]"></div>

      <p className="animate-pulse text-center">
        <span className="inline-block min-h-[1em] w-4/12 cursor-wait bg-loading align-middle opacity-50"></span>
      </p>
      <p className="animate-pulse text-center">
        <span className="inline-block min-h-[1em] w-6/12 cursor-wait bg-loading align-middle opacity-50"></span>
      </p>
    </div>
  );
}
