
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppPage from "../../components/page/page";

function Error() {
    const navigate = useNavigate();

    return (
        <div>
            <p>Could not find the requested location.</p>
            <Button title="Go Back" onClick={() => navigate('/')}/>
        </div>
    )
};

export default Error;