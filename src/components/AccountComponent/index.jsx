import React, { useEffect, useState } from 'react'
import { Button, message, Space } from 'antd';
import axios from 'axios';
import { format, isValid, parseISO } from 'date-fns'
import { useSelector } from 'react-redux';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';



const AccountComponent = () => {
    const { userInfo, isLogin } = useSelector(state => state.user)
    const [provinceName, setProvinceName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [wardName, setWardName] = useState('');
    const navigate = useNavigate()
    const formatEmail = (email) => {
        if (!email || !email.includes('@')) return email;
        const [username, domain] = email.split('@');
        if (username.length <= 4) return email;
        const maskedUsername = username.slice(0, 4) + '*'.repeat(username.length - 4);
        return `${maskedUsername}@${domain}`;
    };
    useEffect(() => {
        if (!isLogin) {
            navigate(ROUTES.PAGE_404)
            message.warning("Bạn cần đăng nhập để vào trang này!")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (userInfo.province) {
            axios
                .get(`https://provinces.open-api.vn/api/p/${userInfo.province}`)
                .then((response) => {
                    setProvinceName(response.data.name);
                })
                .catch((error) => {
                    console.error("Error fetching province:", error);
                });
        }
    }, [userInfo.province]);

    useEffect(() => {
        if (userInfo.district) {
            axios
                .get(`https://provinces.open-api.vn/api/d/${userInfo.district}`)
                .then((response) => {
                    setDistrictName(response.data.name);
                })
                .catch((error) => {
                    console.error("Error fetching district:", error);
                });
        }
    }, [userInfo.province, userInfo.district]);

    useEffect(() => {
        if (userInfo.ward) {
            axios
                .get(`https://provinces.open-api.vn/api/w/${userInfo.ward}`)
                .then((response) => {
                    setWardName(response.data.name);
                })
                .catch((error) => {
                    console.error("Error fetching ward:", error);
                });
        }
    }, [userInfo.ward]);

    const formatToDDMMYYYY = (isoDateString) => {
        if (isoDateString) {
            const date = parseISO(isoDateString);
            if (isValid(date)) {
                return format(date, 'dd/MM/yyyy');
            }
        }
        return 'N/A';
    };
    const formatDate = formatToDDMMYYYY(userInfo.birthDay)
    const handleDirectToChangePass = () => {
        navigate(ROUTES.CHANGEPASS_ACCOUNT_PAGE)
    }
    const handleDirectToPurchaseHistory = () => {
        navigate(ROUTES.HISTORYPURCHASE_ACCOUNT_PAGE)
    }
    return (
        <div className="account-container">
            <h2>Account Information</h2>
            <div className="info-container">
                <div className='info-container__form'>
                    <b>Họ tên:</b> <p>{userInfo.fullName}</p>
                </div>
                <div className='info-container__form'>
                    <b>Số điện thoại:</b> <p>{userInfo.phoneNumber}</p>
                </div>
                <div className='info-container__form'>
                    <b>Email:</b> <p>{formatEmail(userInfo.email)}</p>
                </div>
                <div className='info-container__form'>
                    <b>Giới tính:</b> <p>{userInfo.gender}</p>
                </div>
                <div className='info-container__form'>
                    <b>Ngày sinh:</b> <p>{formatDate}</p>
                </div>
                <div className='info-container__form'>
                    <b>Địa chỉ:</b> <p>{userInfo.streetAddress} {wardName} {districtName} {provinceName}</p>
                </div>

            </div>
            <div className='btn-container'>
                <Space>
                    <Button onClick={handleDirectToPurchaseHistory}>Lịch sử mua hàng</Button>
                    <Button onClick={handleDirectToChangePass}>Thay đổi thông tin cá nhân và mật khẩu</Button>
                </Space>

            </div>
        </div>
    );
};


export default AccountComponent
