import { ReactNode } from "react";

import BellIcon from "../../assets/react/Bell";

type Props = {
  className?: String;
};

const TopBar = ({ className }: Props): ReactNode => {
  return (
    <div className={`${className}`}>
      <div className={`flex justify-between px-10 py-6`}>
        <span className={`font-bold text-2xl`}>Pinaca</span>
        <BellIcon className={`h-6 w-6 fill-pri-100`} />
      </div>
      <div className={`border-1 border-ter-1000`}></div>
    </div>
  );
};

export default TopBar;
