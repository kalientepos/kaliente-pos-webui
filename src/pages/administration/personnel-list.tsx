import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page/page";
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
        dispatch(getAllPersonnel());

        return () => {
            dispatch(removePersonnelsFromPage());
        }
    }, []);
    //#endregion

    const operationsBody = (rowData: any) => (
        <div>
            {/* <Button className="mr-1 p-button-primary" title='Edit' label="Edit" onClick={() => navigate(`./update/${rowData.id}`)}/> */}
            {/* <Button className="mr-1 p-button-info" title='Details' label="Details" /> */}
            <Button className="p-button-danger" title='Delete' label="Delete"  />
        </div>
    );

    
    return (
        <Page>
            <Page showDrawer contentClasses="align-items-stretch justify-content-center ml-3 mr-3">
            <p className="mt-3 mb-3 text-center text-2xl text-primary font-bold">Personnel</p>
            {personnelList.isLoading ? <p>Loading...</p> : <br/>}
            <Button className="mb-3 p-button-success w-full" label="Register New Personnel" onClick={() => navigate('./add')} />
            <DataTable value={personnelList.personnel} rows={personnelList.personnel.length} responsiveLayout="scroll">
                <Column field="email" header="Email"/>
                <Column field="firstName" header="First Name"/>
                <Column field="lastName" header="Last Name"/>
                <Column body={operationsBody} header="Operations" className=""/>
            </DataTable>
        </Page>
        </Page>
    );
}

export default PersonnelList;
