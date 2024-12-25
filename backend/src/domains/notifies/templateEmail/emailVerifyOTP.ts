export const emailVerifyOTP = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p>Xin chào,</p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của <strong style="color: #FF7F00;">Evora</strong>. Vui lòng sử dụng mã OTP dưới đây để xác minh tài khoản của bạn. Mã OTP này có thể được sử dụng cho các mục đích như <strong>đăng ký tài khoản</strong>, <strong>khôi phục mật khẩu</strong>, hoặc <strong>cập nhật thông tin bảo mật</strong>:</p>
        <h2 style="color: #FF7F00;">{{OTP_CODE}}</h2>
				<p>Mã OTP của bạn sẽ hết hạn sau <strong>5 phút</strong>.</p>
        <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
    </div>
`;
