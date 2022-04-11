import { Button } from "primereact/button";
import React from "react";

const DrawerItemHeader: React.FC<{title: string, icon?: string, onToggle?: any}> = ({title, icon,  onToggle}) => {
    return (
        <div className="w-full">
            <Button className="p-button-rounded w-full" icon={icon} label={title} onClick={onToggle && onToggle}></Button>
        </div>
    );
}

export default DrawerItemHeader;