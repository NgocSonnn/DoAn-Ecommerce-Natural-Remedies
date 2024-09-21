import React, { useCallback, useEffect, useState } from 'react'
import { Button, Input, Form, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, LockOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { actFetchUserById, actUpdateUserById } from '../../redux/features/user/userSlice';
import dayjs from 'dayjs';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
const { Option } = Select;

const ChangePassComponent = () => {

    const { userInfo, isLogin } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [selectedWard, setSelectedWard] = useState("");

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
    const { control, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: userInfo?.fullName || '',
            phoneNumber: userInfo?.phoneNumber || '',
            email: userInfo?.email || '',
            password: userInfo?.password || '',
            confirmPassword: userInfo?.confirmPassword || '',
            birthDay: userInfo?.birthDay ? dayjs(userInfo.birthDay) : null,
            gender: userInfo?.gender || '',
            province: userInfo?.province || '',
            district: userInfo?.district || '',
            ward: userInfo?.ward || '',
            streetAddress: userInfo?.streetAddress || '',
        }
    });
    useEffect(() => {
        if (userInfo?.province) {
            setSelectedProvince(userInfo.province);
        }
        if (userInfo?.district) {
            setSelectedDistrict(userInfo.district);
        }
        if (userInfo?.ward) {
            setSelectedWard(userInfo.ward);
        }
    }, [userInfo]);

    useEffect(() => {
        if (!isLogin) {
            navigate(ROUTES.PAGE_404)
            message.warning("Bạn cần đăng nhập để vào trang này!")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        setSelectedProvince(event);
        setSelectedDistrict("");
        setSelectedWard("");
        setWards([]);
    }

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event);
        setSelectedWard("");
        setWards([]);
    };

    const handleWardChange = (event) => {
        setSelectedWard(event);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProvince, selectedDistrict]);

    const onSubmit = (formValue) => {
        const updatedFormValue = {
            ...formValue,
            birthDay: dayjs(formValue.birthDay).format(),
        };
        dispatch(actUpdateUserById({
            id: userInfo?.id,
            userUpdate: updatedFormValue
        }))
        message.success('Thông tin người dùng đã được cập nhật!')
        navigate(ROUTES.ACCOUNT_PAGE)
    };
    useEffect(() => {
        dispatch(actFetchUserById(userInfo?.id))
        if (userInfo) {
            reset({
                ...userInfo,
                province: Number(userInfo.province),
                district: Number(userInfo.district),
                ward: Number(userInfo.ward),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleDirectToAccoutPage = () => {
        navigate(ROUTES.ACCOUNT_PAGE)
    }

    return (
        <div className='changepass-container'>
            <h2>Thay đổi thông tin cá nhân và mật khẩu</h2>
            <div className='changepass-container__form'>
                <Form

                    name="personalInfo"
                    onFinish={handleSubmit(onSubmit)}
                    style={{ maxWidth: '100%' }}
                >
                    <Form.Item
                        name="fullName"
                        label="Họ tên"
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
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
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
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
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
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
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
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Nhập lại mật khẩu"
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
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name="birthDay"
                        label="Ngày sinh"
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
                                    format="DD/MM/YYYY"
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(date) => field.onChange(date ? date.toDate() : null)}

                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Giới tính"
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
                                    {...field}
                                >
                                    <Option value="Nam">Nam</Option>
                                    <Option value="Nữ">Nữ</Option>
                                    <Option value="Khác">Khác</Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name="province"
                        label="Tỉnh/thành phố"
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
                                        field.onChange(value);
                                    }}
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
                        name="district"
                        label="Quận/huyện"
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
                                    {...field}
                                    onChange={(value) => {
                                        handleDistrictChange(value);
                                        field.onChange(value);
                                    }}

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
                        name="ward"
                        label="Phường/xã"
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
                                    {...field}
                                    onChange={(value) => {
                                        handleWardChange(value);
                                        field.onChange(value);
                                    }}

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
                        name="streetAddress"
                        label="Toà nhà, số nhà, tên đường"

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
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ display: "flex", alignItems: 'center' }}>
                            Lưu thay đổi
                        </Button>
                        <Button onClick={handleDirectToAccoutPage} style={{ display: "flex", alignItems: 'center' }}>
                            Trở lại trang thông tin cá nhân
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default ChangePassComponent