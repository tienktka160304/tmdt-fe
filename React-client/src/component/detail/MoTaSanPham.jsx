import { useEffect, useRef, useState } from "react";
export default function MoTaSanPham({ mota, attribute }) {
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight >= 500);
    }
  }, [mota]);

  return (
    <>
      <section className="container py-8">
        <div
          data-aos="fade-right"
          data-aos-delay="400"
          className="flex flex-col-reverse lg:flex-row lg:space-x-3 xl:space-x-10"
        >
          <div className="w-full lg:w-8/12">
            <div
              className={`relative h-auto overflow-hidden rounded-lg border-2 border-primary ${
                expanded ? "" : "max-h-[500px]"
              }`}
            >
              <div className="p-5 text-xs shadow md:text-base xl:p-10">
                <h4 className="whitespace-nowrap border-b-2 px-10 pb-2 text-center text-lg font-bold text-primary md:text-2xl">
                  Mô tả sản phẩm
                </h4>
                <hr />

                <div className="py-8" ref={contentRef}>
                  {mota == null ? (
                    "Chưa có mô tả"
                  ) : (
                    <div className="post-content leading-8">
                      <div dangerouslySetInnerHTML={{ __html: mota }} />
                    </div>
                  )}
                </div>
              </div>

              {isOverflowing && (
                <div
                  className="absolute bottom-0 flex h-16 w-full cursor-pointer items-center justify-center bg-gradient-to-t from-green-800/80 to-transparent font-semibold text-white backdrop-blur-[3px]"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  <span className="font-bold text-green-100 drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]">
                    {expanded ? "Thu gọn" : "Xem Thêm"}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/*  */}
          <div
            data-aos="fade-up-left"
            data-aos-delay="400"
            className="w-full pb-8 lg:w-4/12 xl:pb-0"
          >
            <div className="overflow-hidden rounded-lg border-2 border-primary shadow xl:border-4">
              <h4 className="bg-primary p-2 text-center text-base font-bold leading-7 text-white md:text-lg">
                Thông số kỹ thuật
              </h4>
              <table className="w-full text-xs md:text-sm">
                <tbody className="[&>*:nth-child(odd)]:bg-secondary/20">
                  {attribute.length > 0 ? (
                    attribute.map((item) => (
                      <tr key={item.id}>
                        <td className="w-36 px-4 py-[10px] font-semibold text-gray-800">
                          {item.key}
                        </td>
                        <td className="px-4 py-[10px] text-right font-semibold text-gray-800">
                          {item.value}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center text-base font-medium">
                      <td>Chưa có thông số</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
