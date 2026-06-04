export default function UIGrid(params) {
  return (
    <div className="grid grid-cols-2 gap-2 py-4 sm:gap-5 sm:py-8 md:py-10 lg:grid-cols-4">
      {params.children}
    </div>
  );
}
