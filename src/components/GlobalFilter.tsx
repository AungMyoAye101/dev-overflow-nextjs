import React, { useState } from "react";
import { searchType } from "../constants";
import { useRouter, useSearchParams } from "next/navigation";
import { formQuery } from "../lib/utils";

const GlobalFilter = () => {
  const router = useRouter();
  const query = useSearchParams();
  const type = query.get("type");

  const [active, setActive] = useState(type || "");

  const handleNavigate = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formQuery({
        params: query.toString(),
        key: "type",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formQuery({
        params: query.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex gap-4 items-center font-poppins px-4">
      <p>Type</p>
      {searchType.map((t) => (
        <button
          key={t}
          className={`px-3 py-1 rounded-full button_bg shadow text-sm capitalize ${
            active === t ? "btn-bg" : ""
          }`}
          onClick={() => handleNavigate(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default GlobalFilter;
