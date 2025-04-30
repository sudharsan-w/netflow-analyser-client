import { ReactNode, useState } from "react";

import { Pagination } from "../../types/types";
import { range } from "../../utils";
import ArrowSVG from "../../assets/react/Arrow";

type Props = {
  className?: String;
  meta: Pagination;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PaginationComponent = ({
  className,
  meta,
  setPage,
}: Props): ReactNode => {
  const [gotoPage, setGotoPage] = useState<number | null>(null);
  if (meta.page_no == 0) {
    return <></>;
  }
  return (
    <div className={`${className} flex  text-sm`}>
      <div className={`flex space-x-2`}>
        <div
          className={`-rotate-180 rounded-lg text-lg px-2 py-2 bg-ter-250 cursor-pointer text-txt-1000 hover:bg-ter-500 `}
          onClick={() => {
            if (meta.has_prev_pages) {
              setPage(Math.max(meta.page_no - 10, 1));
            }
          }}
        >
          <ArrowSVG
            className={`h-6 w-6 cursor-pointer ${
              meta.has_prev_pages ? "fill-txt-1000" : "fill-gray-200"
            }`}
          />
        </div>
        {[...range(meta.page_no, meta.pages_till + 1, 1)].map(
          (page_num): ReactNode => {
            return (
              <div
                className={`rounded-lg text-lg px-2 py-2 bg-ter-250 cursor-pointer text-txt-1000 
              ${
                page_num == meta.page_no ? "bg-ter-1000" : "hover:bg-ter-1000"
              }  
              `}
                onClick={() => setPage(page_num)}
              >
                {page_num}
              </div>
            );
          }
        )}
        <div
          className={`rounded-lg px-2 py-2 bg-ter-250 cursor-pointer text-txt-1000 hover:bg-ter-500 text-sm`}
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
      <div
        className={`flex justify-center items-center bg-ter-750 rounded-lg ml-1 px-2 text-sm`}
      >
        <span className={`text-gray-500 mr-1`}>Go to Page</span>
        <input
          className={`outline-none  w-16 text-gray-500`}
          type={`number`}
          onChange={(e) => {
            let val = e.target.value;
            setGotoPage(Number.parseInt(val));
          }}
        />
        <ArrowSVG
          className={`h-6 w-6 cursor-pointer ${
            meta.has_next_pages ? "fill-gray-500" : "fill-gray-200"
          }`}
          onClick={() => {
            if (gotoPage !== null) {
              setPage(gotoPage);
            }
          }}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
