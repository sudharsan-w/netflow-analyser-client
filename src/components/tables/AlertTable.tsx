import { ReactNode, useEffect, useRef, useState } from "react";

import SortSVG from "../../assets/react/Sort";
import ArrowSVG from "../../assets/react/Arrow";
import { Sort } from "../../types/types";
import { NetflowAlert } from "../../types/schema";
import TableRow from "./TableRow";

import CountryFlag from "../misc/CountryFlag";

type Props = {
  className?: String;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  sort: Sort | null;
  data: Array<NetflowAlert>;
};

const ListCell = ({
  className,
  data,
}: {
  data: string[];
  className?: string;
}): ReactNode => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(data.length);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    const updateVisibleItems = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRight = container.getBoundingClientRect().right;
      let count = 0;
      console.log("container ", containerRight);

      for (let i = 0; i < data.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const { right } = el.getBoundingClientRect();
        console.log("element ", right);
        if (right < containerRight && el.checkVisibility()) {
          count++;
        } else {
          break;
        }
      }

      if (count != visibleCount) {
        setVisibleCount(count);
      }
    };

    updateVisibleItems();

    // let temp = () => {
    //   setVisibleCount(data.length)
    //   updateVisibleItems()
    // }

    const observer = new ResizeObserver(updateVisibleItems);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", updateVisibleItems);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, [data, visibleCount]);

  useEffect(() => {
    if (!showAll) {
      setVisibleCount(data.length);
    }
  }, [showAll]);
  return (
    <div
      className={`flex justify-between ${
        showAll ? "items-start" : "items-start"
      }`}
    >
      <div
        ref={containerRef}
        className={` ${
          showAll ? "flex flex-wrap" : "flex flex-nowrap"
        }   w-5/6`}
      >
        {!showAll
          ? data.map((item, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) =>
                  (itemRefs.current[index] = el)
                }
                className={`px-2 py-1 ml-1 bg-pri-250 rounded-2xl text-sm ${
                  index >= visibleCount ? "opacity-0" : ""
                }`}
              >
                {item}
              </div>
            ))
          : // <div className={`flex-wrap`}>
            data.map((item, index) => (
              <div
                key={index}
                className={`px-2 py-1 ml-1 mb-1 bg-pri-250 rounded-2xl text-sm `}
              >
                {item}
              </div>
            ))
            // </div>
        }
      </div>
      {
        <ArrowSVG
          className={`cursor-pointer -rotate-270 h-4 w-4 ${
            data.length > visibleCount || showAll ? "" : "opacity-0"
          } ${!showAll ? "-rotate-270" : "rotate-180"}`}
          onClick={() => setShowAll(!showAll)}
        />
      }
    </div>
  );

  return (
    <div className={`flex w-full ${className}`}>
      {data.map((txt: string) => (
        <span className={`px-2 py-1 mr-1 bg-pri-250 rounded-2xl text-sm`}>
          {txt}
        </span>
      ))}
    </div>
  );
};

const AlertTable = ({ className, setSort, sort, data }: Props): ReactNode => {
  const handleSort = (key: String) => {
    return () => {
      if (!sort || sort.sortBy != key) {
        setSort({
          sortBy: String(key),
          sortOrder: "asc",
        });
      } else if (sort.sortBy == key) {
        setSort({
          ...sort,
          sortOrder: sort.sortOrder == "asc" ? "desc" : "asc",
        });
      }
    };
  };
  const header1 = useRef<HTMLDivElement>(null);
  const header2 = useRef<HTMLDivElement>(null);
  const header3 = useRef<HTMLDivElement>(null);
  const header4 = useRef<HTMLDivElement>(null);
  const header5 = useRef<HTMLDivElement>(null);
  const header6 = useRef<HTMLDivElement>(null);
  const header7 = useRef<HTMLDivElement>(null);
  const header8 = useRef<HTMLDivElement>(null);

  return (
    <div className={`${className} font-sans`}>
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}
      {/* <div className="w-full text-left rtl:text-right text-gray-500black "> */}
      <div className="flex text-txt-1000 bg-ter-1000 mb-4 rounded-lg">
        <div className="flex-[12] px-4 py-3  " ref={header1}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Source Address</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("src_ip")}
              key={`src_ip`}
            />
          </div>
        </div>
        <div className="flex-[6] px-4 py-3  " ref={header2}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Source Port</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("src_port")}
              key={`src_port`}
            />
          </div>
        </div>
        <div className="flex-[12] px-4 py-3  " ref={header3}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Destination Address</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("dst_ip")}
              key={`dst_ip`}
            />
          </div>
        </div>
        <div className="flex-[6] px-4 py-3  " ref={header4}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Destination Port</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("dst_port")}
              key={`dst_port`}
            />
          </div>
        </div>
        <div className="flex-[6] px-4 py-3  " ref={header5}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Flow Duration</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("total_flow_duration")}
              key={`total_flow_duration`}
            />
          </div>
        </div>
        <div className="flex-[15] px-4 py-3  " ref={header6}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Threats</span>
            {/* <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("total_flow_duration")}
              key={`total_flow_duration`}
            /> */}
          </div>
        </div>
        <div className="flex-[12] px-4 py-3  " ref={header7}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>First Seen</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("first_seen")}
              key={`first_seen`}
            />
          </div>
        </div>
        <div className="flex-[12] px-4 py-3  " ref={header8}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Last Seen</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("last_seen")}
              key={`last_seen`}
            />
          </div>
        </div>
      </div>
      <div className={``}>
        {data.map((record) => {
          return (
            <div className="bg-white text-gray-700 flex rounded-2xl shadow-gray-400 shadow-sm text-sm mb-4 border-1 border-ter-1000 test-sm">
              <TableRow referenceRef={header1} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.src_ip}
                  {record.src_country_code && (
                    <CountryFlag
                      isoCode={record.src_country_code}
                      className={`inline-block pl-2`}
                      width={28}
                      height={21}
                    />
                  )}
                </div>
              </TableRow>
              <TableRow referenceRef={header2} className={`inline-block  `}>
                <div className="w-full truncate    py-4">{record.src_port}</div>
              </TableRow>
              <TableRow referenceRef={header3} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.dst_ip}
                  {record.dst_country_code && (
                    <CountryFlag
                      isoCode={record.dst_country_code}
                      className={`inline-block pl-2`}
                      width={28}
                      height={21}
                    />
                  )}
                </div>
              </TableRow>
              <TableRow referenceRef={header4} className={`inline-block  `}>
                <div className="w-full truncate    py-4">{record.dst_port}</div>
              </TableRow>
              <TableRow referenceRef={header5} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.total_flow_duration}{" "}
                  <span className={`text-gray-500`}>{"bytes"}</span>
                </div>
              </TableRow>
              <TableRow referenceRef={header6} className={`inline-block  `}>
                <div className="w-full   py-4">
                  {/* <span
                    className={`bg-pri-250 px-2 py-1 rounded-2xl text-black font bold`}
                  > */}
                  <ListCell
                    data={record.src_malicious_meta.map((e) => e.source)}
                  />
                  {/* </span> */}
                </div>
              </TableRow>
              <TableRow referenceRef={header7} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.first_seen.slice(0, 19).replace("T", ", ")}
                </div>
              </TableRow>
              <TableRow referenceRef={header8} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.last_seen.slice(0, 19).replace("T", ", ")}
                </div>
              </TableRow>
            </div>
          );
        })}
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default AlertTable;
