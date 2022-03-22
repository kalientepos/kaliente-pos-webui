import React from "react";
import './page.scss';

interface PageProps {
    classes?: string,
    children?: JSX.Element | JSX.Element[];
};

const Page: React.FC<PageProps> = ({classes = '', children}) => {
    return (
        <div className={`page ${classes}`}>
            {children}
        </div>
    );
};

export default Page;