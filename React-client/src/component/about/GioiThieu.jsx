export default function GioiThieu(params) {
  return (
    <div data-aos="fade-left" data-aos-duration="900">
      <h1 className="pb-6 text-3xl">Giới thiệu về 3S - Hệ thống bán TMDT</h1>
      <p className="pb-4 text-lg font-bold">
        Tên gọi 3S không chỉ là một thương hiệu, mà còn thể hiện triết lý kinh
        doanh và giá trị cốt lõi mà chúng tôi theo đuổi:
      </p>
      <div className="ml-5 max-w-4xl">
        <ul className="ml-10 list-disc leading-8">
          <li>
            <span className="font-bold">Speed (Tốc độ):</span>
            Cung cấp sản phẩm nhanh chóng, dịch vụ giao hàng tối ưu để khách
            hàng có trải nghiệm thuận tiện nhất.
          </li>

          <li>
            <span className="font-bold">Style (Phong cách) :</span>
            nhắm hướng đến những chiếc xe mang tính phong cách phù hợp với mọi
            người
          </li>
          <li>
            <span className="font-bold">Sustainability (Bền vững):</span>
            Hướng tới sự phát triển bền vững, cung cấp các sản phẩm thân thiện
            với môi trường và khuyến khích phong cách sống lành mạnh.
          </li>
        </ul>
      </div>
      <section className="py-2">
        <div className="grid grid-cols-12 py-5 lg:gap-10">
          <div className="col-span-12 leading-8 lg:col-span-6">
            <h3 className="text-xl font-bold text-gray-700">Sứ mệnh của 3S</h3>
            <p>
              Tại 3S, chúng tôi không chỉ bán TMDT, mà còn mang đến một phong
              cách sống năng động, bền vững và đầy cảm hứng. Với mong muốn trở
              thành hệ thống bán lẻ TMDT hàng đầu, 3S cam kết cung cấp những sản
              phẩm chất lượng cao, dịch vụ tận tâm và trải nghiệm mua sắm hoàn
              hảo cho khách hàng.
            </p>
            <h3 className="text-xl font-bold text-gray-700">
              Vì sao chọn 3S ?
            </h3>
            <ul>
              <li> 1. Sản phẩm chất lượng cao</li>
              <li> 2. Dịch vụ chuyên nghiệp</li>
              <li> 3. Mua sắm dễ dàng</li>
              <li> 1. Sản phẩm chất lượng cao</li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <img
              src="/public/about/gioithieu1.jpg"
              alt="anh"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-2">
        <div className="grid grid-cols-12 lg:gap-20">
          <div className="col-span-12 gap-2 lg:col-span-6 lg:flex">
            <img
              src="/public/about/gioithieu2.webp"
              alt="anh"
              className="inline-block h-96 rounded-2xl shadow-xl"
            />
            {/* <img
              src="/public/about/gioithieu2.webp"
              alt="anh"
              className="inline-block h-96 rounded-2xl shadow-xl"
            /> */}
          </div>
          <div className="col-span-12 leading-8 lg:col-span-6">
            <h3 className="text-xl font-bold text-gray-700">Cam kết của 3S</h3>
            <ul className="py-4">
              <li> Chỉ cung cấp sản phẩm chính hãng, chất lượng cao.</li>
              <li>Dịch vụ chuyên nghiệp, tận tâm từ A-Z.</li>
              <li> Luôn cải tiến và đổi mới để phục vụ khách hàng tốt nhất.</li>
            </ul>
            <h3 className="text-xl font-bold text-gray-700">
              Đồng hành cùng 3S
            </h3>
            <p className="text-wrap">
              Dù bạn là tay đua chuyên nghiệp hay người mới bắt đầu,
              <br></br> 3S luôn đồng hành trên mọi chặng đường.
              <br></br> Hãy ghé thăm cửa hàng của chúng tôi hoặc truy cập
              website để khám phá ngay!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
