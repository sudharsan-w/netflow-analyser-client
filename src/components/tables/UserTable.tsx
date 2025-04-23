import { ReactNode } from "react";

import SortSVG from "../../assets/react/Sort";
import { Sort } from "../../types/types";
import { UserNetflow } from "../../types/schema";

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
  return (
    <div className={`${className} font-sans`}>
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}
      <div className="w-full text-left rtl:text-right text-gray-500 ">
        <div className="flex text-txt-1000 bg-ter-1000 mb-4 rounded-lg ">
          <div className="px-6 py-3 flex-[0_0_25%]">
            <div className="flex items-center text-md">
              Ip Address
              <SortSVG
                className={`cursor-pointer h-3 w-8 fill-black`}
                onClick={handleSort("ip")}
                key={`ip`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_25%]">
            <div className="flex items-center text-md">
              Last Connection Time
              <SortSVG
                className={`cursor-pointer h-3 w-8 fill-black`}
                onClick={handleSort("date_updated")}
                key={`date_updated`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_25%]">
            <div className="flex items-center text-md">
              Malicious Connection Count
              <SortSVG
                className={`cursor-pointer h-3 w-8 fill-black`}
                onClick={handleSort("malicous_ccount")}
                key={`malicous_ccount`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_25%]">
            <div className="flex items-center text-md">
              Connection Count
              <SortSVG
                className={`cursor-pointer h-3 w-8 fill-black`}
                onClick={handleSort("src_connection_count")}
                key={`src_connection_count`}
              />
            </div>
          </div>
        </div>
        <div>
          {data.map((record) => {
            return (
              <div className="bg-white flex rounded-2xl shadow-gray-400 shadow-sm  mb-4 border-1 border-ter-1000 text-black">
                <div className="px-6 py-4 flex-[0_0_25%] truncate">{record.ip}</div>
                <div className="px-6 py-4 flex-[0_0_25%] truncate">{record.date_updated}</div>
                <div className="px-6 py-4 flex-[0_0_25%] truncate">{record.malicous_count}</div>
                <div className="px-6 py-4 flex-[0_0_25%] truncate">
                  {record.src_connection_count}
                </div>{" "}
              </div>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default UserTable;
