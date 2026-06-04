import React, { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LabelPrice from "./LabelPrice";
import { MailOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import BtnAnimation from "../../shared/BtnAnimation";
const priceRanges = [
  { id: 1, label: "Dưới 6.000.000đ", min: 0, max: 6000000 },
  { id: 2, label: "6.000.000đ - 10.000.000đ", min: 6000000, max: 10000000 },
  { id: 3, label: "10.000.000đ - 20.000.000đ", min: 10000000, max: 20000000 },
  { id: 4, label: "Trên 20.000.000đ", min: 20000000, max: null },
];
const paramsPage = "page";

export default function FilterPrice(params) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  // Handler khi nhấp vào loại sản phẩm
  const handleTypeChange = useCallback(
    (min, max) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      const currentMin = newSearchParams.get("pricemin");
      const currentMax = newSearchParams.get("pricemax");

      const isSame =
        currentMin === String(min) &&
        (currentMax === String(max) || (!currentMax && max === null));

      if (isSame) {
        // Nếu giá trị đang chọn lại trùng thì sẽ bỏ lọc
        newSearchParams.delete("pricemin");
        newSearchParams.delete("pricemax");
      } else {
        newSearchParams.delete(paramsPage);
        newSearchParams.set("pricemin", min);
        if (max !== null) {
          newSearchParams.set("pricemax", max);
        } else {
          newSearchParams.delete("pricemax");
        }
      }

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  // const toggleExpand = useCallback(() => {
  //   setIsExpanded((prev) => !prev);
  // }, []);

  const renderedItems = useMemo(
    () =>
      priceRanges.map((item) => (
        <React.Fragment key={item.id}>
          <BtnAnimation>
            <LabelPrice
              name={item.label}
              min={item.min}
              max={item.max}
              handleTypeChange={handleTypeChange}
            />
          </BtnAnimation>
        </React.Fragment>
      )),
    [priceRanges, handleTypeChange],
  );

  const collapseItems = useMemo(
    () => [
      {
        key: "sub1",
        label: "Giá",
        icon: <MailOutlined />,
        children: <ul className="pl-2">{renderedItems}</ul>, // có thể wrap bằng ul nếu muốn list đẹp hơn
      },
    ],
    [renderedItems],
  );
  return (
    <>
      <Collapse
        items={collapseItems}
        defaultActiveKey={isExpanded ? ["sub1"] : []}
        expandIconPosition="end"
        className="border-0 bg-transparent text-base !text-gray-700 [&_.ant-collapse-content-box]:!pt-0 [&_.ant-collapse-content]:!border-t-0 [&_.ant-collapse-header-text]:font-medium [&_.ant-collapse-header]:!py-2 [&_.ant-collapse-item]:!border-0"
      />
    </>
  );
}
