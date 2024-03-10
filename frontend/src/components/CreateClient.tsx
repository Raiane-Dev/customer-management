import ClientInput from '../models/client.entity';
import apiService from "../services/apiService"
import { Button, Form, Input, Row, notification } from 'antd';
import { SmileOutlined, MehOutlined } from '@ant-design/icons';


const FormClient = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        apiService.post(
            "/new-client",
            values,
        ).then((response: any) => {
            console.log(response);
            notification.open({
                message: response.statusText,
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });

        })
            .catch(err => {
                notification.open({
                    message: err.response?.statusText ?? "Unable to create",
                    icon: <MehOutlined />,
                });
            })
    };

    return (
        <>
            <Row className="wrapper-form">
                <Form
                    name="basic"
                    className=''
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item<ClientInput>
                        name="name"
                        label="Name"
                        className='input-pattern w100'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a name!',
                            },
                        ]}
                    >
                        <Input
                            className='w100'
                        />
                    </Form.Item>

                    <Form.Item<ClientInput>
                        name="email"
                        label="Email"
                        className='input-pattern w100'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter an email!',
                            },
                        ]}
                    >
                        <Input
                            className='w100'
                        />
                    </Form.Item>

                    <Form.Item<ClientInput>
                        name="phone"
                        label="Phone"
                        className='input-pattern w100'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a name!',
                            },
                        ]}
                    >
                        <Input
                            className='w100'
                        />
                    </Form.Item>

                    <Form.Item<ClientInput>
                        name="coordinate"
                        label="Coordinate"
                        className='input-pattern w100'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a coordinates!',
                            },
                        ]}
                    >
                        <Input
                            defaultValue={"(0, 0)"}
                            className='w100'
                        />
                    </Form.Item>


                    <Form.Item
                        className='w100 end'
                    >
                        <Button
                            className='w25 mt-1'
                            type="primary"
                            htmlType="submit"
                        >
                            Criar
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
        </>
    );
};

export default FormClient;
