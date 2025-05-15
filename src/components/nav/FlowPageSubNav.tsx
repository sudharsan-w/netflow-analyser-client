import { ReactNode, useEffect, useRef, useState } from "react";

import AppTabsNav from "./AppTabsNav";
import DynamicInputSearch from "../select/Select.tsx";
import SearchSVG from "../../assets/react/Search";
import FilterFilledSVG from "../../assets/react/FilterFilled.tsx";
import { Filters } from "../../types/types.ts";

import "react-datepicker/dist/react-datepicker.css";
import CustomDateFrom from "../misc/CustomDateFrom.tsx";
import CustomDateTo from "../misc/CustomDateTo.tsx";

import {
  fetchDstPortKeys,
  fetchSrcPortKeys,
  fetchProtocolKeys,
  fetchSrcCountryKeys,
  fetchDstCountryKeys,
  fetchSrcServiceKeys,
  fetchDstServiceKeys,
} from "../../apiutils/netflow.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux_store/store.ts";
import { getCountryName } from "../../utils/country.ts";

type Props = {
  className: String;
  setSearchKey: React.Dispatch<React.SetStateAction<String>>;
  searchKey: String;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setDateFrom: React.Dispatch<React.SetStateAction<Date | null>>;
  setDateTo: React.Dispatch<React.SetStateAction<Date | null>>;
  dateTo: Date | null;
  dateFrom: Date | null;
};

const FlowPageSubNav = ({
  className,
  setSearchKey,
  searchKey,
  setFilters,
  filters,
  setDateFrom,
  setDateTo,
  dateTo,
  dateFrom,
}: Props): ReactNode => {
  const filterPopupRef = useRef<HTMLDivElement | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [protocolKeys, setProtocolKeys] = useState<string[]>([]);
  const [srcPortKeys, setSrcPortKeys] = useState<string[]>([]);
  const [dstPortKeys, setDstPortKeys] = useState<string[]>([]);
  const [srcServiceKeys, setSrcServiceKeys] = useState<string[]>([]);
  const [dstServiceKeys, setDstServiceKeys] = useState<string[]>([]);
  const [srcCountryKeys, setSrcCountryKeys] = useState<string[]>([]);
  const [dstCountryKeys, setDstCountryKeys] = useState<string[]>([]);

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
    fetchProtocolKeys(token ?? "")
      .then((resp) => setProtocolKeys(resp.data))
      .catch(console.debug);
    fetchSrcPortKeys(token ?? "")
      .then((resp) => setSrcPortKeys(resp.data))
      .catch(console.debug);
    fetchDstPortKeys(token ?? "")
      .then((resp) => setDstPortKeys(resp.data))
      .catch(console.debug);
    fetchSrcCountryKeys(token ?? "")
      .then((resp) => setSrcCountryKeys(resp.data.map(getCountryName)))
      .catch(console.debug);
    fetchDstCountryKeys(token ?? "")
      .then((resp) => setDstCountryKeys(resp.data.map(getCountryName)))
      .catch(console.debug);
    fetchSrcServiceKeys(token ?? "")
      .then((resp) => setSrcServiceKeys(resp.data))
      .catch(console.debug);
    fetchDstServiceKeys(token ?? "")
      .then((resp) => setDstServiceKeys(resp.data))
      .catch(console.debug);
  }, []);

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
              ref={filterPopupRef}
              className={`z-50 right-0 absolute text-gray-700 shadow-lg bg-white p-4 w-1/4`}
            >
              <div className={`mb-4`}>
                <span className={`text-md font-bold mb-1`}>Protocol</span>
                <DynamicInputSearch
                  placeholder="Protocol"
                  allDataPossibleOptions={protocolKeys}
                  setHandler={handleFilters("protocol")}
                  valueHandler={filters["protocol"] ?? []}
                />
              </div>
              <div className={`mb-4`}>
                <span className={`text-md font-bold mb-1`}>Source Port</span>
                <DynamicInputSearch
                  placeholder="Source Port"
                  allDataPossibleOptions={srcPortKeys}
                  setHandler={handleFilters("src_port")}
                  valueHandler={filters["src_port"] ?? []}
                />
              </div>
              <div className={`mb-4`}>
                <span className={`text-md font-bold mb-1`}>
                  Destination Port
                </span>
                <DynamicInputSearch
                  placeholder="Dest Port"
                  allDataPossibleOptions={dstPortKeys}
                  setHandler={handleFilters("dst_port")}
                  valueHandler={filters["dst_port"] ?? []}
                />
              </div>
              <div className={`mb-4`}>
                <span className={`text-md font-bold mb-1`}>
                  Source Service
                </span>
                <DynamicInputSearch
                  placeholder="Source Service"
                  allDataPossibleOptions={srcServiceKeys}
                  setHandler={handleFilters("src_service")}
                  valueHandler={filters["src_service"] ?? []}
                />
              </div>
              <div className={`mb-4`}>
                <span className={`text-md font-bold mb-1`}>
                  Destination Service
                </span>
                <DynamicInputSearch
                  placeholder="Dest Service"
                  allDataPossibleOptions={dstServiceKeys}
                  setHandler={handleFilters("dst_service")}
                  valueHandler={filters["dst_service"] ?? []}
                />
              </div>
              <div className={`mb-4`}>
                <span className={`text-md font-bold mb-1`}>Source Country</span>
                <DynamicInputSearch
                  placeholder="Source Country"
                  allDataPossibleOptions={srcCountryKeys}
                  setHandler={handleFilters("src_country_code")}
                  valueHandler={filters["src_country_code"] ?? []}
                />
              </div>
              <div className={`mb-4`}>
                <span className={`text-md font-bold mb-1`}>
                  Destination Country
                </span>
                <DynamicInputSearch
                  placeholder="Destination Country"
                  allDataPossibleOptions={dstCountryKeys}
                  setHandler={handleFilters("dst_country_code")}
                  valueHandler={filters["dst_country_code"] ?? []}
                />
              </div>
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

export default FlowPageSubNav;
