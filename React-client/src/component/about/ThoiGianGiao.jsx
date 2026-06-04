export default function ThoiGianGiao(params) {
  return (
    <div data-aos="fade-left" data-aos-duration="900">
      <h1 className="pb-6 text-3xl">Thời gian giao hàng</h1>
      <ul className="ml-10 list-decimal leading-8">
        <li>
          Giao hàng trong giờ hành chính (8h - 18h từ thứ 2 - thứ 7), trường hợp
          quý khách có nhu cầu nhận hàng ngoài giờ hành chính vui lòng gọi điện
          vào hotline
        </li>
        <li>
          Trước khi kí biên bản nhận hàng, quý khách vui lòng mở hộp và kiểm tra
          kĩ tất cả các sản phẩm trước mặt đơn vị vận chuyển.
        </li>
        <li>
          Nếu hàng hoá thiếu hoặc hư hỏng, vui lòng từ chối nhận hàng và gọi
          ngay vào hotline để được chúng tôi hỗ trợ nhanh nhất.
        </li>
        <li className="italic">
          Chúng tôi sẽ không chịu trách nhiệm trong trường hợp quý khách báo mất
          mát, hư hỏng sau khi đã ký biên bản nhận hàng và đơn vị vận chuyển đã
          rời đi.
        </li>
      </ul>
      <h4 className="pb-2 pt-10 text-2xl font-bold"> Thời Gian</h4>
      <p className="pb-2">
        Trong nội thành Hồ Chí Minh
        <span className="ml-5 font-bold">Thời gian giao hàng từ 2-3 ngày</span>
      </p>
      <p className="pb-2">
        Ngoại thành
        <span className="ml-5 font-bold">Thời gian giao hàng từ 5-6 ngày</span>
      </p>
      <h5 className="font-bold italic">
        Mọi thay đổi liên quan tới thời gian nhận hàng bộ phận Chăm sóc khách
        hàng{" "}
      </h5>
    </div>
  );
}
