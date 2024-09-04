import React from 'react'
import './style.scss'

const SalenRefunComponent = () => {
    return (
        <div>
            <main>
                <section id="sales">
                    <h2>Doanh số</h2>
                    <p>Chào mừng đến trang doanh số của chúng tôi! Tại đây, bạn có thể tìm thấy tất cả các chương trình khuyến mãi và ưu đãi đặc biệt mà chúng tôi đang có. Đừng bỏ lỡ các ưu đãi tuyệt vời này!</p>

                    <h3>Khuyến mãi hiện tại</h3>
                    <ul>
                        <li><strong>Giảm 20% Bộ sưu tập mùa hè:</strong> Giảm 20% cho tất cả các sản phẩm trong bộ sưu tập mùa hè. Sử dụng mã <strong>SUMMER20</strong> khi thanh toán.</li>
                        <li><strong>Mua 1 Tặng 1:</strong> Mua một sản phẩm từ danh sách chọn lọc và nhận thêm một sản phẩm miễn phí. Rất thích hợp cho quà tặng!</li>
                        <li><strong>Giảm giá theo mùa:</strong> Giảm giá lên đến 50% cho các sản phẩm chọn lọc. Ưu đãi có hạn!</li>
                    </ul>

                    <h3>Sản phẩm nổi bật</h3>
                    <div className="product">
                        <img src="/img/nam-linhchi-dong-goi-1.jpg" alt="Sản phẩm 1" />
                        <h4>Sản phẩm 1</h4>
                        <p>Sản phẩm tuyệt vời với các tính năng xuất sắc. Hiện đang có giá giảm.</p>
                        <p><strong>Giá:</strong> 150k/kg</p>
                    </div>
                    <div className="product">
                        <img src="/img/mat-ong-3.jpg" alt="Sản phẩm 2" />
                        <h4>Sản phẩm 2</h4>
                        <p>Sản phẩm khác rất đáng chú ý. Đừng bỏ lỡ ưu đãi đặc biệt này!</p>
                        <p><strong>Giá:</strong> 500k/L</p>
                    </div>
                </section>

                <section id="refunds">
                    <h2>Hoàn tiền</h2>
                    <p>Chính sách hoàn tiền của chúng tôi được thiết kế để cung cấp cho bạn trải nghiệm trả hàng dễ dàng. Nếu bạn không hài lòng với mua hàng của mình, chúng tôi sẵn sàng hỗ trợ bạn.</p>

                    <h3>Chính sách hoàn tiền</h3>
                    <p>Nếu bạn muốn trả lại sản phẩm, vui lòng làm theo các hướng dẫn sau:</p>
                    <ul>
                        <li><strong>Điều kiện:</strong> Sản phẩm phải được trả lại trong vòng 30 ngày kể từ ngày mua và phải còn nguyên trạng.</li>
                        <li><strong>Quy trình:</strong> Liên hệ với dịch vụ khách hàng của chúng tôi để bắt đầu quy trình trả hàng. Cung cấp số đơn hàng và lý do trả hàng.</li>
                        <li><strong>Hoàn tiền:</strong> Sau khi chúng tôi nhận và kiểm tra sản phẩm trả lại, chúng tôi sẽ xử lý hoàn tiền vào phương thức thanh toán gốc của bạn. Thời gian xử lý có thể khác nhau.</li>
                    </ul>

                    <h3>Liên hệ với chúng tôi</h3>
                    <p>Nếu bạn có bất kỳ câu hỏi nào về hoàn tiền hoặc cần hỗ trợ, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi:</p>
                    <p><strong>Facebook:</strong>  https://www.facebook.com/profile.php?id=100015270968166</p>
                    <p><strong>Điện thoại:</strong> 0363041668</p>
                </section>
            </main>

        </div>
    )
}

export default SalenRefunComponent