import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// import FlowPageSubNav from "../nav/FlowPageSubNav";
import BufferSVG from "../../assets/react/Buffer.tsx";
import { Sort, Pagination, Filters } from "../../types/types";
import PaginationComponent from "../pagination/Pagination";

import { RootState, AppDispatch } from "../../redux_store/store";
import { getIsoCodeFromCountryName } from "../../utils/country.ts";
import AlertTable from "../tables/AlertTable.tsx";
import {
  fetchNetflowAlertThunk,
  setFetchNetflowAlertSliceState,
} from "../../redux_store/features/fetchnetflowalerts.ts";
import AlertPageSubNav from "../nav/AlertPageSubNav.tsx";
type Props = {
  className?: String;
};

const AlertPage = ({ className }: Props): ReactNode => {
  const dispatch = useDispatch<AppDispatch>();

  const [sort, setSort] = useState<Sort>({ sortBy: "first_seen", sortOrder: "desc" });
  const [page, setPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<String>("");
  const [filters, setFilters] = useState<Filters>({});
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const {
    value: {
      success: fetchSuccess,
      error: fetchError,
      data: fetchData,
      loading: fetchLoading,
      query: fetchQuery,
    },
  } = useSelector((state: RootState) => state.fetchnetflowalert);
  const { value: fetchnetflow } = useSelector(
    (state: RootState) => state.fetchnetflowalert
  );
  useEffect(() => {
    dispatch(fetchNetflowAlertThunk({}));
  }, []);

  useEffect(() => {
    let tempFilters = { ...filters };
    if (tempFilters["src_country_code"]) {
      tempFilters["src_country_code"] = tempFilters["src_country_code"].map(
        getIsoCodeFromCountryName
      );
    }
    if (tempFilters["dst_country_code"]) {
      tempFilters["dst_country_code"] = tempFilters["dst_country_code"].map(
        getIsoCodeFromCountryName
      );
    }
    dispatch(
      setFetchNetflowAlertSliceState({
        ...fetchnetflow,
        query: {
          ...fetchnetflow.query,
          params: {
            ...fetchnetflow.query.params,
            page,
            limit: 10,
            sort_by: sort.sortBy,
            sort_order: sort.sortOrder,
            search_key: searchKey,
            date_from: dateFrom ? dateFrom.toISOString().slice(0, 10) : null,
            date_to: dateTo ? dateTo.toISOString().slice(0, 10) : null,
          },
          body: {
            ...fetchnetflow.query.body,
            filters: tempFilters,
          },
        },
      })
    );
    dispatch(fetchNetflowAlertThunk({}));
  }, [page, sort, searchKey, filters, dateFrom, dateTo]);

  return (
    <div className={`${className}`}>
      <AlertPageSubNav
        className={`mb-6 pt-2`}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        setFilters={setFilters}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        dateTo={dateTo}
        dateFrom={dateFrom}
        filters={filters}
      />
      <div className={``}>
        {fetchLoading ? (
          <BufferSVG className={`mx-auto mt-20 h-10 w-10 animate-spin`} />
        ) : (
          <></>
        )}
        {fetchSuccess && fetchData ? (
          <>
            <AlertTable
              className={`px-10 mb-8`}
              sort={sort}
              setSort={setSort}
              data={fetchData?.data}
            />
            <PaginationComponent
              className={`flex justify-center`}
              meta={fetchData as Pagination}
              setPage={setPage}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AlertPage;
