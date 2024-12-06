        *router courses:
1. GET /api/courses
Mô tả: Lấy toàn bộ danh sách các khóa học hiện có trong hệ thống.
Trả về: Danh sách các khóa học với thông tin chi tiết như id, tên khóa học, mô tả, trạng thái, v.v.

2. GET /api/courses/with-user
Mô tả: Lấy danh sách các khóa học có liên kết hoặc được gắn với người dùng (user).
Trả về: Danh sách các khóa học được gắn với từng người dùng. Có thể bao gồm thông tin bổ sung về người dùng như user_id, tên người dùng, và trạng thái tham gia khóa học.

3. GET /api/courses/modules-resources
Mô tả: Lấy danh sách tất cả các khóa học kèm theo thông tin về module (chương) và tài nguyên (resource) liên quan.
Trả về:
Danh sách các khóa học.
Mỗi khóa học sẽ có các module và tài nguyên của nó.

4. GET /api/courses/:id/modules-resources
Mô tả: Lấy thông tin chi tiết về các module và tài nguyên trong một khóa học cụ thể.
Tham số:
:id: ID của khóa học.
Trả về:
Thông tin khóa học tương ứng với ID.
Bao gồm danh sách module và tài nguyên của khóa học.

5. GET /api/courses/modules-resources-user
Mô tả: Lấy danh sách tất cả các khóa học kèm theo thông tin module, tài nguyên và người dùng liên quan.
Trả về:
Danh sách các khóa học.
Bao gồm thông tin module, tài nguyên và danh sách người dùng tham gia khóa học đó.

6. GET /api/courses/:id/modules-resources-user
Mô tả: Lấy thông tin chi tiết về module, tài nguyên và người dùng cho một khóa học cụ thể.
Tham số:
:id: ID của khóa học.
Trả về:
Thông tin khóa học cụ thể.
Bao gồm module, tài nguyên và danh sách người dùng liên quan.

7. GET /api/courses/:id/resource-ids
Mô tả: Lấy danh sách ID của các tài nguyên (resources) thuộc về một khóa học cụ thể.
Tham số:
:id: ID của khóa học.
Trả về:
Danh sách ID của các tài nguyên trong khóa học.

8. POST /api/courses/add-course
Mô tả: Endpoint dùng để thêm một khóa học mới vào hệ thống. Yêu cầu gửi dữ liệu thông tin khóa học qua body của request.

9. PATCH /api/courses/update-course/:id
Mô tả: Endpoint dùng để cập nhật thông tin của một khóa học cụ thể dựa trên id. Các thay đổi cần được gửi qua body của request.




        *Auth
1. POST /api/auth/register
Mô tả: Endpoint dùng để đăng ký tài khoản mới trong hệ thống. Người dùng cần cung cấp thông tin như tên, email, mật khẩu, và các chi tiết khác (nếu cần) thông qua body của request.

2. POST /api/auth/login
Mô tả: Endpoint dùng để đăng nhập vào hệ thống. Người dùng cần cung cấp thông tin xác thực (email và mật khẩu) qua body của request. Nếu thông tin chính xác, API sẽ trả về token xác thực để sử dụng cho các yêu cầu khác.


        *learning-path
1. GET /api/learning-path/
Mô tả: Lấy danh sách tất cả các learning path (lộ trình học tập) hiện có trong hệ thống.

2. GET /api/learning-path/:id
Mô tả: Lấy thông tin chi tiết của một learning path cụ thể dựa trên id.

3. POST /api/learning-path/
Mô tả: Tạo mới một learning path trong hệ thống. Dữ liệu lộ trình mới sẽ được gửi qua body của request.

4. DELETE /api/learning-path/:id
Mô tả: Xóa một learning path cụ thể dựa trên id.

5. PATCH /api/learning-path/:id
Mô tả: Cập nhật thông tin của một learning path cụ thể dựa trên id. Các thay đổi sẽ được gửi qua body của request.


        *Certificate
1. GET /api/certificate
Mô tả: Lấy danh sách tất cả các chứng chỉ (certificates) trong hệ thống.
Kết quả: Trả về danh sách chứng chỉ với thông tin chi tiết (id, tên, mô tả, ngày cấp, trạng thái, v.v.).

