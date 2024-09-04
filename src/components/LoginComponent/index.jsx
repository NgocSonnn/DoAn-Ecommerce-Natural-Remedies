import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss'
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const LoginComponent = () => {
    const onFinish = (values) => {
        console.log('Received values:', values);
    }
    return (
        <div className="login-form-container">
            <h2>Đăng Nhập</h2>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ maxWidth: '100%' }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Tên người dùng"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item>
                    <Link to={ROUTES.REGISTER_PAGE} style={{ display: 'flex', justifyContent: "end", paddingBottom: "10px", color: "#81c408", fontSize: "16px" }} className="login-form-forgot" >
                        Bạn chưa có tài khoản?
                    </Link>
                    <Button type="primary" htmlType="submit">
                        Đăng Nhập
                    </Button>
                </Form.Item>
            </Form>


        </div>
    );
};

export default LoginComponent