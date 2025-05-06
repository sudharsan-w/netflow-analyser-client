import { ReactNode } from "react";

import TopBar from "../nav/TopBar";

type Props = {
  children?: ReactNode;
  className?: String;
};

const Layout: React.FC<Props> = ({ children, className }: Props) => {

  return <div className={`${className}`}>
    <TopBar className={`mb-2`} />
    {children}
  </div>;
};

export default Layout;