2. GET /api/certificate/:id
Mô tả: Lấy thông tin chi tiết của một chứng chỉ cụ thể dựa trên id.
Tham số:
:id: ID của chứng chỉ cần lấy thông tin.
Kết quả: Trả về thông tin chi tiết của chứng chỉ tương ứng.

3. POST /api/certificate
Mô tả: Tạo một chứng chỉ mới trong hệ thống.
Dữ liệu yêu cầu: Gửi thông tin chứng chỉ qua body của request (tên chứng chỉ, mô tả, ngày cấp, v.v.).
Kết quả: Tạo mới thành công chứng chỉ và trả về thông tin của chứng chỉ vừa được tạo.

4. DELETE /api/certificate/:id
Mô tả: Xóa một chứng chỉ cụ thể dựa trên id.
Tham số:
:id: ID của chứng chỉ cần xóa.
Kết quả: Xóa thành công chứng chỉ và trả về thông báo hoặc trạng thái.

5. PATCH /api/certificate/:id
Mô tả: Cập nhật thông tin của một chứng chỉ cụ thể dựa trên id.
Tham số:
:id: ID của chứng chỉ cần cập nhật.
Dữ liệu yêu cầu: Gửi các thay đổi cần cập nhật qua body của request.
Kết quả: Cập nhật thành công và trả về thông tin chứng chỉ sau khi thay đổi.


        *User
1.GET /api/user
Mô tả: Lấy danh sách tất cả người dùng trong hệ thống.
Kết quả: Trả về danh sách người dùng với thông tin cơ bản như ID, tên, email, vai trò, trạng thái, v.v.


        *module
1. GET /api/module/
Mô tả: Lấy danh sách tất cả các module trong hệ thống.
Kết quả: Trả về danh sách các module với thông tin cơ bản như id, tên module, mô tả, trạng thái, v.v.

2. GET /api/module/:id/:user_id/module-resources
Mô tả: Lấy thông tin về tài nguyên (resources) của một module cụ thể cho một người dùng cụ thể.
Tham số:
:id: ID của module.
:user_id: ID của người dùng.
Kết quả: Trả về danh sách tài nguyên của module cho người dùng đã chỉ định.

3. POST /api/module/
Mô tả: Tạo một module mới trong hệ thống.
Dữ liệu yêu cầu: Gửi thông tin về module mới qua body của request (tên module, mô tả, khóa học liên kết, v.v.).
Kết quả: Tạo mới thành công module và trả về thông tin của module vừa được tạo.

4. PATCH /api/module/:id
Mô tả: Cập nhật thông tin cho một module cụ thể dựa trên id.
Tham số:
:id: ID của module cần cập nhật.
Dữ liệu yêu cầu: Gửi các thay đổi cần cập nhật qua body của request.
Kết quả: Cập nhật thành công thông tin module và trả về thông tin đã thay đổi.

5. DELETE /api/module/:id
Mô tả: Xóa một module cụ thể dựa trên id.
Tham số:
:id: ID của module cần xóa.
Kết quả: Xóa thành công module và trả về xác nhận hoặc trạng thái.


        *Resource
1. GET /api/resource/progress/:course_id/:user_id/:id?
Mô tả: Lấy thông tin tiến độ tài nguyên (resource) của một người dùng trong một khóa học cụ thể.
Tham số:
:course_id: ID của khóa học mà tài nguyên thuộc về.
:user_id: ID của người dùng.
:id? (tuỳ chọn): ID của tài nguyên cụ thể. Nếu không có ID tài nguyên, có thể trả về tiến độ của tất cả tài nguyên trong khóa học cho người dùng.
Kết quả: Trả về tiến độ của tài nguyên (hoàn thành, chưa hoàn thành, trạng thái tương ứng) cho người dùng trong khóa học cụ thể.

2. GET /api/resource/:id/adjacent/id
Mô tả: Lấy tài nguyên liền kề (adjacent resource) của tài nguyên cụ thể.
Tham số:
:id: ID của tài nguyên hiện tại.
id: ID của tài nguyên liền kề cần lấy thông tin.
Kết quả: Trả về tài nguyên liền kề với tài nguyên có id được chỉ định. Đây có thể là tài nguyên tiếp theo hoặc trước đó trong một chuỗi tài nguyên liên quan.


        *Captcha
