import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actLogin } from '../../redux/features/user/userSlice';



const LoginComponent = () => {
    const { isLogin } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        if (isLogin) {
            navigate(ROUTES.PAGE_404)
            message.warning("Bạn cần đăng nhập để vào trang này!")

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loginSchema = Yup.object().shape({
        phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại!'),
        password: Yup.string().required('Vui lòng nhập mật khẩu!'),
    });
    const method = useForm({
        defaultValues: {
            phoneNumber: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    });

    const { control, handleSubmit, formState: { errors }, reset } = method;

    const onValid = async (formValue) => {
        try {
            await dispatch(actLogin(formValue)).unwrap();
            navigate(ROUTES.HOME_PAGE);
        } catch (error) {
            reset();
        }
    };

    const handleRedirectToRegisterPage = () => {
        navigate(ROUTES.REGISTER_PAGE);
    };

    return (
        <div className="login-form-container">
            <h2>Đăng Nhập</h2>
            <Form
                name="login"
                onFinish={handleSubmit(onValid)}
                style={{ maxWidth: '100%' }}
            >
                <Form.Item
                    name="phoneNumber"
                    validateStatus={errors.phoneNumber ? 'error' : ''}
                    help={errors.phoneNumber?.message}
                >
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Số điện thoại"
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input.Password
                                {...field}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Mật khẩu"
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{ border: "none", display: 'flex', justifyContent: 'end', paddingBottom: '10px', color: '#81c408', fontSize: '16px' }}
                        className="login-form-forgot"
                        onClick={handleRedirectToRegisterPage}
                    >
                        Bạn chưa có tài khoản?
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Đăng Nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginComponent;
