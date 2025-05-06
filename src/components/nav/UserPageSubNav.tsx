import { ReactNode, useEffect, useRef, useState } from "react";

import AppTabsNav from "./AppTabsNav";
import SearchSVG from "../../assets/react/Search";
import FilterFilledSVG from "../../assets/react/FilterFilled";
import CustomDateFrom from "../misc/CustomDateFrom";
import CustomDateTo from "../misc/CustomDateTo";
import DynamicInputSearch from "../select/Select";
import { RootState } from "../../redux_store/store";
import { useSelector } from "react-redux";
import { Filters } from "../../types/types";
import { fetchUserAsnKeys, fetchUserCountryKeys } from "../../apiutils/netflow";
import { getCountryName } from "../../utils/country";

type Props = {
  className: String;
  setSearchKey: React.Dispatch<React.SetStateAction<String>>;
  searchKey: String;
  setDateFrom: React.Dispatch<React.SetStateAction<Date | null>>;
  setDateTo: React.Dispatch<React.SetStateAction<Date | null>>;
  dateTo: Date | null;
  dateFrom: Date | null;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
};

const UserPageSubNav = ({
  className,
  setSearchKey,
  searchKey,
  setDateFrom,
  dateFrom,
  setDateTo,
  dateTo,
  setFilters,
  filters,
}: Props): ReactNode => {
  const filterPopupRef = useRef<HTMLDivElement | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [userCountryKeys, setUserCountryKeys] = useState<string[]>([]);
  const [userAsnKeys, setUserAsnKeys] = useState<string[]>([]);

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterPopupRef.current &&
        !filterPopupRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  const handleFilters = (key: string) => {
    return (selected: string[]) => {
      let temp = { ...filters };
      temp[key] = selected;
      if (temp[key].length == 0) {
        delete temp[key];
      }
      setFilters(temp);
    };
  };

  useEffect(() => {
    fetchUserCountryKeys(token ?? "")
      .then((resp) => setUserCountryKeys(resp.data.map(getCountryName)))
      .catch(console.debug);
    fetchUserAsnKeys(token ?? "")
      .then((resp) => setUserAsnKeys(resp.data))
      .catch(console.debug);
  }, []);

  return (
    <div className={`flex justify-between mx-10 ${className}`}>
      <AppTabsNav className={`w-1/3 `} />
      <div className={`flex items-center`}>
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
            className={`relative pt-2 cursor-pointer group/item`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FilterFilledSVG className={`w-10 h-10`} />
          </div>
          {showFilters && (
            <div
              ref={filterPopupRef}
              className={`z-50 right-14 absolute shadow-xl bg-white rounded-lg p-4 w-1/4 mt-4`}
            >
              <div className={`mb-4 flex flex-col gap-2`}>
                <span className={`text-md font-bold mb-1 text-gray-700`}>Country</span>
                <DynamicInputSearch
                  placeholder="Country"
                  allDataPossibleOptions={userCountryKeys}
                  setHandler={handleFilters("country_code")}
                  valueHandler={filters["country_code"] ?? []}
                />
              </div>
              <div className={`mb-4 flex flex-col gap-2`}>
                <span className={`text-md font-bold mb-1 text-gray-700`}>ASN</span>
                <DynamicInputSearch
                  placeholder="ASN"
                  allDataPossibleOptions={userAsnKeys}
                  setHandler={handleFilters("asn")}
                  valueHandler={filters["asn"] ?? []}
                />
              </div>
              <div className={`mb-2`}>
                <span className={`text-md font-bold text-gray-700 `}>Date</span>
                <div className="mt-[8px] grid grid-cols-2 gap-x-[17.6px]">
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
