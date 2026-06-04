import { useCallback, useMemo, useState } from "react";
import ImgBrand from "./ImgBrand";
import { MailOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
export default function Brand({ brand, title }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const collapseItems = useMemo(
    () => [
      {
        key: "sub1",
        label: title,
        icon: <MailOutlined />,
        children: (
          <div
            className={`${isExpanded ? "grid grid-cols-3 gap-1 duration-500" : "hidden"} p-1 md:p-2`}
          >
            {brand.map((item) => (
              <ImgBrand key={item.id} item={item} />
            ))}
          </div>
        ),
      },
    ],
    [title, brand, isExpanded],
  );

  return (
    <Collapse
      items={collapseItems}
      defaultActiveKey={isExpanded ? ["sub1"] : []}
      onChange={toggleExpand}
      expandIconPosition="end"
      className="border-0 bg-transparent text-base !text-gray-700 [&_.ant-collapse-content-box]:!pt-0 [&_.ant-collapse-content]:!border-t-0 [&_.ant-collapse-header-text]:font-medium [&_.ant-collapse-header]:!bg-transparent [&_.ant-collapse-header]:!py-2 [&_.ant-collapse-item]:!border-0"
    />
  );
}
