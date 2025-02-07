/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Avatar,
	Button,
	Card,
	Carousel,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	InputNumber,
	List,
	Rate,
	Row,
	Select,
	Tag,
	Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { User } from '@/schemas/user.schema';
import { apiCreateBooking } from '@/services/booking';
import { apiSendNotifies } from '@/services/notifies';
import { Party, apiGetPartyById } from '@/services/party';
import { apiCreatePayment } from '@/services/payment';
import { apiGetUser } from '@/services/user';
import { RootState } from '@/stores/reducers/rootReducer';

const { Title, Paragraph, Text } = Typography;

interface PartyDetailProps {
	id: string | undefined;
}

const RegistrationForm: React.FC = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const [form] = Form.useForm();
	const [totalAmount, setTotalAmount] = useState<number>(0);
	const [party, setParty] = useState<Party | null>(null);
	const { id } = useParams<{ id: string }>();
	const safeId: string = id ?? '';
	useEffect(() => {
		const fetchParty = async () => {
			if (id) {
				try {
					const response = await apiGetPartyById(id);
					setParty(response.data);
				} catch (error) {
					console.error('Error fetching party details:', error);
				}
			}
		};
		fetchParty();
	}, [id]);

	const calculateTotalAmount = (servicePackage: string, guestCount: number) => {
		if (!party) return 0;

		// Tìm giá của gói dịch vụ từ options của party
		const selectedOption = party.options.find(
			(option) => option.type.toLowerCase() === servicePackage.toLowerCase(),
		);
		console.log(selectedOption);
		const price = selectedOption ? selectedOption.price : 0;
		const amount = price * guestCount;
		setTotalAmount(amount);
		form.setFieldsValue({ totalAmount: amount });
	};

	// Hàm xử lý khi thay đổi form
	const handleFormChange = () => {
		const servicePackage = form.getFieldValue('servicePackage');
		const guestCount = form.getFieldValue('guestCount');
		if (servicePackage && guestCount) {
			calculateTotalAmount(servicePackage, guestCount);
		}
	};

	const onFinish = async (values: any) => {
		console.log(values);
		const formattedEventTime = values.eventTime?.format('YYYY-MM-DD HH:mm:ss');
		const newBookingPayload = {
			party: safeId,
			user: user._id,
			payment: '',
			guestCount: Number(values.guestCount),
			status: 'PENDING',
			organizeDate: formattedEventTime,
			organizedAt: values.location,
		};

		try {
			const bookingResponse = await apiCreateBooking(newBookingPayload);
			const bookingId = bookingResponse.data._id;
			const newPaymentPayload = {
				booking: bookingId,
				voucher: '',
				method: 'zalo-pay',
				status: 'PENDING',
				originPrice: totalAmount,
				finalPrice: totalAmount,
			};
			const paymentResponse = await apiCreatePayment(newPaymentPayload);
			const notifiesPayload = {
				notifyDto: {
					users: [user._id],
					title: 'Chúc mừng bạn đã đặt tiệc thành công!',
					message: `
      <h1>📌 EVORA - XÁC NHẬN ĐẶT TIỆC 🎉</h1>
        <p class="content">Kính gửi <strong>${user.fullName}</strong>,</p>        
        <div class="info">
            <p><strong>📅 Thông tin đơn hàng của bạn:</strong></p>
            <ul>
                <li><strong>Tên sự kiện:</strong> ${party?.category}</li>
                <li><strong>Ngày tổ chức:</strong> ${newBookingPayload.organizeDate}</li>
                <li><strong>Địa điểm:</strong> ${newBookingPayload.organizedAt}</li>
                <li><strong>Tổng chi phí:</strong> ${totalAmount} VNĐ</li>
            </ul>
        </div>
        <p class="content">Chúng tôi sẽ liên hệ bạn trước ngày sự kiện để xác nhận chi tiết lần cuối.</p>
        <p class="content">💖 <strong>Evora cam kết mang đến trải nghiệm tốt nhất với:</strong></p>
        <ul>
            <li>✔️ Dịch vụ tận tâm, chuyên nghiệp</li>
            <li>✔️ Chất lượng đảm bảo, giá cả hợp lý</li>
        </ul>
        
        <p class="content">📢 Nếu có bất kỳ thay đổi hoặc yêu cầu đặc biệt, vui lòng liên hệ hotline <strong>0123456789</strong> hoặc phản hồi email này.</p>
        
        <p class="footer">&copy; 2024 EVORA. Tất cả quyền được bảo lưu.</p>
    `,
				},
				template: 'custom',
			};
			if (paymentResponse?.payment_url) {
				window.location.href = paymentResponse.payment_url;
				await apiSendNotifies(notifiesPayload);
			} else {
				console.error('Không nhận được URL thanh toán hợp lệ.');
			}

			console.log('Đăng ký và thanh toán thành công!');
		} catch (error) {
			console.error('Lỗi khi đặt chỗ hoặc thanh toán:', error);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Card
			style={{
				borderRadius: '15px',
				boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
				background: '#fff',
			}}
		>
			<Title level={4}>Đăng ký sự kiện</Title>
			<Form
				name="register"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				layout="vertical"
				form={form}
				onValuesChange={handleFormChange}
			>
				<Form.Item
					label="Địa điểm tổ chức"
					name="location"
					rules={[
						{ required: true, message: 'Vui lòng nhập địa điểm tổ chức!' },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Thời gian tổ chức"
					name="eventTime"
					rules={[
						{ required: true, message: 'Vui lòng chọn thời gian tổ chức!' },
					]}
				>
					<DatePicker
						showTime
						style={{ width: '100%' }}
						format="YYYY-MM-DD HH:mm:ss"
						value={
							form.getFieldValue('eventTime')
								? dayjs(form.getFieldValue('eventTime'))
								: null
						}
						onChange={(date) => form.setFieldsValue({ eventTime: date })}
					/>
				</Form.Item>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Gói dịch vụ"
							name="servicePackage"
							rules={[
								{ required: true, message: 'Vui lòng chọn gói dịch vụ!' },
							]}
							style={{ display: 'inline-block', width: '100%' }}
						>
							<Select>
								<Select.Option value="basic">Cơ bản</Select.Option>
								<Select.Option value="premium">Cao cấp</Select.Option>
								<Select.Option value="vip">VIP</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Số lượng khách"
							name="guestCount"
							rules={[
								{ required: true, message: 'Vui lòng nhập số lượng khách!' },
							]}
							style={{ display: 'inline-block', width: '100%' }}
						>
							<InputNumber min={1} />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="Tổng số tiền" name="totalAmount">
					<Input value={totalAmount} disabled />
				</Form.Item>
				<Form.Item style={{ textAlign: 'center', width: '100%' }}>
					<Button type="primary" htmlType="submit">
						Đăng ký
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

const PartyDetail: React.FC<PartyDetailProps> = ({ id }) => {
	const [party, setParty] = useState<Party | null>(null);
	const [owner, setOwner] = useState<User | null>(null);

	useEffect(() => {
		const fetchParty = async () => {
			if (id) {
				try {
					const response = await apiGetPartyById(id);
					setParty(response.data);
					const ownerResponse = await apiGetUser(response.data.user);
					setOwner(ownerResponse.data);
				} catch (error) {
					console.error('Error fetching party details:', error);
				}
			}
		};
		fetchParty();
	}, [id]);

	if (!party) {
		return (
			<div style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>
				Không tìm thấy sự kiện.
			</div>
		);
	}

	const averageRating = party.ratingCount
		? party.ratingTotal / party.ratingCount
		: 0;

	return (
		<Card
			style={{
				maxWidth: 1400,
				margin: '30px auto',
				borderRadius: '15px',
				overflow: 'hidden',
				background: 'linear-gradient(135deg, #fdfbfb, #ebedee)',
				boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
			}}
			bodyStyle={{ padding: '32px' }}
		>
			<Row gutter={[24, 24]}>
				{/* Left Column */}
				<Col xs={24} md={16}>
					<Carousel autoplay dotPosition="bottom">
						{party.photos?.map((photo, index) => (
							<div key={index}>
								<img
									src={photo}
									alt={`Ảnh ${index + 1}`}
									style={{
										width: '100%',
										height: '500px',
										objectFit: 'cover',
										borderRadius: '10px',
										transition: 'transform 0.3s',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.transform = 'scale(1.05)')
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.transform = 'scale(1)')
									}
								/>
							</div>
						))}
					</Carousel>

					<Title
						level={2}
						style={{
							color: '#ff5722',
							fontWeight: 'bold',
							marginBottom: '16px',
						}}
					>
						{party.title}
					</Title>

					<Tag
						color="orange"
						style={{
							fontSize: '16px',
							fontWeight: 'bold',
							padding: '5px 10px',
						}}
					>
						{party.category}
					</Tag>
					<Divider />
					<Paragraph
						style={{
							fontSize: '16px',
							lineHeight: '1.8',
							color: '#555',
							marginBottom: '20px',
						}}
					>
						{party.description}
					</Paragraph>

					{/* Ratings */}
					<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
						<Text strong style={{ fontSize: '16px', color: '#333' }}>
							Đánh giá:
						</Text>
						<Rate disabled value={averageRating} />
						<Text style={{ fontSize: '14px', color: '#888' }}>
							({party.ratingCount} đánh giá)
						</Text>
					</div>
					<Divider />

					{/* Organizer Info */}
					<Card
						style={{
							borderRadius: '15px',
							boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
							textAlign: 'left',
							background: '#fff',
						}}
					>
						<Row align="middle">
							<Col flex="100px">
								<Avatar
									size={100}
									src={owner?.avatar}
									style={{
										border: '3px solid #ff683a',
										boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
									}}
								/>
							</Col>
							<Col flex="auto" style={{ marginLeft: '20px' }}>
								<Title level={4}>Đơn vị {owner?.fullName}</Title>
								<Paragraph
									style={{ color: '#555', fontSize: '18px', margin: 0 }}
								>
									<strong>Điện thoại:</strong> {owner?.phoneNumber}
									<br />
									<strong>Địa chỉ:</strong> {owner?.address}
								</Paragraph>
							</Col>
						</Row>
					</Card>
				</Col>

				{/* Right Column */}
				<Col xs={24} md={8}>
					<RegistrationForm />
					<Divider />
					<Title level={4} style={{ marginBottom: '16px', color: '#444' }}>
						Các gói dịch vụ:
					</Title>
					<List
						itemLayout="horizontal"
						dataSource={party.options ?? []}
						renderItem={(option) => {
							const mapTypeToVietnamese = (type: string) => {
								switch (type) {
									case 'Basic':
										return 'Cơ bản';
									case 'Premium':
										return 'Nâng cao';
									case 'VIP':
										return 'Cao cấp';
									default:
										return type;
								}
							};

							return (
								<List.Item
									style={{
										padding: '12px 16px',
										borderRadius: '10px',
										background: '#fff',
										marginBottom: '10px',
										boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
										transition: 'transform 0.2s',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.transform = 'scale(1.02)')
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.transform = 'scale(1)')
									}
								>
									<List.Item.Meta
										title={
											<Text strong style={{ color: 'black', fontSize: '16px' }}>
												Gói {mapTypeToVietnamese(option.type)}{' '}
											</Text>
										}
										description={
											<Text style={{ color: 'black', fontSize: '16px' }}>
												Giá:{' '}
												{new Intl.NumberFormat('vi-VN', {
													style: 'currency',
													currency: 'VND',
												}).format(option.price)}{' '}
												/ người
											</Text>
										}
									/>
								</List.Item>
							);
						}}
					/>
				</Col>
			</Row>
		</Card>
	);
};

export default PartyDetail;
