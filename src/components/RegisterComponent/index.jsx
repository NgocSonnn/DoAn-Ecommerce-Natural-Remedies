import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import './style.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { actCreateNewUser } from '../../redux/features/user/userSlice';

const { Option } = Select;

const RegisterComponent = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");

    const dispatch = useDispatch()

    const dateFormat = 'DD/MM/YYYY';

    const phoneValidation = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    const emailValidation = /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;

    const schema = Yup.object().shape({
        fullName: Yup.string().required("Vui lòng nhập đầy đủ họ và tên"),
        phoneNumber: Yup.string()
            .required("Vui lòng nhập số điện thoại")
            .matches(phoneValidation, "Số điện thoại không hợp lệ"),
        email: Yup.string()
            .required("Vui lòng nhập email")
            .matches(emailValidation, "Email không hợp lệ"),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
            .max(12, "Mật khẩu không được vượt quá 12 ký tự"),
        confirmPassword: Yup.string()
            .required("Vui lòng xác nhận mật khẩu")
            .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp"),
        birthDay: Yup.date().required("Vui lòng chọn ngày sinh"),
        gender: Yup.string().required("Vui lòng chọn giới tính"),
        province: Yup.string().required("Vui lòng chọn tỉnh/thành phố"),
        district: Yup.string().required("Vui lòng chọn quận/huyện"),
        ward: Yup.string().required("Vui lòng chọn phường/xã"),
        streetAddress: Yup.string().required("Vui lòng nhập địa chỉ chi tiết"),
    });


    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onValid = (formValue) => {
        console.log(formValue, "formValue");
        dispatch(actCreateNewUser(formValue))
        reset();
    };
    //Load provinces
    useEffect(() => {
        axios
            .get("https://provinces.open-api.vn/api/p/")
            .then((response) => {
                setProvinces(response.data);
            })
            .catch((error) => {
                console.error("Error fetching provinces:", error);
            });
    }, []);

    // Load districts
    useEffect(() => {
        if (selectedProvince) {
            axios
                .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
                .then((response) => {
                    setDistricts(response.data.districts);
                    setWards([]);
                })
                .catch((error) => {
                    console.error("Error fetching districts:", error);
                });
        }
    }, [selectedProvince]);

    // Load wards
    useEffect(() => {
        if (selectedDistrict) {
            axios
                .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
                .then((response) => {
                    setWards(response.data.wards);
                })
                .catch((error) => {
                    console.error("Error fetching wards:", error);
                });
        }
    }, [selectedDistrict]);

    const handleProvinceChange = (event) => {
        console.log(event, "provincode");

        const provinceCode = event
        setSelectedProvince(provinceCode);
        setSelectedDistrict("");
        setWards([]);
    }

    const handleDistrictChange = (event) => {
        const districtCode = event
        setSelectedDistrict(districtCode);
        setWards([]);
    };

    const handleWardChange = (event) => {
        const wardCode = event
        setSelectedWard(wardCode);
    };

    const updateDistrictsAndWards = useCallback(async () => {
        if (selectedProvince) {
            try {
                const response = await axios.get(
                    `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
                );
                setDistricts(response.data.districts);

                if (selectedDistrict) {
                    const districtResponse = await axios.get(
                        `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
                    );
                    setWards(districtResponse.data.wards);
                } else {
                    setWards([]);
                }
            } catch (error) {
                console.error("Error fetching districts or wards:", error);
            }
        }
    }, [selectedProvince, selectedDistrict]);


    useEffect(() => {
        updateDistrictsAndWards();
        console.log('hihi');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProvince, selectedDistrict]);

    return (
        <div className="register-form-container">
            <h2>Đăng Ký</h2>
            <Form
                name="register"
                onFinish={handleSubmit(onValid)}
                style={{ maxWidth: '100%' }}
            >
                <Form.Item
                    validateStatus={errors.phoneNumber ? "error" : ""}
                    help={errors.phoneNumber?.message}
                >
                    <Controller
                        name="phoneNumber"
                        control={control}
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
                    validateStatus={errors.password ? "error" : ""}
                    help={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Mật khẩu"
                                value={field.value}
                                {...field}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.confirmPassword ? "error" : ""}
                    help={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Xác nhận mật khẩu"
                                value={field.value}
                                {...field}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.fullName ? "error" : ""}
                    help={errors.fullName?.message}
                >
                    <Controller
                        name="fullName"
                        control={control}
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
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                placeholder="Địa chỉ email"
                                value={field.value}
                                {...field}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.birthDay ? "error" : ""}
                    help={errors.birthDay?.message}
                >
                    <Controller
                        name="birthDay"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                style={{ width: '100%', fontSize: "18px" }}
                                placeholder="Ngày sinh"
                                format={dateFormat}
                                value={field.value}
                                {...field}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.gender ? "error" : ""}
                    help={errors.gender?.message}
                >
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="Chọn giới tính"
                                allowClear
                                value={field.value}
                                {...field}
                            >
                                <Option value="male">Nam</Option>
                                <Option value="female">Nữ</Option>
                                <Option value="other">Khác</Option>
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.province ? "error" : ""}
                    help={errors.province?.message}
                >
                    <Controller
                        name="province"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="Chọn tỉnh/thành phố"
                                allowClear
                                {...field}
                                onChange={(value) => {
                                    handleProvinceChange(value);
                                }}
                                value={field.value}
                            >
                                {provinces.map((province) => (
                                    <Option key={province.code} value={province.code}>
                                        {province.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.district ? "error" : ""}
                    help={errors.district?.message}
                >
                    <Controller
                        name="district"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="Chọn quận/huyện"
                                allowClear
                                onChange={(value) => {
                                    handleDistrictChange(value);
                                    field.onChange(value);
                                }}
                                value={field.value}
                                {...field}
                            >
                                {districts.map((district) => (
                                    <Option key={district.code} value={district.code}>
                                        {district.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.ward ? "error" : ""}
                    help={errors.ward?.message}
                >
                    <Controller
                        name="ward"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="Chọn phường/xã"
                                allowClear
                                onChange={(value) => {
                                    handleWardChange(value);
                                    field.onChange(value);
                                }}
                                value={field.value}
                                {...field}
                            >
                                {wards.map((ward) => (
                                    <Option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.streetAddress ? "error" : ""}
                    help={errors.streetAddress?.message}
                >
                    <Controller
                        name="streetAddress"
                        control={control}
                        render={({ field }) => (
                            <Input
                                prefix={<HomeOutlined className="site-form-item-icon" />}
                                placeholder="Toà nhà, số nhà, tên đường"
                                value={field.value}
                                {...field}
                            />
                        )}
                    />
                </Form.Item>

                <Form.Item>
                    <Link to={ROUTES.LOGIN_PAGE} style={{ display: 'flex', justifyContent: "end", paddingBottom: "10px", fontSize: "16px" }} className="login-form-forgot" >
                        Bạn đã có tài khoản?
                    </Link>
                    <Button type="primary" htmlType="submit" style={{ display: "flex", alignItems: 'center' }}>
                        Đăng Ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterComponent;
