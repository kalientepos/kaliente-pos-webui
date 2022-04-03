import React, { useEffect } from 'react';
import {Button} from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Page from '../../components/page/page';

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
    }, []);
    
    return (
        <Page showDrawer>
            {/* <Button className='ml-3 mr-3' title='Administration' onClick={() => navigate('/administration')}>Administration (WIP)</Button>
            <Button className='mr-3' title='Product Catalogues' onClick={() => navigate('/product')}>Products</Button>
            <Button title='Products' onClick={() => navigate('/product-catalogue')}>Product Catalogues</Button> */}
        </Page>
    );
}

export default Home;