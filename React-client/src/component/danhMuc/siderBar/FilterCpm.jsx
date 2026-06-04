import React, { useCallback, useMemo, useState } from "react";
import Item from "./ItemCategory";
import { MailOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { useSearchParams } from "react-router-dom";
import BtnAnimation from "../../shared/BtnAnimation";

const paramsType = "category";
const paramsBrand = "brand";
const paramsPage = "page";
const paramsDoiTuong = "dt";

export default function FilterCpm({ items, title, id }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(id == 1 ? true : false);

  const handleTypeChange = useCallback(
    (slug) => {
      if (!slug) return;
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const currentTypes = newSearchParams.get(paramsType)?.split(",") || [];

      const newTypes = currentTypes.includes(slug)
        ? currentTypes.filter((t) => t !== slug)
        : [...currentTypes, slug];

      if (newTypes?.length > 0) {
        // newSearchParams.delete(paramsBrand);
        newSearchParams.delete(paramsPage);
        newSearchParams.set(paramsType, newTypes.join(","));
      } else {
        newSearchParams.delete(paramsType);
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
      items.map((item) => (
        <React.Fragment key={item.id}>
          <BtnAnimation>
            <Item
              slug={item.slug}
              name={item.name}
              handleTypeChange={handleTypeChange}
            />
          </BtnAnimation>
        </React.Fragment>
      )),
    [items, handleTypeChange],
  );

  const collapseItems = useMemo(
    () => [
      {
        key: "sub1",
        label: title,
        icon: <MailOutlined />,
        children: <ul className="pl-2">{renderedItems}</ul>, // có thể wrap bằng ul nếu muốn list đẹp hơn
      },
    ],
    [title, renderedItems],
  );
  return (
    <Collapse
      items={collapseItems}
      defaultActiveKey={isExpanded ? ["sub1"] : []}
      expandIconPosition="end"
      className="border-0 bg-transparent text-base !text-gray-700 [&_.ant-collapse-content-box]:!pt-0 [&_.ant-collapse-content]:!border-t-0 [&_.ant-collapse-header-text]:font-medium [&_.ant-collapse-header]:!bg-transparent [&_.ant-collapse-header]:!py-2 [&_.ant-collapse-item]:!border-0"
    />
  );
}
