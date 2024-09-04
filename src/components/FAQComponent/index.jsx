import React from 'react'
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import './style.scss'

const getItems = (panelStyle) => [
    {
        key: '1',
        label: "Làm thế nào để đặt hàng?",
        children: <p>Để đặt hàng, bạn chỉ cần chọn sản phẩm, thêm vào giỏ hàng, và làm theo hướng dẫn để hoàn tất đơn hàng của bạn.</p>,
        style: panelStyle,
    },
    {
        key: '2',
        label: "Tôi có thể trả lại hàng không?",
        children: <p>Có, bạn có thể trả lại hàng trong vòng 30 ngày nếu sản phẩm không đúng như mô tả hoặc bị lỗi.</p>,
        style: panelStyle,
    },
    {
        key: '3',
        label: "Phí vận chuyển là bao nhiêu?",
        children: <p>Phí vận chuyển sẽ được tính tùy theo địa điểm và trọng lượng của đơn hàng. Bạn sẽ thấy phí vận chuyển khi thanh toán.</p>,
        style: panelStyle,
    },
];

const FAQComponent = () => {
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    }
    return (
        <div className="faq">
            <h2>Câu Hỏi Thường Gặp</h2>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{
                    background: token.colorBgContainer,
                }}
                items={getItems(panelStyle)}
            />
        </div>
    )
}

export default FAQComponent