import { ReactNode } from "react";

import { Pagination } from "../../types/types";
import { range } from "../../utils";
import ArrowSVG from "../../assets/react/Arrow";

type Props = {
  className?: String;
  meta: Pagination;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ className, meta, setPage }: Props): ReactNode => {
  return (
    <div className={`${className} flex space-x-2`}>
      <div
        className={`-rotate-180 rounded-lg text-lg px-2 py-2 bg-ter-250 cursor-pointer text-txt-1000 hover:bg-ter-500 `}
        onClick={() => {
          if (meta.has_prev_pages) {
            setPage(meta.page_no - 1);
          }
        }}
      >
        <ArrowSVG
          className={`h-6 w-6 cursor-pointer ${
            meta.has_prev_pages ? "fill-txt-1000" : "fill-gray-200"
          }`}
        />
      </div>
      {[...range(meta.page_no, meta.pages_till, 1)].map(
        (page_num): ReactNode => {
          return (
            <div
              className={`rounded-lg text-lg px-2 py-2 bg-ter-250 cursor-pointer text-txt-1000 
              ${page_num == meta.page_no ? "bg-ter-750" : "hover:bg-ter-500"}  
              `}
              onClick={() => setPage(page_num)}
            >
              {page_num}
            </div>
          );
        }
      )}
      <div
        className={`rounded-lg text-lg px-2 py-2 bg-ter-250 cursor-pointer text-txt-1000 hover:bg-ter-500`}
        onClick={() => {
          if (meta.has_next_pages) {
            setPage(meta.pages_till + 1);
          }
        }}
      >
        <ArrowSVG
          className={`h-6 w-6 cursor-pointer ${
            meta.has_next_pages ? "fill-txt-1000" : "fill-gray-200"
          }`}
        />
      </div>
    </div>
  );
};

export default Pagination;
