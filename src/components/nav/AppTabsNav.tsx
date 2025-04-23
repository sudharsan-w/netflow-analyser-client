import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AppTabsMeta } from "../../consts";
import { AppTabs } from "../../types/enums";

type Props = {
  className?: String;
};

const AppTabsNav = ({ className }: Props): ReactNode => {
    const location = useLocation()
    const navigate = useNavigate()
    return <div className={`${className} flex justify-between`}>
        { 
            Object.keys(AppTabsMeta).map((key: AppTabs): ReactNode => {
                let isChoosen = AppTabsMeta[key].route == location.pathname
                return (
                    <div className={`rounded-xl font-sans text-lg py-2 px-2 mr-4  cursor-pointer w-1/4 text-center
                        ${isChoosen ? '' : 'hover:bg-ter-750 '}
                        ${isChoosen ? 'bg-pri-250 text-pri-1000' : 'text-txt-1000'}`}
                    onClick={()=>navigate(AppTabsMeta[key].route)}>
                        {AppTabsMeta[key].displayName }
                    </div>
                )
            })
        }
  </div>;
};

export default AppTabsNav;
