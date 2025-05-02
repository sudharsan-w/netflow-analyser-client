import { ReactNode, useEffect, useState } from "react";
import { UserNetflow } from "../../types/schema";

import XSvg from "../../assets/react/X";
import BufferSVG from "../../assets/react/Buffer.tsx";
import CountryFlag from "../misc/CountryFlag";
import { getCountryName } from "../../utils/country";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux_store/store";
import { useDispatch } from "react-redux";
import {
  fetchProtoDistThunk,
  setFetchProtoDistSlice,
  setFetchProtoDistSliceInitialState,
} from "../../redux_store/features/fetchprotodist";
import {
  fetchFlowDistThunk,
  setFetchFlowDistSlice,
  setFetchFlowDistSliceInitialState,
} from "../../redux_store/features/fetchflowdist";
import SimpleSelect from "../select/SimpleSelect.tsx";
import { TimeGranularity } from "../../types/types.ts";

type Props = {
  data: UserNetflow;
  setData: React.Dispatch<React.SetStateAction<UserNetflow | null>>;
  className?: string;
};

enum TimeRange {
  PAST_5MIN = "past_5min",
  PAST_1HR = "past_1hr",
  PAST_24HRS = "past_24_hrs",
}

const TimeRangeMeta: {
  [key in TimeRange]: {
    displayName: string;
    value: string;
  };
} = {
  [TimeRange.PAST_5MIN]: {
    displayName: "Past 5 mins",
    value: TimeRange.PAST_5MIN,
  },
  [TimeRange.PAST_1HR]: {
    displayName: "Past 1 hr",
    value: TimeRange.PAST_1HR,
  },
  [TimeRange.PAST_24HRS]: {
    displayName: "Past 24 hrs",
    value: TimeRange.PAST_24HRS,
  },
};

const handleTimeRanges = (tr: TimeRange): [Date | null, Date | null, TimeGranularity] => {
  let curr_dt = new Date();
  let st_date: Date | null = null,
    en_date: Date | null = null;
  let granularity: TimeGranularity = "day";
  switch (tr) {
    case TimeRange.PAST_5MIN:
      st_date = new Date(curr_dt.getTime() - 300 * 1000);
      en_date = curr_dt;
      granularity = "minute";
      break;
    case TimeRange.PAST_1HR:
      st_date = new Date(curr_dt.getTime() - 60 * 60 * 1000);
      en_date = curr_dt;
      granularity = "minute";
      break;
    case TimeRange.PAST_24HRS:
      st_date = new Date(curr_dt.getTime() - 24 * 60 * 60 * 1000);
      en_date = curr_dt;
      granularity = "hour";
      break;
  }
  return [st_date, en_date, granularity];
};

