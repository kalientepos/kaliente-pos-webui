import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page/page";
import AdministrationService from "../../services/administration-service";

function PersonnelList() {
    const adminService = new AdministrationService();
    const [isLoadingPersonnel, setLoadingPersonnel] = useState(false);
    const [personnelList, setPersonnelList] = useState([]);
    const navigate = useNavigate();

    const operationsBody = (rowData: any) => (
        <div>
            {/* <Button className="mr-1 p-button-primary" title='Edit' label="Edit" onClick={() => navigate(`./update/${rowData.id}`)}/> */}
            {/* <Button className="mr-1 p-button-info" title='Details' label="Details" /> */}
            <Button className="p-button-danger" title='Delete' label="Delete"  />
        </div>
    );

    const fetchPersonnelList = useCallback(async () => {
        const response = await adminService.getPersonnelList();
        console.log(response);
        setPersonnelList(response.data.payload['foundPersonnel']);
    }, []);

    useEffect(() => {
        fetchPersonnelList();
    }, []);
    
    return (
        <Page>
            <Page showDrawer contentClasses="align-items-stretch justify-content-center ml-3 mr-3">
            <p className="mt-3 mb-3 text-center text-2xl text-primary font-bold">Personnel</p>
            <Button className="mb-3 p-button-success w-full" label="Register New Personnel" onClick={() => navigate('./add')} />
            <DataTable value={personnelList} rows={personnelList.length} responsiveLayout="scroll">
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