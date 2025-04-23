import { ReactNode } from "react";

import SortSVG from "../../assets/react/Sort";
import { Sort } from "../../types/types";
import { NetflowRecord } from "../../types/schema";

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
  return (
    <div className={`${className} font-sans`}>
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}
      <div className=" fw-full text-left rtl:text-right text-gray-500black ">
        <div className="flex text-txt-1000 bg-ter-1000 mb-4 rounded-lg">
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Record Number
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("record_num")}
                key={`record_num`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Source Address
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("src_addr")}
                key={`src_addr`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Source Port
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("src_port")}
                key={`src_port`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Dest Address
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("dst_addr")}
                key={`dst_addr`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Destination Port
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("dst_port")}
                key={`dst_port`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Flow Duration
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("flow_duration")}
                key={`flow_duration`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Proto
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("protocol")}
                key={`protocol`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Malicious Status
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("src_malicious")}
                key={`src_malicious`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              First Seen
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("first_datetime")}
                key={`first_datetime`}
              />
            </div>
          </div>
          <div className="px-6 py-3 flex-[0_0_10%]">
            <div className="flex items-start text-md">
              Last Seen
              <SortSVG
                className={`cursor-pointer mt-2 h-3 w-8 fill-black`}
                onClick={handleSort("last_datetime")}
                key={`last_datetime`}
              />
            </div>
          </div>
        </div>
        <div className={``}>
          {data.map((record) => {
            return (
              <div className="bg-white flex rounded-2xl shadow-gray-400 shadow-sm  mb-4 border-1 border-ter-1000 ">
                {/* <div
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    
                  </div>
                  <div className="px-6 py-4">Silver</div>
                  <div className="px-6 py-4">Laptop</div>
                  <div className="px-6 py-4">$2999</div>
                  <div className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Edit
                    </a>
                  </div> */}
                <div className="flex-[0_0_10%] truncate  px-6 py-4">{record.record_num}</div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">{record.src_addr}</div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">{record.src_port}</div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">{record.dst_addr}</div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">{record.dst_port}</div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">{record.flow_duration}</div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">{record.protocol}</div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">{record.src_malicious}</div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">
                  {record.first_datetime.slice(0, 10)}
                </div>
                <div className="flex-[0_0_10%] truncate  px-6 py-4">
                  {record.last_datetime.slice(0, 10)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default FlowTable;
