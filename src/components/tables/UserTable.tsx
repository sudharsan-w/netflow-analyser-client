import React, { forwardRef, useRef } from "react";

import SortSVG from "../../assets/react/Sort";
import { Sort } from "../../types/types";
import { UserNetflow } from "../../types/schema";
import TableRow from "./TableRow";
import CountryFlag from "../misc/CountryFlag";

type Props = {
  className?: String;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  sort: Sort | null;
  data: Array<UserNetflow>;
  showUserDetails: UserNetflow | null;
  setShowUserDetails: React.Dispatch<React.SetStateAction<UserNetflow | null>>;
};

const UserTable = forwardRef<HTMLDivElement, Props>(({ className, setSort, sort, data, showUserDetails, setShowUserDetails }, ref) => {
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

  return (
    <div className={`${className} font-sans`}>
      <div className="flex text-txt-1000 bg-header mb-4 rounded-lg min-h-16 items-center">
        <div className="flex-1 px-4 py-3" ref={header1}>
          <div className="flex justify-center items-start text-md">
            Ip Address
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("ip")}
              key={`ip`}
            />
          </div>
        </div>
        <div className="flex-1 px-4 py-3" ref={header2}>
          <div className="flex justify-center items-start text-md">
            ASN
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("asn")}
              key={`asn`}
            />
          </div>
        </div>
        <div className="flex-1 px-4 py-3" ref={header3}>
          <div className="flex justify-center items-start text-md">
            Ip Version
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("ip_version")}
              key={`ip_version`}
            />
          </div>
        </div>
        <div className="flex-[1.5] px-4 py-3" ref={header4}>
          <div className="flex justify-center items-center text-md">
            Last Connection Time {"(IST)"}
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("date_updated")}
              key={`date_updated`}
            />
          </div>
        </div>
        <div className="flex-1 px-4 py-3" ref={header5}>
          <div className="flex justify-center items-center text-md">
            Malicious Connection Count
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("malicious_count")}
              key={`malicious_count`}
            />
          </div>
        </div>
        <div className="flex-1 px-4 py-3" ref={header6}>
          <div className="flex justify-center items-center text-md">
            Connection Count
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("src_connection_count")}
              key={`src_connection_count`}
            />
          </div>
        </div>
      </div>
      <div ref={ref}>
        {data.map((record, idx) => {
          return (
            <div
              key={idx}
              className={` text-gray-700 flex rounded-2xl shadow-gray-400 shadow-sm text-sm mb-4 border-1 border-ter-1000 test-sm cursor-pointer transition-all duration-500 ease-in-out ${showUserDetails?.ip == record.ip ? "bg-row-selected scale-[103%]" : "bg-row"
                }`}
              onClick={() => {
                setShowUserDetails(record);
              }}
            >
              <TableRow
                referenceRef={header1}
                className={`inline-block truncate`}
              >
                <div className="w-full py-4 flex justify-center">
                  {record.ip}
                  {record.country_code && (
                    <CountryFlag
                      isoCode={record.country_code}
                      className={`inline-block pl-2`}
                      width={28}
                      height={21}
                    />
                  )}
                </div>
              </TableRow>
              <TableRow
                referenceRef={header2}
                className={`inline-block truncate`}
              >
                <div className="w-full flex justify-center py-4">{record.asn}</div>
              </TableRow>
              <TableRow
                referenceRef={header3}
                className={`inline-block truncate`}
              >
                <div className="w-full py-4 flex justify-center">
                  <span
                    className={`bg-pri-250 px-2 py-1 rounded-2xl text-black font bold`}
                  >
                    {record.ip_version}
                  </span>
                </div>
              </TableRow>
              <TableRow
                referenceRef={header4}
                className={`inline-block truncate`}
              >
                <div className="w-full py-4 flex justify-center">
                  {record.date_updated
                    ? record.date_updated.slice(0, 19).replace("T", ", ")
                    : record.date_added.slice(0, 19).replace("T", ", ")}
                </div>
              </TableRow>
              <TableRow
                referenceRef={header5}
                className={`inline-block truncate`}
              >
                <div className="w-full py-4 flex justify-center">{record.malicious_count}</div>
              </TableRow>
              <TableRow
                referenceRef={header6}
                className={`inline-block truncate`}
              >
                <div className="w-full py-4 flex justify-center">{record.src_connection_count}</div>
              </TableRow>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default UserTable;
