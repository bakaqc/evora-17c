export const emailBookingSuccess = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p>Xin chào {{USERNAME}},</p>
        <p>Chúng tôi rất vui thông báo rằng bạn đã đặt sự kiện thành công tại <strong>Evora</strong>. Dưới đây là thông tin chi tiết về sự kiện của bạn:</p>
        <ul>
            <li><strong>Tên sự kiện:</strong> {{EVENT_NAME}}</li>
            <li><strong>Ngày:</strong> {{EVENT_DATE}}</li>
            <li><strong>Địa điểm:</strong> {{EVENT_LOCATION}}</li>
        </ul>
        <p>Chúng tôi hy vọng sự kiện của bạn sẽ diễn ra thành công và đáng nhớ!</p>
    </div>
`;
