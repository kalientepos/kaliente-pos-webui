import React from "react";
import AnimateHeight from "react-animate-height";
import "./drawer-item-body.scss";

const DrawerItemBody: React.FC<{toggleState: boolean}> = ({children, toggleState}) => {
    return (
    <div className="drawer-item-body flex justify-content-start">
        <AnimateHeight style={{flexShrink: 0}} duration={300} height={(toggleState) ? 'auto': 0}>
            <div className='drawer-item-body flex flex-column w-full'>
                {children}
            </div>
        </AnimateHeight>
    </div>
    );
}

export default DrawerItemBody;