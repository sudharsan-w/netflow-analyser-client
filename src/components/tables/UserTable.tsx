import { ReactNode, useRef } from "react";

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
};

const UserTable = ({ className, setSort, sort, data }: Props): ReactNode => {
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
  const header3 = useRef<HTMLDivElement>(null);
  const header4 = useRef<HTMLDivElement>(null);
  const header5 = useRef<HTMLDivElement>(null);
  const header6 = useRef<HTMLDivElement>(null);
  const header7 = useRef<HTMLDivElement>(null);

  return (
    <div className={`${className} font-sans`}>
      <div className="flex text-txt-1000 bg-ter-1000 mb-4 rounded-lg ">
        <div className="flex-[14] px-4 py-3" ref={header1}>
          <div className="flex justify-start items-start text-sm">
            Ip Address
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("ip")}
              key={`ip`}
            />
          </div>
        </div>
        <div className="flex-[14] px-4 py-3" ref={header3}>
          <div className="flex justify-start items-start text-sm">
            ASN
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("asn")}
              key={`asn`}
            />
          </div>
        </div>
        <div className="flex-[14] px-4 py-3" ref={header4}>
          <div className="flex justify-start items-start text-sm">
            Ip Version
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("ip_version")}
              key={`ip_version`}
            />
          </div>
        </div>
        <div className="flex-[14] px-4 py-3" ref={header5}>
          <div className="flex justify-start items-start text-sm">
            Last Connection Time {"(IST)"}
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("date_updated")}
              key={`date_updated`}
            />
          </div>
        </div>
        <div className="flex-[14] px-4 py-3" ref={header6}>
          <div className="flex justify-start items-start text-sm">
            Malicious Connection Count
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("malicous_ccount")}
              key={`malicous_ccount`}
            />
          </div>
        </div>
        <div className="flex-[14] px-4 py-3" ref={header7}>
          <div className="flex justify-start items-start text-sm">
            Connection Count
            <SortSVG
              className={`cursor-pointer mt-1 h-3 w-8 fill-black`}
              onClick={handleSort("src_connection_count")}
              key={`src_connection_count`}
            />
          </div>
        </div>
      </div>
      <div>
        {data.map((record) => {
          return (
            <div className="bg-white text-gray-700 flex rounded-2xl shadow-gray-400 shadow-sm text-sm mb-4 border-1 border-ter-1000 test-sm">
              <TableRow referenceRef={header1} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
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
              <TableRow referenceRef={header3} className={`inline-block  `}>
                <div className="w-full truncate    py-4">{record.asn}</div>
              </TableRow>
              <TableRow referenceRef={header4} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  <span
                    className={`bg-pri-250 px-2 py-1 rounded-2xl text-black font bold`}
                  >
                    {record.ip_version}
                  </span>
                </div>
              </TableRow>
              <TableRow referenceRef={header5} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.date_updated
                    ? record.date_updated.slice(0, 19).replace("T", ", ")
                    : record.date_added.slice(0, 19).replace("T", ", ")}
                </div>
              </TableRow>
              <TableRow referenceRef={header6} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.malicous_count}
                </div>
              </TableRow>
              <TableRow referenceRef={header6} className={`inline-block  `}>
                <div className="w-full truncate    py-4">
                  {record.src_connection_count}
                </div>
              </TableRow>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTable;
