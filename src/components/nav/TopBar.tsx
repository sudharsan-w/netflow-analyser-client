import { ReactNode } from "react";

import BellIcon from "../../assets/react/Bell";
import SaptabglabsSVG from "../../assets/react/Saptanglabs";

type Props = {
  className?: String;
};

const TopBar = ({ className }: Props): ReactNode => {
  return (
    <div className={`${className} border-border shadow-md`}>
      <div className={`flex justify-between pr-10 py-6`}>
        <SaptabglabsSVG className={ `h-8  p-0`} />
        <BellIcon className={`h-6 w-6 fill-pri-100`} />
      </div>
      <div className={`border-1 border-ter-1000`}></div>
    </div>
  );
};

export default TopBar;
