import { ReactNode, useState } from "react";

import AppTabsNav from "./AppTabsNav";
import SearchSVG from "../../assets/react/Search";
import FilterFilledSVG from "../../assets/react/FilterFilled";
import CustomDateFrom from "../misc/CustomDateFrom";
import CustomDateTo from "../misc/CustomDateTo";

type Props = {
  className: String;
  setSearchKey: React.Dispatch<React.SetStateAction<String>>;
  searchKey: String;
  setDateFrom: React.Dispatch<React.SetStateAction<Date | null>>;
  setDateTo: React.Dispatch<React.SetStateAction<Date | null>>;
  dateTo: Date | null;
  dateFrom: Date | null;
};

const UserPageSubNav = ({
  className,
  setSearchKey,
  searchKey,
  setDateFrom,
  dateFrom,
  setDateTo,
  dateTo
}: Props): ReactNode => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  return (
    <div className={`flex justify-between mx-10 ${className}`}>
      <AppTabsNav className={`w-1/3 `} />
      <div className={`flex`}>
        <div className="flex items-center px-4 py-2 space-x-2 bg-ter-750 rounded-lg mr-2">
          <SearchSVG className={`w-5 h-5 fill-ter-1000`} />
          <input
            value={searchKey as string}
            onChange={(e) => setSearchKey(e.target.value)}
            className={`outline-none ring-0 p-1`}
            type="text"
            placeholder="Search ip_address:port"
          />
        </div>
        <div>
          <div
            className={`relative  pt-2 cursor-pointer group/item`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterFilledSVG className={`w-8 h-8`} />
          </div>
          {showFilters && (
            <div
              className={`z-50 right-0 absolute  shadow-lg bg-white p-4 w-1/4`}
            >
              <div className={`mb-2`}>
                <span className={`text-md font-bold `}>Date</span>
                <div className="mt-[12px] grid grid-cols-2 gap-x-[17.6px]">
                  <div className="flex flex-col">
                    <span className="text-md font-semibold text-[#565a61]">
                      From
                    </span>
                    <CustomDateFrom
                      dateFrom={dateFrom}
                      setDateFrom={setDateFrom}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#565a61]">
                      To
                    </span>
                    <CustomDateTo dateTo={dateTo} setDateTo={setDateTo} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPageSubNav;
