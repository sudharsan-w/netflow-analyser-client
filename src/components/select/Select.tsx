import { useCallback, useEffect, useRef, useState } from "react";
import ArrowSVG from "../../assets/react/Arrow";
import XSVG from "../../assets/react/X.tsx";
import DatePicker from "react-datepicker";

interface Props {
  allDataPossibleOptions: string[];
  valueHandler: string[];
  setHandler: any;
  placeholder?: string;
  inputClassName?: string;
  className?: string
}

const DynamicInputSearch = ({
  allDataPossibleOptions,
  inputClassName,
  valueHandler,
  setHandler,
  placeholder,
  className
}: Props) => {
  const [allIndustryList, setAllIndustryList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allPossibleOptions, setAllPossibleOptions] = useState<string[]>([]);
  const [displayAllIndustry, setDisplayAllIndustry] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const allItemsContainer = useRef<HTMLDivElement>(null);

  const handleOptionClick = useCallback(
    (indsutry: string) => {
      let temp = allPossibleOptions.filter((indus) => indus !== indsutry);
      setAllPossibleOptions(temp);

      let tempIndustry = [...valueHandler, indsutry];

      setHandler(tempIndustry);

      setSearchTerm("");
    },
    [allPossibleOptions, setHandler, valueHandler]
  );

  const handleRemoveOption = useCallback(
    (indsutry: string) => {
      let temp = [...valueHandler];
      const index = temp.findIndex(
        (selectedIndustry) => selectedIndustry === indsutry
      );
      console.debug("handleRemoveOption", valueHandler, index)
      if (index !== -1) {
        temp.splice(index, 1);
        setHandler([...temp]);
      }
    },
    [setHandler, valueHandler]
  );

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allPossibleOptions.length > 0) {
      let temp = [...valueHandler, allPossibleOptions[0]];

      setHandler(temp);
      setSearchTerm("");
    }
  };

  const handleBackSpaceCheck = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && searchTerm.length === 0) {
      let temp = valueHandler.slice(0, valueHandler.length - 1);
      setHandler(temp);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDisplayAllIndustry(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    console.debug(allDataPossibleOptions)
    setAllIndustryList(
      allDataPossibleOptions.sort((a, b) => a.localeCompare(b))
    );
  }, [allDataPossibleOptions]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      let temp =
        allIndustryList &&
        allIndustryList.filter((industry) => {
          return !valueHandler.some(
            (selectedCountry) => selectedCountry === industry
          );
        });
      setDisplayAllIndustry(false);
      setAllPossibleOptions(temp);
    } else {
      setDisplayAllIndustry(true);
      let temp =
        allIndustryList &&
        allIndustryList.filter((country) => {
          return (
            !valueHandler.some(
              (selectedCountry) => selectedCountry === country
            ) && country.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });

      setAllPossibleOptions(temp);
    }
  }, [searchTerm, valueHandler, allIndustryList]);

  return (
    <div className={`roudned-md relative flex flex-col ${className} `} ref={ref}>
      <div
        className={`relative flex flex-col flex-wrap  rounded-md border pr-6 hover:cursor-text `}
        onClick={(e) => {
          e.stopPropagation();
          setDisplayAllIndustry(true);
          // inputRef.current?.focus();
        }}
      >
        <ArrowSVG
          className=" absolute right-2 top-2 h-6 w-6 hover:cursor-pointer rotate-90"
          onClick={(e) => {
            e.stopPropagation();
            setDisplayAllIndustry((prev) => !prev);
          }}
        />
        {/* <img
          alt="dropdown"
          src="/icons/chevron-down-updated/grey.svg"
          
          onClick={(e) => {
            e.stopPropagation();
            setDisplayAllIndustry((prev) => !prev);
          }}
        /> */}
        {valueHandler.length === 0 && searchTerm.length === 0 ? (
          <span className=" pointer-events-none absolute bottom-0 left-0 top-0 my-auto select-none px-3 py-2 text-darkmon-grey-200">
            Select {placeholder}
          </span>
        ) : (
          ""
        )}
        <div
          className="scrollHidden flex max-h-[6rem] flex-wrap overflow-y-scroll "
          ref={allItemsContainer}
        >
          {valueHandler.map((industry, idx) => (
            <div
              className="m-1 flex items-center rounded-md bg-pri-250 px-2 py-1 text-[12px] text-[#262626]"
              key={`${industry} ${idx}`}
            >
              <span>{industry.normalize("NFKC")}</span>
              {/* <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleRemoveOption(industry)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#4E4E4E"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{" "}
                </svg>
              </button> */}
              <button className={ `cursor-pointer`} onClick={() => handleRemoveOption(industry)}>
                <XSVG className="text-gray-500 hover:text-gray-700 focus:outline-none fill-black h-4 w-4" />
              </button>
            </div>
          ))}{" "}
        </div>

        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className={`inline-block rounded-md px-3 py-2 shadow-none outline-none  ${inputClassName}`}
            ref={inputRef}
            onKeyDown={handleBackSpaceCheck}
          />
        </form>
      </div>
      {displayAllIndustry && allPossibleOptions.length > 0 ? (
        <ul className="custom-scrollable-container-x z-50 mt-[10px] max-h-[120px] w-full overflow-y-scroll break-words bg-white shadow-[0px_2px_30px_rgba(0,0,0,0.05)] dark:bg-darkmon-dark-400">
          {allPossibleOptions.map((industry, idx) => (
            <button
              className={`w-full cursor-pointer bg-none px-3 py-2 text-left text-[12px] hover:bg-pri-250  focus:bg-pri-250 focus:outline-none ${
                idx === 0
                  ? "rounded-t-md"
                  : idx === allPossibleOptions.length - 1
                  ? "rounded-b-md"
                  : ""
              }`}
              key={`${industry}-show`}
              role="select"
              onClick={() => {
                handleOptionClick(industry);
                // inputRef.current?.focus();
              }}
            >
              {industry.normalize("NFKC")}
            </button>
          ))}
        </ul>
      ) : displayAllIndustry ? (
        <div className=" px-3 py-2 text-darkmon-grey-200">No Results</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DynamicInputSearch;
