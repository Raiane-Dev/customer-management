import { useEffect, useRef, useState } from 'react';
import apiService from "../services/apiService"

import { SearchOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

type InputRef = GetRef<typeof Input>;

interface Client {
    id?: number;
    name: string,
    email: string,
    phone: string,
    coordinate: any,
}
type DataIndex = keyof Client;

const ListClients = () => {
    const [data, setData] = useState([]);
    const [mutex, setMutex] = useState(0);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const search = (dataIndex: any): TableColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    useEffect(() => {
        apiService.get("/clients")
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.log(err)
            });
    }, [mutex]);

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...search('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...search('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            ...search('phone'),
        },
        {
            title: 'Coordinates (x, y)',
            dataIndex: 'coordinate',
            key: 'coordinate',
            render: (_: any, record: any) => `(${record.coordinate.x}, ${record.coordinate.y})`,
        },
    ];

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="index"
                    pagination={false}

                />
            </Space>
        </>
    );
};

export default ListClients;
