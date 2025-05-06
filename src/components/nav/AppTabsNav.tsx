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
            Object.entries(AppTabsMeta).map(([_, val], idx): ReactNode => {
                let isChoosen = val.route == location.pathname
                return (
                    <div key={idx} className={`flex items-center justify-center rounded-2xl font-sans text-md py-0.5 px-2 mr-4 cursor-pointer w-1/4 text-center
                        ${isChoosen ? '' : 'hover:bg-ter-750 '}
                        ${isChoosen ? 'bg-pri-250 text-pri-1000' : 'text-txt-1000'}`}
                        onClick={() => navigate(val.route)}>
                        {val.displayName}
                    </div>
                )
            })
        }
    </div>;
};

export default AppTabsNav;