const UserDetailsCard = ({ data, setData, className }: Props): ReactNode => {
  const dispatch = useDispatch<AppDispatch>();
  const COLORS = [
    "rgba(33, 113, 181, 1)",
    "rgba(175, 148, 201, 1)",
    "rgba(174, 78, 109, 1)",
    "rgba(162, 172, 189, 1)",
  ];
  const [flowTimeRange, setFlowTimeRange] = useState<TimeRange>(
    TimeRange.PAST_24HRS
  );
  const [protoTimeRange, setProtoTimeRange] = useState<TimeRange>(
    TimeRange.PAST_24HRS
  );
  const {
    value: {
      success: fetchSuccess,
      error: fetchError,
      data: fetchData,
      loading: fetchLoading,
      query: fetchQuery,
    },
  } = useSelector((state: RootState) => state.fetchprotodist);

  const { value: fetchprotodist } = useSelector(
    (state: RootState) => state.fetchprotodist
  );
  const {
    value: {
      success: flowFetchSuccess,
      error: flowFetchError,
      data: flowFetchData,
      loading: flowFetchLoading,
      query: flowFetchQuery,
    },
  } = useSelector((state: RootState) => state.fetchflowdist);

  const { value: fetchflowdist } = useSelector(
    (state: RootState) => state.fetchflowdist
  );

  const fetchProto = () => {
    const [stDate, enDate, _] = handleTimeRanges(protoTimeRange);
    dispatch(
      setFetchProtoDistSlice({
        ...fetchprotodist,
        query: {
          ...fetchprotodist.query,
          params: {
            ...fetchprotodist.query.params,
            date_from: stDate?.toISOString().slice(0, 19),
            date_to: enDate?.toISOString().slice(0, 19),
          },
          body: {
            ...fetchprotodist.query.body,
            filters: {
              ...fetchprotodist.query.body.filters,
              src_addr: [data.ip],
            },
          },
        },
      })
    );
    dispatch(fetchProtoDistThunk({}));
  };

  const fetchFlow = () => {
    const [stDate, enDate, granularity] = handleTimeRanges(flowTimeRange);
    dispatch(
      setFetchFlowDistSlice({
        ...fetchflowdist,
        query: {
          ...fetchflowdist.query,
          params: {
            ...fetchflowdist.query.params,
            granularity: granularity,
            date_from: stDate?.toISOString().slice(0, 19),
            date_to: enDate?.toISOString().slice(0, 19),
          },
          body: {
            ...fetchflowdist.query.body,
            filters: {
              ...fetchflowdist.query.body.filters,
              src_addr: [data.ip],
            },
          },
        },
      })
    );
    dispatch(fetchFlowDistThunk({}));
  };

  useEffect(() => {
    dispatch(setFetchProtoDistSliceInitialState());
    dispatch(setFetchFlowDistSliceInitialState());
    fetchProto();
    fetchFlow();
  }, [data]);
  useEffect(() => {
    fetchProto();
  }, [protoTimeRange]);
  useEffect(() => {
    fetchFlow();
  }, [flowTimeRange]);

  return (
    <div
      className={`w-full bg-white shadow-sm border-t-1 border-t-ter-1000 rouded-lg overflow-y-scroll h-[70vh] pb-10 ${className}`}
    >
      <div
        className={`px-8 mb-4 flex justify-between items-center w-full h-16 `}
      >
        <span className={`text-2xl font-bold `}> User Details</span>
        <XSvg
          className={`fill-gray-400  h-6 w-6 cursor-pointer`}
          onClick={() => setData(null)}
        />
      </div>
      <div className={`px-8`}>
        <div className={`grid grid-cols-4 gap-4`}>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>Ip Address</p>
            <p className={`text-sm text-gray-700`}>{data.ip}</p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>ASN</p>
            <p className={`text-sm text-gray-700`}>{data.asn}</p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>Location</p>
            <p className={`text-sm text-gray-700`}>
              {getCountryName(data.country_code ?? "")}
              <CountryFlag
                isoCode={data.country_code ?? ""}
                className={`inline-block pl-2`}
                width={28}
                height={21}
              />
            </p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>First Seen (IST)</p>
            <p className={`text-sm text-gray-700`}>
              {data.date_added.slice(0, 19).replace("T", ", ")}
            </p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>Last Seen (IST)</p>
            <p className={`text-sm text-gray-700`}>
              {data.date_updated?.slice(0, 19).replace("T", ", ")}
            </p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>Source Connections</p>
            <p className={`text-sm text-gray-700`}>
              {data.src_connection_count}
            </p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>
              Destination Connections
            </p>
            <p className={`text-sm text-gray-700`}>
              {data.dst_connection_count}
            </p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>
              Malicious Connections
            </p>
            <p className={`text-sm text-gray-700`}>{data.malicious_count}</p>
          </div>
        </div>
      </div>
      <div className={`px-8 mt-4 `}>
        <div
          className={`h-96 border-t-1 border-t-ter-1000 shadow-lg px-4 py-4`}
        >
          <div className={`flex justify-between`}>
            <p className={`text-xl font-bold`}>Protocol Distribution</p>
            {/* <div className={ `flex space-x-10`}>
              <CustomDateFrom dateFrom={dateFrom} setDateFrom={setDateFrom} className={`h-8 w-40 outline-none`}/>
              <CustomDateTo dateTo={dateTo} setDateTo={setDateTo} className={`h-8 w-40 outline-none`}/>
            </div> */}
            <SimpleSelect
              options={Object.entries(TimeRangeMeta).map(([_, v]) => v)}
              selectedOption={protoTimeRange}
              setSelectedOption={setProtoTimeRange}
            />
          </div>
          {fetchLoading ? (
            <BufferSVG className={`mx-auto h-10 w-10 animate-spin`} />
          ) : (
            <div className={`flex w-full h-80 `}>
              <ResponsiveContainer className={`flex-2/3`}>
                <PieChart>
                  <Pie
                    data={fetchData?.dist}
                    dataKey="count"
                    nameKey="proto"
                    innerRadius={50}
                    outerRadius={100}
                    // paddingAngle={5}
                    cornerRadius={6}
                    isAnimationActive={true}
                  >
                    {fetchData?.dist.map((_, index) => (
                      <Cell
                        radius={`34`}
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className={`flex justify-center items-center flex-1/3`}>
                <div>
                  {fetchData?.dist.map((e, index) => (
                    <div className={`mt-2 overflow-scroll`}>
                      <span
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                        className={`w-1 p-1 rounded-lg mr-1`}
                      ></span>
                      <span>{e.proto}</span>
                      {/* <span>aksmdamskf</span> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`px-8 mt-4 `}>
        <div
          className={`h-96 border-t-1 border-t-ter-1000 shadow-lg px-4 py-4`}
        >
          <div className={`flex justify-between`}>
            <p className={`text-xl font-bold`}>Flow Distribution</p>
            <SimpleSelect
              options={Object.entries(TimeRangeMeta).map(([_, v]) => v)}
              selectedOption={flowTimeRange}
              setSelectedOption={setFlowTimeRange}
            />
          </div>
          {fetchLoading ? (
            <BufferSVG className={`mx-auto w-10 animate-spin`} />
          ) : (
            <div className={`flex w-full h-80 `}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={flowFetchData?.dist}
                  margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bucket" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke={COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserDetailsCard;
