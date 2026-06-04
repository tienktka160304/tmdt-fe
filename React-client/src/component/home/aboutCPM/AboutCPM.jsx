import { FaRegCreditCard, FaSyncAlt } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { SlBubbles } from "react-icons/sl";

export default function AboutCPM(params) {
  return (
    <>
      <section className="sm:px-6 md:py-8">
        <div className="container">
          <div className="grid grid-cols-[1fr_1fr] items-center justify-between gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr] xl:gap-6">
            <div
              data-aos="fade-up-right"
              data-aos-delay="200"
              className="flex flex-col items-center justify-center rounded-md border border-primary px-4 py-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary xl:h-14 xl:w-14">
                <MdOutlineRocketLaunch className="text-2xl text-primary xl:text-3xl" />
              </div>

              <h3 className="text-sm font-normal xl:text-lg">
                Miễn phí giao hàng
              </h3>

              <p className="text-center text-xs text-gray-400 xl:text-sm">
                Trên 10.000.000 VNĐ
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col items-center justify-center rounded-md border border-primary px-4 py-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary xl:h-14 xl:w-14">
                <FaSyncAlt className="text-2xl text-primary xl:text-3xl" />
              </div>

              <h3 className="text-sm font-normal xl:text-lg">Đổi trả hàng</h3>

              <p className="text-center text-xs text-gray-400 xl:text-sm">
                Chính sách đổi/trả hàng
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-col items-center justify-center rounded-md border border-primary px-4 py-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary xl:h-14 xl:w-14">
                <FaRegCreditCard className="text-2xl text-primary xl:text-3xl" />
              </div>

              <h3 className="text-sm font-normal xl:text-lg">
                Thanh toán an toàn
              </h3>

              <p className="text-center text-xs text-gray-400 xl:text-sm">
                Thanh toán online
              </p>
            </div>

            <div
              data-aos="fade-up-left"
              data-aos-delay="200"
              className="flex flex-col items-center justify-center rounded-md border border-primary px-4 py-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary xl:h-14 xl:w-14">
                <SlBubbles className="text-2xl text-primary xl:text-3xl" />
              </div>

              <h3 className="text-sm font-normal xl:text-lg">
                Hỗ trợ tư vấn 24/7
              </h3>

              <p className="text-center text-xs text-gray-400 xl:text-sm">
                098765432
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
