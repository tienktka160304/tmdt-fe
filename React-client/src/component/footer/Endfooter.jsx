export default function Endfooter(params) {
  return (
    <>
      <div>
        <img src="/header-footer-gradient-bg.png" width="100%" alt="" />
      </div>
      <div className="bg-primary py-3">
        <div className="container">
          <div className="flex items-center justify-between text-textgreen">
            <div className="w-6/12 text-xs font-semibold sm:text-sm">
              {import.meta.env.VITE_APP_ADDRESS}
            </div>
            <div className="flex space-x-4">
              <img src="/momo.png" className="w-[50px] sm:w-[70px]" alt="" />
              <img src="/image.png" className="w-[50px] sm:w-[70px]" alt="" />
              <img
                src="/trustbadge_41.png"
                className="w-[50px] sm:w-[70px]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <img
          src="/header-footer-gradient-bg.png"
          width="100%"
          alt=""
          className="rotate-180"
        />
      </div>
    </>
  );
}
