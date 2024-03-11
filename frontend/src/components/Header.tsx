import { Key, ReactNode } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { AlertOutlined, InboxOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: ReactNode,
  key?: Key | null,
  icon?: ReactNode,
  children?: MenuItem[],
  theme?: 'light' | 'dark',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    theme,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link to="/">Home</Link>,
    'home',
    <HomeOutlined />
  ),
  getItem(
    <Link to="/create">New Cliente</Link>,
    'create_client',
    <AlertOutlined />
  ),
  getItem(
    <Link to="/table">List Clients</Link>,
    'list_clients',
    <InboxOutlined />
  ),
  getItem(
    <Link to="/map-clients">Map Clients</Link>,
    'map_clients',
    <InboxOutlined />
  ),

];

const Header = () => {

  return (
    <>
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        className='sider-pattern'
        theme='light'
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['home']}
          items={items}
        />
      </Layout.Sider>
    </>
  );
};

export default Header;
