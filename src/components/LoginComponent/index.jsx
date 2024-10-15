import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Modal, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actCheckUserAndResetPassword, actFetchAllUsers, actLogin } from '../../redux/features/user/userSlice';



const LoginComponent = () => {
    const { isLogin, users } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    const handleRedirectToRegisterPage = () => {
        navigate(ROUTES.REGISTER_PAGE);
    };

    const resetPasswordSchema = Yup.object().shape({
        fullName: Yup.string().required("Vui lòng nhập đầy đủ họ và tên"),
        phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại!'),
        email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email!'),
    });

    const resetPasswordMethod = useForm({
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
        },
        resolver: yupResolver(resetPasswordSchema),
    });

    const { control: resetControl, handleSubmit: handleResetSubmit, formState: { errors: resetErrors }, reset: resetResetPassWord } = resetPasswordMethod;
    useEffect(() => {
        dispatch(actFetchAllUsers())
    }, [dispatch])

    const onResetValid = async (formValue) => {
        setIsLoading(true);
        const { fullName, phoneNumber, email } = formValue;
        const foundUser = users.find(
            (user) =>
                user.fullName === fullName &&
                user.phoneNumber === phoneNumber &&
                user.email === email
        );
        if (foundUser) {
            setTimeout(async () => {
                try {
                    dispatch(actCheckUserAndResetPassword({ userId: foundUser.id }));
                    message.success("Mật khẩu đã được thay đổi thành công!");
                    resetResetPassWord();
                    handleCloseModal();
                } catch (error) {
                    message.error("Đã xảy ra lỗi, vui lòng thử lại!");
                } finally {
                    setIsLoading(false);
                }
            }, 3000);

        } else {
            message.error("Thông tin không tồn tại!")
            resetResetPassWord();
            setIsLoading(false)
        }
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
                    <Form.Item>
                        <Button
                            style={{ border: "none", paddingBottom: '10px', color: '#81c408', fontSize: '16px' }}
                            className="login-form-forgot"
                            onClick={handleRedirectToRegisterPage}>
                            Bạn chưa có tài khoản?
                        </Button>
                        <Button style={{ border: "none", paddingBottom: '10px', color: '#81c408', fontSize: '16px' }}
                            onClick={handleOpenModal}
                            className="login-form-forgot">Quên mật khẩu?
                        </Button>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Đăng Nhập
                    </Button>

                </Form.Item>
            </Form>
            <Modal
                className='modal-login'
                title="Đặt lại mật khẩu"
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                {isLoading ? (<Spin size='lagrge'></Spin>) :
                    (<Form
                        name="reset-password"
                        onFinish={handleResetSubmit(onResetValid)}
                        style={{ maxWidth: '100%' }}
                    >
                        <Form.Item>
                            <h5>Để lấy lại mật khẩu bạn cần nhập đúng tên, số điện thoại và email. Sau khi nhập đúng thì mật khẩu của bạn sẽ tự động đổi thành "123456" và bạn có thể thay đổi mật khẩu mới ở thông tin cá nhân.</h5>
                        </Form.Item>
                        <Form.Item
                            validateStatus={resetErrors.fullName ? "error" : ""}
                            help={resetErrors.fullName?.message}
                        >
                            <Controller
                                name="fullName"
                                control={resetControl}
                                render={({ field }) => (
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="Họ và tên"
                                        value={field.value}
                                        {...field}
                                    />
                                )}
                            />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            validateStatus={resetErrors.phoneNumber ? 'error' : ''}
                            help={resetErrors.phoneNumber?.message}
                        >
                            <Controller
                                name="phoneNumber"
                                control={resetControl}
                                render={({ field }) => (
                                    <Input
                                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                                        placeholder="Số điện thoại"
                                        value={field.value}
                                        {...field}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            validateStatus={resetErrors.email ? 'error' : ''}
                            help={resetErrors.email?.message}
                        >
                            <Controller
                                name="email"
                                control={resetControl}
                                render={({ field }) => (
                                    <Input
                                        prefix={<MailOutlined className="site-form-item-icon" />}
                                        placeholder="Email"
                                        value={field.value}
                                        {...field}
                                    />
                                )}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Gửi yêu cầu
                            </Button>
                        </Form.Item>
                    </Form>)}
            </Modal>
        </div>
    );
};

export default LoginComponent;
