import { ReactNode } from "react";
import { UserNetflow } from "../../types/schema";

import XSvg from "../../assets/react/X";
import CountryFlag from "../misc/CountryFlag";
import { getCountryName } from "../../utils/country";

type Props = {
  data: UserNetflow;
  setData: React.Dispatch<React.SetStateAction<UserNetflow | null>>;
  className?: string;
};

const UserDetailsCard = ({ data, setData, className }: Props) => {
  return (
    <div
      className={`w-full bg-white shadow-sm border-t-1 border-t-ter-1000 rouded-lg ${className}`}
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
            <p className={`text-sm text-gray-500 mb-1`}>
              Source Connections
            </p>
            <p className={`text-sm text-gray-700`}>{data.src_connection_count}</p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>
              Destination Connections
            </p>
            <p className={`text-sm text-gray-700`}>{data.dst_connection_count}</p>
          </div>
          <div className={`flex flex-col justify-between h-full`}>
            <p className={`text-sm text-gray-500 mb-1`}>Malicious Connections</p>
            <p className={`text-sm text-gray-700`}>{data.malicious_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetailsCard;
