import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page/page";

function Error() {
    const navigate = useNavigate();

    return (
        <Page>
            <p>Could not find the requested location.</p>
            <Button label="Return to Dashboard" name="Return Button" onClick={() => navigate('/')}/>
        </Page>
    )
};

export default Error;