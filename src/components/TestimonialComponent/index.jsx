import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin, Alert } from "antd";
import { actFetchAllComments, setNewPage } from '../../redux/features/comment/commentSlice';
import { useSearchParams } from 'react-router-dom';


const TestimonialComponent = () => {
    const comments = useSelector((state) => state.comment.comments);
    const { pagination, sortField, sortOrder } = useSelector((state) => state.comment);
    const isLoading = useSelector((state) => state.comment.isLoading);
    const errors = useSelector((state) => state.comment.errors);
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();

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
            _order: sortOrder
        }));
    };
    useEffect(() => {
        const currentPage = Number(searchParams.get('_page')) || 1;
        dispatch(actFetchAllComments({
            _page: currentPage,
            _limit: pagination.limitPerPage,
            _sort: sortField,
            _order: sortOrder,
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
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderComments = (_comment) => {
        return _comment.map((comment) => {
            const { fullName, comments, rating, createdAt } = comment;
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
                            <h5 className="mb-0">Nhận xét: "{comments}" </h5>
                        </div>
                        <div className="d-flex align-items-center flex-nowrap">
                            <div className="bg-secondary rounded">
                                <img src="/img/avatar.jpg" className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="" />
                            </div>
                            <div className="ms-4 d-block">
                                <p className="m-0 pb-3">{date}</p>
                                <h4 className="text-dark">{fullName}</h4>
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
                            {renderComments(comments)}

                            <Pagination
                                current={pagination.currentPage}
                                defaultPageSize={pagination.limitPerPage}
                                total={pagination.total}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestimonialComponent