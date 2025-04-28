import { ReactNode, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FlowTable from "../tables/FlowTable";
import FlowPageSubNav from "../nav/FlowPageSubNav";
import BufferSVG from "../../assets/react/Buffer.tsx";
import { Sort, Pagination, Filters } from "../../types/types";
import PaginationComponent from "../pagination/Pagination";

import { RootState, AppDispatch } from "../../redux_store/store";
import {
  fetchNetflowThunk,
  setFetchNetflowSliceState,
} from "../../redux_store/features/fetchnetflow.ts";
import { getIsoCodeFromCountryName } from "../../utils/country.ts";
type Props = {
  className?: String;
};

const FlowPage = ({ className }: Props): ReactNode => {
  const dispatch = useDispatch<AppDispatch>();

  const [sort, setSort] = useState<Sort>({ sortBy: "first_datetime", sortOrder: "desc" });
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
  } = useSelector((state: RootState) => state.fetchnetflow);
  const { value: fetchnetflow } = useSelector(
    (state: RootState) => state.fetchnetflow
  );
  useEffect(() => {
    dispatch(fetchNetflowThunk({}));
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
      setFetchNetflowSliceState({
        ...fetchnetflow,
        query: {
          ...fetchnetflow.query,
          params: {
            ...fetchnetflow.query.params,
            page,
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
    dispatch(fetchNetflowThunk({}));
  }, [page, sort, searchKey, filters, dateFrom, dateTo]);

  return (
    <div className={`${className}`}>
      <FlowPageSubNav
        className={`mb-6`}
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
            <FlowTable
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

export default FlowPage;
