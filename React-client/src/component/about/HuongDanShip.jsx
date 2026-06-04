import React from "react";

export const HuongDanShip = () => {
  return (
    <div data-aos="fade-left" data-aos-duration="900">
      <h1 className="pb-6 text-3xl">Phí vận chuyển được tính như thế nào?</h1>
      <p className="pb-4">
        Nhằm đem lại sự tiện lợi cho khách hàng khi mua sắm, chúng tôi có hỗ trợ
        giao hàng tận nơi. Thông thường xedap3s sẽ xác nhận đơn hàng cho khách
        hàng trong khoảng 24h làm việc kể từ khi nhận được đơn hàng khách hàng
        hoàn tất thông tin đặt mua qua website. Thời hạn ước tính việc giao hàng
        hoặc cung ứng dịch vụ tùy theo thời gian chốt hàng của Khách và địa chỉ
        giao nhận của Khách (nội thành, ngoại thành hoặc tỉnh)
      </p>
      <div className="leading-8">
        <h4 className="pb-2 pt-5 font-bold">I. CHÍNH SÁCH VẬN CHUYỂN </h4>

        <p className="pb-4">
          <strong>
            <em>1. Phương thức vận chuyển:</em>
          </strong>{" "}
          Chúng tôi sẽ giao hàng hóa/ sản phẩm cho quý khách qua đường bưu điện
          theo địa chỉ người nhận hàng mà Quý khách đã đăng ký khi đặt hàng. Chú
          ý: Xedap.vn chỉ vận chuyển đi tỉnh với đơn hàng có giá trị trên
          150.000đ
        </p>

        <p className="pb-4">
          <strong>
            <em>2. Thời gian giao hàng: </em>
          </strong>{" "}
          Đối với các đơn hàng tại TP. Hồ Chí Minh (áp dụng với các quận nội
          thành), từ 2-3 ngày. Các tỉnh thành khác, thời gian giao hàng là từ
          2-7 ngày tùy theo hình thức vận chuyển tiết kiệm hay chuyển phát
          nhanh. (Quý khách vui lòng cộng thêm 24 tiếng nếu thời gian đặt hàng
          nằm trong khoảng 18h Thứ bảy đến 12h trưa Chủ nhật). Nếu quá thời hạn
          giao hàng đã cam kết mà Quý khách vẫn chưa nhận được sản phẩm đã đặt,
          Quý khách vui lòng thông báo tới bộ phận Chăm sóc khách hàng
        </p>

        <h4 className="pb-2 pt-5 font-bold">II. GIÁ DỊCH VỤ VẬN CHUYỂN</h4>
        <p className="pb-4">
          <strong>
            <em>1. Đơn hàng dưới 10.000.000đ: </em>
          </strong>
          Với đơn hàng dười 10 triệu phí sẽ được chia 2 loại:
          <ul className="ml-10 list-disc">
            <li>
              <strong>Khu vực thành phố Hồ Chí Minh : </strong> phí là
              30.000đ/đơn hàng
            </li>
            <li>
              <strong>Khu vực ngoài thành phố Hồ Chí Minh : </strong> phí là
              60.000đ/đơn hàng
            </li>
          </ul>
          <strong>
            <em>2. Đơn hàng từ 10.000.000đ: </em>
          </strong>
          miễn phí vận chuyển
        </p>
      </div>
    </div>
  );
};
