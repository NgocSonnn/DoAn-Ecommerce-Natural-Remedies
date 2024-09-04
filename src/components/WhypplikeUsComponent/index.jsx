import React from 'react'
import { Card, Col, Row } from 'antd';
import './style.scss'


const WhypplikeUsComponent = () => {
    return (
        <div className="why-people-like-us">
            <h2>Tại sao mọi người thích chúng tôi!</h2>
            <Row gutter={16}>
                <Col s={24} sm={24} md={12} lg={8} xl={6} >
                    <Card
                        hoverable
                        cover={<img alt="Quality" src="/img/quality.jpg" />}
                    >
                        <Card.Meta title="Chất lượng vượt trội" description="Chúng tôi cam kết mang đến sản phẩm và dịch vụ chất lượng cao nhất." />
                    </Card>
                </Col>
                <Col s={24} sm={24} md={12} lg={8} xl={6} >
                    <Card
                        hoverable
                        cover={<img alt="Customer Service" src="/img/custom-service.jpg" />}
                    >
                        <Card.Meta title="Dịch vụ khách hàng tận tâm" description="Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng giúp đỡ bạn." />
                    </Card>
                </Col>
                <Col s={24} sm={24} md={12} lg={8} xl={6} >
                    <Card
                        hoverable
                        cover={<img alt="Innovation" src="/img/innovation.jpg" />}
                    >
                        <Card.Meta title="Đổi mới và sáng tạo" description="Chúng tôi không ngừng cải tiến và đổi mới để đáp ứng nhu cầu của bạn." />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default WhypplikeUsComponent