
import { Button } from "@mui/material";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppPage from "../../components/page/page";
import AdministrationService from "../../services/administration-service";
import { useAppSelector } from "../../store";
import { removePersonnelsFromPage } from "../../store/slices/administration/administration-slice";
import { getAllPersonnel } from "../../store/slices/administration/administration-thunk";

function PersonnelList() {
    //#region [Hooks]
    const personnelList = useAppSelector(state => state.administration.personnelList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch(getAllPersonnel(null));

        return () => {
            dispatch(removePersonnelsFromPage());
        }
    }, []);
    //#endregion

    const operationsBody = (rowData: any) => (
        <div>
            {/* <Button className="mr-1 p-button-primary" title='Edit' label="Edit" onClick={() => navigate(`./update/${rowData.id}`)}/> */}
            {/* <Button className="mr-1 p-button-info" title='Details' label="Details" /> */}
            <Button title='Delete'  />
        </div>
    );

    
    return (
        <div>
            <p className="mt-3 mb-3 text-center text-2xl text-primary font-bold">Personnel</p>
            {personnelList.isLoading ? <p>Loading...</p> : <br/>}
            <Button className="mb-3 p-button-success w-full" title="Register New Personnel" onClick={() => navigate('./add')} />

        </div>
    );
}

export default PersonnelList;