POST /api/captcha/verify
Mô tả: Endpoint này dùng để xác thực mã CAPTCHA mà người dùng đã nhập. Mục đích là đảm bảo rằng người gửi yêu cầu là con người chứ không phải bot tự động.

Dữ liệu yêu cầu: Thông thường, người dùng sẽ gửi mã CAPTCHA mà họ đã nhập từ một hình ảnh hoặc thử thách CAPTCHA trước đó.


        *Payment
1. POST /api/payment
Mô tả: Endpoint này được sử dụng để tạo một yêu cầu thanh toán mới trong hệ thống. Người dùng sẽ gửi thông tin thanh toán (ví dụ: số tiền, phương thức thanh toán, thông tin người thanh toán) để khởi tạo quá trình thanh toán.

2. POST /api/payment/callback
Mô tả: Endpoint này nhận callback từ các cổng thanh toán bên ngoài (như ngân hàng hoặc dịch vụ thanh toán) sau khi thanh toán được xử lý. Cổng thanh toán sẽ gửi thông tin về trạng thái thanh toán (thành công hay thất bại) tới endpoint này.


        *Oder
1. GET /api/order/
Mô tả: Lấy danh sách tất cả các đơn hàng trong hệ thống.
Kết quả: Trả về danh sách các đơn hàng với thông tin cơ bản 

2. GET /api/order/:id
Mô tả: Lấy thông tin chi tiết của một đơn hàng cụ thể dựa trên id.
Tham số:
:id: ID của đơn hàng cần lấy thông tin.
Kết quả: Trả về thông tin chi tiết của đơn hàng, bao gồm các sản phẩm trong đơn, trạng thái đơn hàng, thông tin người dùng, v.v.

3. POST /api/order/
Mô tả: Tạo một đơn hàng mới trong hệ thống.
Dữ liệu yêu cầu: Gửi thông tin về đơn hàng qua body của request.
Kết quả: Tạo mới đơn hàng thành công và trả về thông tin của đơn hàng vừa tạo.

4. PUT /api/order/:id/status
Mô tả: Cập nhật trạng thái của một đơn hàng cụ thể.
Tham số:
:id: ID của đơn hàng cần cập nhật trạng thái.
Dữ liệu yêu cầu: Gửi thông tin trạng thái mới của đơn hàng qua body (ví dụ: "Đang xử lý", "Đã giao", "Đã hủy").
Kết quả: Cập nhật trạng thái thành công và trả về thông tin đơn hàng đã được cập nhật.

5. DELETE /api/order/:id
Mô tả: Xóa một đơn hàng cụ thể dựa trên id.
Tham số:
:id: ID của đơn hàng cần xóa.
Kết quả: Xóa thành công đơn hàng và trả về xác nhận hoặc trạng thái.


        *Progess
1. POST /api/progress/start
Mô tả: Endpoint này dùng để bắt đầu theo dõi tiến độ của một hoạt động hoặc tài nguyên nào đó. Khi người dùng bắt đầu thực hiện một tài nguyên hoặc khóa học, hệ thống sẽ ghi nhận việc bắt đầu tiến trình.
Dữ liệu yêu cầu: Thông tin về tài nguyên hoặc khóa học mà người dùng sẽ bắt đầu, ví dụ:
user_id: ID của người dùng.
resource_id: ID của tài nguyên hoặc khóa học mà người dùng bắt đầu.
Thông tin khác như thời gian bắt đầu, v.v.

2. PATCH /api/progress/:user_id/:resource_id/complete
Mô tả: Endpoint này dùng để cập nhật tiến độ của người dùng và đánh dấu một tài nguyên là đã hoàn thành. Khi người dùng hoàn thành một tài nguyên hoặc khóa học, tiến độ sẽ được đánh dấu là "hoàn thành".
Tham số:
:user_id: ID của người dùng thực hiện tài nguyên.
:resource_id: ID của tài nguyên hoặc khóa học mà người dùng đã hoàn thành.




