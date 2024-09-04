import React from 'react'
import { Card, Col, Row } from 'antd';
import './style.scss'

const AboutUsComponent = () => {
    return (
        <div className="about-us">
            <h2>Về Chúng Tôi</h2>
            <p>
                Chúng tôi cung cấp các sản phẩm chăm sóc sức khỏe tự nhiên và chăm sóc cá nhân tốt nhất. Chúng tôi tin tưởng vào sức mạnh của thiên nhiên và cam kết mang đến cho bạn những giải pháp tự nhiên hiệu quả cho sức khỏe và vẻ đẹp của bạn.
            </p>
            <Row gutter={16}>
                <Col s={24} sm={24} md={12} lg={8} xl={6}>
                    <Card
                        hoverable
                        cover={<img alt="Natural Remedies" src="/img/natural-remedies.webp" />}
                    >
                        <Card.Meta title="Biện pháp tự nhiên" description="Khám phá các sản phẩm remedies tự nhiên giúp cải thiện sức khỏe của bạn." />
                    </Card>
                </Col>
                <Col s={24} sm={24} md={12} lg={8} xl={6}>
                    <Card
                        hoverable
                        cover={<img alt="Personal Care" src="/img/person-care.jpeg" />}
                    >
                        <Card.Meta title="Chăm sóc cá nhân" description="Tìm hiểu các sản phẩm chăm sóc cá nhân giúp bạn cảm thấy tự tin và thoải mái." />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default AboutUsComponent