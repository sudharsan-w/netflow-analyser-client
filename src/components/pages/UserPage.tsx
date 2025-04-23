import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserTable from "../tables/UserTable";
import UserPageSubNav from "../nav/UserPageSubNav";
import BufferSVG from "../../assets/react/Buffer.tsx";
import { Sort, Pagination } from "../../types/types";
import PaginationComponent from "../pagination/Pagination";

import { RootState, AppDispatch } from "../../redux_store/store";
import {
  fetchNetflowThunk,
  setFetchNetflowSliceState,
} from "../../redux_store/features/fetchnetflowuser.ts";
type Props = {
  className?: String;
};

const UserPage = ({ className }: Props): ReactNode => {
  const dispatch = useDispatch<AppDispatch>();

  const [sort, setSort] = useState<Sort>({ sortBy: null, sortOrder: "asc" });
  const [page, setPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<String>("");
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
  } = useSelector((state: RootState) => state.fetchnetflowuser);
  const { value: fetchnetflowuser } = useSelector(
    (state: RootState) => state.fetchnetflowuser
  );

  useEffect(() => {
    dispatch(fetchNetflowThunk({}));
  }, []);

  useEffect(() => {
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
            date_from: dateFrom?dateFrom.toISOString().slice(0,10):null,
            date_to: dateTo?dateTo.toISOString().slice(0,10):null
          },
        },
      })
    );
    dispatch(fetchNetflowThunk({}));
  }, [page, sort, searchKey, dateFrom, dateTo]);

  return (
    <div className={`${className}`}>
      <UserPageSubNav
        className={`mb-6`}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
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
            <UserTable
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

export default UserPage;
