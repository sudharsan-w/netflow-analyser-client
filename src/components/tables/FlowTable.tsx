import { ReactNode, useRef } from "react";

import SortSVG from "../../assets/react/Sort";
import { Sort } from "../../types/types";
import { NetflowRecord } from "../../types/schema";
import TableRow from "./TableRow";

import CountryFlag from "../misc/CountryFlag";

type Props = {
  className?: String;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  sort: Sort | null;
  data: Array<NetflowRecord>;
};

const FlowTable = ({ className, setSort, sort, data }: Props): ReactNode => {
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
  const header2 = useRef<HTMLDivElement>(null);
  const header3 = useRef<HTMLDivElement>(null);
  const header4 = useRef<HTMLDivElement>(null);
  const header5 = useRef<HTMLDivElement>(null);
  const header6 = useRef<HTMLDivElement>(null);
  const header7 = useRef<HTMLDivElement>(null);
  const header8 = useRef<HTMLDivElement>(null);
  const header9 = useRef<HTMLDivElement>(null);
  const header10 = useRef<HTMLDivElement>(null);
  const header11 = useRef<HTMLDivElement>(null);
  const header12 = useRef<HTMLDivElement>(null);

  return (
    <div className={`${className} font-sans`}>
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}
      {/* <div className="w-full text-left rtl:text-right text-gray-500black "> */}
      <div className="flex text-txt-1000 bg-ter-1000 mb-4 rounded-lg">
        <div className="flex-[15] px-4 py-3  " ref={header2}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Source Address</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("src_addr")}
              key={`src_addr`}
            />
          </div>
        </div>
        <div className="flex-[5] px-4 py-3  " ref={header3}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Source Port</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("src_port")}
              key={`src_port`}
            />
          </div>
        </div>
        <div className="flex-[15] px-4 py-3  " ref={header4}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Dest Address</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("dst_addr")}
              key={`dst_addr`}
            />
          </div>
        </div>
        <div className="flex-[5] px-4 py-3  " ref={header5}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Destination Port</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("dst_port")}
              key={`dst_port`}
            />
          </div>
        </div>
        <div className="flex-[5] px-4 py-3  " ref={header6}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Flow Size</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("flow_duration")}
              key={`flow_duration`}
            />
          </div>
        </div>
        <div className="flex-[10] px-4 py-3  " ref={header7}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Flow Duration</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("flow_duration")}
              key={`flow_duration`}
            />
          </div>
        </div>
        <div className="flex-[10] px-4 py-3  " ref={header8}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Proto</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("protocol")}
              key={`protocol`}
            />
          </div>
        </div>
        <div className="flex-[5] px-4 py-3  " ref={header9}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>IP Version</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("protocol")}
              key={`protocol`}
            />
          </div>
        </div>
        <div className="flex-[10] px-4 py-3  " ref={header10}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Malicious Status</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("src_malicious")}
              key={`src_malicious`}
            />
          </div>
        </div>
        <div className="flex-[15] px-4 py-3  " ref={header11}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>First Seen</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("first_datetime")}
              key={`first_datetime`}
            />
          </div>
        </div>
        <div className="flex-[15] px-4 py-3  " ref={header12}>
          <div className="flex justify-start items-start text-sm">
            <span className={``}>Last Seen</span>
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("last_datetime")}
              key={`last_datetime`}
            />
          </div>
        </div>
      </div>
      <div className={``}>
        {data.map((record) => {
          return (
            <div className="bg-white text-gray-700 flex rounded-2xl shadow-gray-400 shadow-sm text-sm mb-4 border-1 border-ter-1000 test-sm">
              <TableRow referenceRef={header2} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.src_addr}
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
              <TableRow referenceRef={header3} className={`inline-block  `}>
                <div className="w-full truncate    py-4">{record.src_port}</div>
              </TableRow>
              <TableRow referenceRef={header4} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.dst_addr}
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
              <TableRow referenceRef={header5} className={`inline-block  `}>
                <div className="w-full truncate    py-4">{record.dst_port}</div>
              </TableRow>
              <TableRow referenceRef={header6} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.flow_size}{" "}
                  <span className={`text-gray-500`}>{"bytes"}</span>
                </div>
              </TableRow>
              <TableRow referenceRef={header7} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.flow_duration}{" "}
                  <span className={`text-gray-500`}>{"ms"}</span>
                </div>
              </TableRow>
              <TableRow referenceRef={header8} className={`inline-block  `}>
                <div className="w-full truncate    py-4">{record.protocol}</div>
              </TableRow>
              <TableRow referenceRef={header9} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  <span
                    className={`bg-pri-250 px-2 py-1 rounded-2xl text-black font bold`}
                  >
                    {record.ip_version}
                  </span>
                </div>
              </TableRow>
              <TableRow referenceRef={header10} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.src_malicious}
                </div>
              </TableRow>
              <TableRow referenceRef={header11} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.first_datetime.slice(0, 19).replace("T", ", ")}
                </div>
              </TableRow>
              <TableRow referenceRef={header12} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.last_datetime.slice(0, 19).replace("T", ", ")}
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

export default FlowTable;
