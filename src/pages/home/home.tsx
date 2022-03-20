import React, { useEffect } from 'react';
import {Button} from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    useEffect(() => {

    }, []);
    
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Welcome to Kaliente POS!</h1>
            <Button title='Administration' onClick={() => navigate('/')}>Administration (WIP)</Button>
            <Button title='Product Catalogues' onClick={() => navigate('/product')}>Products</Button>
            <Button title='Products' onClick={() => navigate('/product-catalogue')}>Product Catalogues</Button>
        </div>
    );
}

export default Home;