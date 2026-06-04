import { BiSolidSortAlt } from "react-icons/bi";

export default function Sort(props) {
  return (
    <li className="flex items-center gap-x-1 lg:gap-x-2">
      <label data-aos="fade-down" data-aos-delay="800" className="mr-1 lg:mr-2">
        Sắp xếp
        <BiSolidSortAlt className="inline-block" />:
      </label>
      <select
        data-aos="fade-down"
        data-aos-delay="1000"
        className="rounded-md border-none bg-inherit outline-none"
        value={props.sortDisplay}
        onChange={(event) => props.setsortDisplay(event.target.value)}
      >
        <option value="0">Mặc định</option>
        <option value="1">Giá giảm</option>
        <option value="2">Giá tăng</option>
      </select>
    </li>
  );
}
