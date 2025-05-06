import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserTable from "../tables/UserTable";
import UserPageSubNav from "../nav/UserPageSubNav";
import BufferSVG from "../../assets/react/Buffer.tsx";
import { Sort, Pagination, Filters } from "../../types/types";
import PaginationComponent from "../pagination/Pagination";

import { RootState, AppDispatch } from "../../redux_store/store";
import {
  fetchNetflowThunk,
  setFetchNetflowSliceState,
} from "../../redux_store/features/fetchnetflowuser.ts";
import { getIsoCodeFromCountryName } from "../../utils/country.ts";
import { UserNetflow } from "../../types/schema.ts";
import UserDetailsCard from "../cards/UserDetailsCard.tsx";

type Props = {
  className?: String;
};

const UserPage = ({ className }: Props): ReactNode => {
  const dispatch = useDispatch<AppDispatch>();
  const tableRef = useRef<HTMLDivElement>(null)
  const [tableHeight, setTableHeight] = useState<number | null>(null)

  const [sort, setSort] = useState<Sort>({
    sortBy: "date_updated",
    sortOrder: "desc",
  });
  const [page, setPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<String>("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [showUserDetails, setShowUserDetails] = useState<UserNetflow | null>(
    null
  );
  const {
    value: {
      success: fetchSuccess,
      error: fetchError,
      data: fetchData,
      loading: fetchLoading,
      query: fetchQuery,
    },
  } = useSelector((state: RootState) => state.fetchnetflowuser);
  const { value: fetchnetflowuser } = useSelector(
    (state: RootState) => state.fetchnetflowuser
  );

  // setTimeout(() => {
  //   setShowUserDetails({
  //     usr_id: "a8acbe47-af3e-40bb-8aaf-35a08c847bbe",
  //     date_added: "2025-04-30T10:47:02.941000+05:30",
  //     date_updated: "2025-04-30T10:56:03.307000+05:30",
  //     src_connection_count: 34,
  //     dst_connection_count: 34,
  //     // malicous_ccount: null,
  //     ip: "142.93.189.58",
  //     ip_version: "4",
  //     asn: "AS14061",
  //     geo_location: {
  //       city: "North Bergen",
  //       continent: "North America",
  //       country: "United States",
  //       iso_code: "US",
  //       latitude: 40.8054,
  //       longitude: -74.0241,
  //       subdivision: "New Jersey",
  //     },
  //     // malicous_crefs: null,
  //     schema_version: 1,
  //     country_code: "US",
  //   });
  // }, 500);

  useEffect(() => {
    dispatch(fetchNetflowThunk({}));
  }, []);

  useLayoutEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.offsetHeight);
    }
  }, [fetchData, showUserDetails]); // Re-measure on data load or visibility change
  
  useEffect(() => {
    let tempFilters = { ...filters };
    if (tempFilters["country_code"]) {
      tempFilters["country_code"] = tempFilters["country_code"].map(
        getIsoCodeFromCountryName
      );
    }
    dispatch(
      setFetchNetflowSliceState({
        ...fetchnetflowuser,
        query: {
          ...fetchnetflowuser.query,
          params: {
            ...fetchnetflowuser.query.params,
            page,
            sort_by: sort.sortBy,
            sort_order: sort.sortOrder,
            search_key: searchKey,
            date_from: dateFrom ? dateFrom.toISOString().slice(0, 10) : null,
            date_to: dateTo ? dateTo.toISOString().slice(0, 10) : null,
          },
          body: {
            ...fetchnetflowuser.query.body,
            filters: tempFilters,
          },
        },
      })
    );
    dispatch(fetchNetflowThunk({}));
  }, [page, sort, searchKey, dateFrom, dateTo, filters]);

  useEffect(() => {
    if (fetchData?.data && fetchData.data.length > 0) {
      setShowUserDetails(fetchData.data[0]);
    }
  }, [fetchData]);

  useEffect(() => {
    setShowUserDetails(null);
  }, [page, sort, searchKey, dateFrom, dateTo, filters]);

  return (
    <div className={`${className} p-6`}>
      <UserPageSubNav
        className={`mb-6`}
        searchKey={searchKey}
        setFilters={setFilters}
        setSearchKey={setSearchKey}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        filters={filters}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
      <div className={``}>
        {fetchLoading ? (
          <BufferSVG className={`mx-auto mt-20 h-10 w-10 animate-spin`} />
        ) : (
          <></>
        )}
        {fetchSuccess && fetchData ? (
          <>
            <div className={`flex items-stretch overflow-y-auto h-full gap-5`}>
              <UserTable
                className={`px-5 ${showUserDetails != null ? "w-3/5" : "w-full"
                  } transition-all duration-1000 ease-in-out`}
                sort={sort}
                setSort={setSort}
                ref={tableRef}
                data={fetchData?.data}
                showUserDetails={showUserDetails}
                setShowUserDetails={setShowUserDetails}
              />
              {showUserDetails && (
                <UserDetailsCard
                  className={`mb-8 overflow-y-scroll h-[868px]`}
                  data={showUserDetails}
                  setData={setShowUserDetails}
                />
              )}
            </div>
            <div className="w-screen bg-white rounded-sm p-3">
              <PaginationComponent
                className={`flex justify-center`}
                meta={fetchData as Pagination}
                setPage={setPage}
              />
            </div>

          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserPage;
