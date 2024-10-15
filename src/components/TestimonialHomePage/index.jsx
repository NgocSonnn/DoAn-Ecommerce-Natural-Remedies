import React, { useEffect, useState } from 'react'
import './style.scss'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin, Alert, Form, Input, Button, Rate, Row, Col, Modal } from "antd";
import { actAddComment, actFetchAllComments, setNewPage } from '../../redux/features/comment/commentSlice';
import { useSearchParams } from 'react-router-dom';


const TestimonialHomePage = () => {
    const comments = useSelector((state) => state.comment.comments);
    const { pagination, sortField, sortOrder } = useSelector((state) => state.comment);
    const isLoading = useSelector((state) => state.comment.isLoading);
    const errors = useSelector((state) => state.comment.errors);
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [anonymous, setAnonymous] = useState(false);

    const onFinish = () => {
        setIsModalVisible(true);
    };
    const handleModalOk = (values) => {
        const updatedValues = {
            productId: null,
            ...values,
            fullName: anonymous ? 'Ẩn danh' : values.fullName,
            phoneNumber: anonymous ? 'Ẩn danh' : values.phoneNumber,
            createdAt: new Date().toISOString(),
        };
        dispatch(actAddComment(updatedValues));
        form.resetFields();
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };


    const handlePageChange = (newPage) => {
        dispatch(setNewPage(newPage));
        setSearchParams({
            ...Object.fromEntries(searchParams),
            _page: newPage,
            _limit: pagination.limitPerPage
        });
        dispatch(actFetchAllComments({
            _page: newPage,
            _limit: pagination.limitPerPage,
            _sort: sortField,
            _order: sortOrder,
            productId: null
        }));
    };
    useEffect(() => {
        const currentPage = Number(searchParams.get('_page')) || 1;
        dispatch(actFetchAllComments({
            _page: currentPage,
            _limit: pagination.limitPerPage,
            _sort: sortField,
            _order: sortOrder,
            productId: null
        }))
        return () => {
            dispatch(setNewPage(currentPage))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        const _page = searchParams.get('_page')
        if (_page) {
            dispatch(setNewPage(_page))
        }
        dispatch(actFetchAllComments({
            _page: _page,
            _limit: pagination.limitPerPage,
            _sort: sortField,
            _order: sortOrder,
            productId: null
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        dispatch(actFetchAllComments())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const filterCommentByProductId = comments.filter(comment =>
        comment.productId === null
    )

    const renderComments = (_comment) => {
        return _comment.map((comment) => {
            const { fullName, comments, rating, createdAt, phoneNumber } = comment;
            const date = format(createdAt, 'dd/MM/yyyy HH:mm')

            const stars = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    stars.push(<i key={i} className="fa fa-star text-secondary"></i>);
                } else if (i - rating === 0.5) {
                    stars.push(<i key={i} className="fa fa-star-half-alt text-secondary"></i>);
                } else {
                    stars.push(<i key={i} className="fa fa-star-o text-secondary"></i>);
                }
            }
            return (
                <div style={{ marginBottom: "20px" }} className="testimonial-item img-border-radius bg-light rounded p-4" key={comment.id}>
                    <div className="position-relative">
                        <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ right: 0, bottom: "30px" }}></i>
                        <div className="mb-4 pb-4 border-bottom border-secondary">
                            <h5 className="mb-0">Nhận xét: " <b>{comments}</b> " </h5>
                        </div>
                        <div className="d-flex align-items-center flex-nowrap">
                            <div className="bg-secondary rounded">
                                <img src="/img/avatar.jpg" className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="" />
                            </div>
                            <div className="ms-4 d-block">
                                <p className="m-0 pb-3">Ngày: {date}</p>
                                <h5 className="text-dark">Họ tên: {fullName}</h5>
                                <h6 className="text-dark">Số điện thoại: {phoneNumber}</h6>
                                <div className="d-flex pe-5">
                                    {stars}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="container-fluid testimonial py-5">
            <div className="container py-5">
                <div className="testimonial-header text-center">
                    <h4 className="text-primary">Ý kiến đánh giá về chúng tôi</h4>
                    <h1 className="display-5 mb-5 text-dark">Lời nhận xét của khách hàng!</h1>
                </div>
                <div className='comment-render'>
                    {isLoading ? (
                        <Spin size="large" />
                    ) : errors && Object.keys(errors).length > 0 ? (
                        <Alert message="Error" description="Unable to load comments." type="error" />
                    ) : (
                        <div>
                            {renderComments(filterCommentByProductId)}

                            <Pagination
                                current={pagination.currentPage}
                                defaultPageSize={pagination.limitPerPage}
                                total={pagination.total}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
                <div className='form-comment-wrapper'>
                    <Form
                        form={form}
                        name="feedback_form"
                        onFinish={onFinish}
                        layout="vertical"
                        className="mb-4"
                    >
                        <h3 style={{ textAlign: "center" }} className="my-5 fw-bold">Để lại ý kiến của bạn</h3>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="fullName"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                                >
                                    <Input placeholder="Họ tên của bạn" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' },
                                    { pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ!' }
                                    ]}
                                >
                                    <Input type="tel" placeholder="Số điện thoại" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="comments"
                            rules={[{ required: true, message: 'Vui lòng nhập đánh giá của bạn!' }]}
                        >
                            <Input.TextArea
                                rows={8}
                                placeholder="Đánh giá của bạn về sản phẩm của chúng tôi"
                                spellCheck="false"
                            />
                        </Form.Item>

                        <Form.Item
                            name="rating"
                            label="Đánh giá"
                            rules={[{ required: true, message: 'Vui lòng chọn đánh giá!' }]}
                        >
                            <Rate />
                        </Form.Item>

                        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="rounded-pill px-4 py-4 btn-style"
                            >
                                Đăng bình luận
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Modal
                className='modal-testimonial'
                title="Bạn có muốn ẩn danh không?"
                open={isModalVisible}
                onOk={() => handleModalOk(form.getFieldsValue())}
                onCancel={handleModalCancel}
                footer={[
                    <Button key="back" onClick={() => { setAnonymous(false); handleModalOk(form.getFieldsValue()); }}>
                        Không
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => { setAnonymous(true); handleModalOk(form.getFieldsValue()); }}>
                        Có, ẩn danh
                    </Button>
                ]}
            >
                <h4>Bạn có chắc chắn muốn gửi ý kiến của bạn dưới dạng ẩn danh không?</h4>
            </Modal>
        </div>
    )
}

export default TestimonialHomePage