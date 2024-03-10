import { ConfigProvider, Layout } from 'antd';
import CreateClient from './components/CreateClient';
import { Routes, Route } from 'react-router-dom';
import './App.less'
import Home from './components/Home';
import ListClients from './components/ListClients';
import Header from './components/Header';
import Footer from './components/Footer';
import MapClients from './components/MapClients';

const App = () => {
  return (
    <>
      <ConfigProvider>
                <Layout className='layout-pattern'>
                  <Header />
                    <Layout>
                        <Layout.Content className='content-pattern'>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/table" element={<ListClients />} />
                        <Route path="/create" element={<CreateClient />} />
                        <Route path="/map-clients" element={<MapClients />} />
                      </Routes>
                    </Layout.Content>
                    <Footer />
                  </Layout>
                </Layout>
      </ConfigProvider>
    </>
  );
};

export default App;
