import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import AppPage from '../../components/page/page';

function Home() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return <p>a</p>;
}

export default Home;
