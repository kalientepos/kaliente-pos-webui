import React from "react";
import Drawer from "../drawer/drawer";
import './page.scss';

interface PageProps {
    classes?: string,
    contentClasses?: string,
    children?: JSX.Element | JSX.Element[];
    showDrawer?: boolean
};

const defaultContentClasses: string = 'flex flex-column justify-content-start align-items-center';

const Page: React.FC<PageProps> = ({classes = '', contentClasses = defaultContentClasses, children, showDrawer = false}) => {
    return (
        <div className={`page flex flex-row justify-content-start align-items-stretch ${classes} m-0 p-0`}>
            {(showDrawer) && <Drawer className="m-0 p-0 w-2" title="Kaliente POS"/>}
            <div className={`m-0 p-0 page-content ${contentClasses} ${showDrawer ? 'w-10': 'w-full'}`}>{children}</div>
        </div>
    );
};

export default Page;