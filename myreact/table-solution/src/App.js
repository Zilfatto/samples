import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Cheques from './features/cheques/Cheques';
import { Layout } from 'antd';
import { loadCheques } from './features/cheques/ChequesSlice';
import './App.css';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const { Content } = Layout;

  useEffect(() => {
    // Load the data
    dispatch(loadCheques());
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <Layout className="mainLayout">
        <Content>
          <Cheques />
        </Content>
      </Layout>
    </React.Fragment>
  );
};

export default App;
