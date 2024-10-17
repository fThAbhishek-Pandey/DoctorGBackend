## documentation of backend of DoctorG
![]()
[read full docs](https://github.com/fThAbhishek-Pandey/DoctorGBackend)
---

# Admin API Routes Documentation

The **Admin API** provides routes for managing doctors, appointments, and system visibility. Below are the details of each available route, including their endpoints, required middlewares, and descriptions.

## Base URL: `/api/admin`

### 1. Add a Doctor
```bash
  https://doctorgbackend.onrender.com/api/admin/add-doctor
```

- **Endpoint:** `/add-doctor`
- **Method:** `POST`
- **Middleware:** `authAdmin`, `upload.single('image')`
- **Handler:** `addDoctor`
- **Description:** This route allows the admin to add a new doctor to the system. The admin must provide the doctor's details and upload an image. The route is protected by `authAdmin` middleware to ensure only authenticated admins can access it.

**Example Request Body:**
```json
{
  "name": "Dr. John Doe",
  "specialization": "Cardiology",
  "experience": 10,
  "email": "johndoe@example.com"
}
```

### 2. Admin Login
```bash
  https://doctorgbackend.onrender.com/api/admin/login
```
- **Endpoint:** `/login`
- **Method:** `POST`
- **Handler:** `loginAdmin`
- **Description:** Admin can log in using this route by providing valid credentials (email and password). On successful login, the server returns a JWT token to be used for authenticating further requests.

**Example Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
### 3. Get All Doctors
```bash
  https://doctorgbackend.onrender.com/api/admin/all-doctors
```
- **Endpoint:** `/all-doctors`
- **Method:** `GET`
- **Middleware:** `authAdmin`
- **Handler:** `AllDoctors`
- **Description:** This route returns a list of all doctors registered in the system, including their details like name, specialization, experience, and availability status. Only authenticated admins can access this data.

### 4. Change Doctor Visibility (Availability)
```bash
  https://doctorgbackend.onrender.com/api/admin/change-visibility
```
- **Endpoint:** `/change-visibility`
- **Method:** `POST`
- **Middleware:** `authAdmin`
- **Handler:** `changeAvailablity`
- **Description:** This route allows the admin to change a doctor's availability status (i.e., visible/available for appointments or not). Only authenticated admins can modify this setting.

**Example Request Body:**
```json
{
  "doctorId": "12345",
  "isAvailable": true
}
```

### 5. Get All Appointments
```bash
  https://doctorgbackend.onrender.com/api/admin/appointments
```
- **Endpoint:** `/appointments`
- **Method:** `GET`
- **Middleware:** `authAdmin`
- **Handler:** `appointmentAdmin`
- **Description:** This route returns all appointments in the system, including their status (pending, completed, canceled). Admins can track appointments and oversee the entire appointment lifecycle.

### 6. Cancel an Appointment
```bash
  https://doctorgbackend.onrender.com/api/admin/cancel-appointment
```
- **Endpoint:** `/cancel-appointment`
- **Method:** `PUT`
- **Middleware:** `authAdmin`
- **Handler:** `cancelByAdmin`
- **Description:** Admins can cancel any pending appointment using this route. The admin must provide the appointment ID, and the system will mark it as canceled.

**Example Request Body:**
```json
{
  "appointmentId": "67890"
}
```

### 7. Admin Dashboard Data
```bash
  https://doctorgbackend.onrender.com/api/admin/admin-dashboard
```
- **Endpoint:** `/admin-dashboard`
- **Method:** `GET`
- **Middleware:** `authAdmin`
- **Handler:** `adminDashbord`
- **Description:** This route provides an overview of the system's key metrics, such as the number of doctors, users, appointments, and revenue. Admins use this dashboard for monitoring the system's overall performance.

---

## Middleware Explanation
- **authAdmin:** Middleware to authenticate admin users by verifying the JWT token provided during login.
- **upload.single('image'):** Middleware for handling image uploads when adding new doctors. This is used to attach a doctor's profile image.

## How to Use
1. Make sure to include the JWT token in the Authorization header for all routes that require `authAdmin`.
   ```bash
   Authorization: Bearer <token>
   ```
2. Use appropriate HTTP methods (`POST`, `GET`, `PUT`) based on the endpoint.

---

---

# Doctor API Routes Documentation

The **Doctor API** provides routes for doctors to manage their profiles, appointments, and view system analytics. Below is a list of available routes, including their endpoints, required middlewares, and descriptions.

## Base URL: `https://doctorgbackend.onrender.com/api/doctors/`
### 1. Get List of Doctors
```bash
  https://doctorgbackend.onrender.com/api/doctors/list
```
- **Endpoint:** `/list`
- **Method:** `GET`
- **Handler:** `DoctorsList`
- **Description:** This route retrieves a list of all available doctors in the system. The list includes basic details such as name, specialization, and availability.

### 2. Doctor Login
```bash
  https://doctorgbackend.onrender.com/api/doctors/login
```
- **Endpoint:** `/login`
- **Method:** `POST`
- **Handler:** `LoginDoctor`
- **Description:** This route allows doctors to log in by providing their credentials (email and password). After successful login, the server returns a JWT token to be used for authenticating subsequent requests.

**Example Request Body:**
```json
{
  "email": "doctor@example.com",
  "password": "password123"
}
```

### 3. View Doctor's Appointments
```bash
  https://doctorgbackend.onrender.com/api/doctors/appointments
```
- **Endpoint:** `/appointments`
- **Method:** `GET`
- **Middleware:** `authDoctor`
- **Handler:** `DoctorAppointments`
- **Description:** This route returns a list of all upcoming appointments for the authenticated doctor. The list includes patient details, appointment times, and appointment status.

### 4. Mark Appointment as Complete
```bash
  https://doctorgbackend.onrender.com/api/doctors/appointment-complete
```
- **Endpoint:** `/appointment-complete`
- **Method:** `POST`
- **Middleware:** `authDoctor`
- **Handler:** `appointmentCompleted`
- **Description:** This route allows a doctor to mark a scheduled appointment as completed. It requires the appointment ID to update its status in the system.

**Example Request Body:**
```json
{
  "appointmentId": "12345"
}
```

### 5. Cancel Appointment
```bash
  https://doctorgbackend.onrender.com/api/doctors/appointment-cancel
```
- **Endpoint:** `/appointment-cancel`
- **Method:** `POST`
- **Middleware:** `authDoctor`
- **Handler:** `appointmentCancelledByDoctor`
- **Description:** This route allows a doctor to cancel a pending appointment. The doctor must provide the appointment ID to cancel it. Once canceled, the appointment will be marked as unavailable for the patient.

**Example Request Body:**
```json
{
  "appointmentId": "67890"
}
```

### 6. Doctor Dashboard Data
```bash
  https://doctorgbackend.onrender.com/api/doctors/dashboard
```
- **Endpoint:** `/dashboard`
- **Method:** `GET`
- **Middleware:** `authDoctor`
- **Handler:** `DoctorDashBoard`
- **Description:** This route provides key metrics for the authenticated doctor, such as total appointments, completed consultations, and earnings. Doctors use this dashboard to monitor their performance.

---

## Middleware Explanation
- **authDoctor:** Middleware to authenticate doctors by verifying the JWT token provided during login.

## How to Use
1. Ensure the JWT token is included in the Authorization header for routes requiring `authDoctor`.
   ```bash
   Authorization: Bearer <token>
   ```
2. Use appropriate HTTP methods (`POST`, `GET`) depending on the endpoint.

---

This section documents the `doctorsRouter` routes to help developers understand the API functionalities for doctors in the system.

---

# User (Patient) API Routes Documentation
```bash
  https://doctorgbackend.onrender.com/api/user/dashboard
```
The **User API** provides routes for patients to manage their accounts, profiles, appointments, and payments. Below is a list of available routes, including their endpoints, required middlewares, and descriptions.

## Base URL: `/api/user`
### 1. Register a New User
```bash
  https://doctorgbackend.onrender.com/api/user/register
```
- **Endpoint:** `/register`
- **Method:** `POST`
- **Handler:** `registerUser`
- **Description:** This route allows new patients to register by providing necessary personal details such as name, email, and password.

**Example Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### 2. User Login
```bash
  https://doctorgbackend.onrender.com/api/user/login
```
- **Endpoint:** `/login`
- **Method:** `POST`
- **Handler:** `loginUser`
- **Description:** Users can log in by providing valid credentials (email and password). Upon successful login, the system returns a JWT token for authenticating further requests.

**Example Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### 3. Get User Profile
```bash
  https://doctorgbackend.onrender.com/api/user/profile
```
- **Endpoint:** `/profile`
- **Method:** `GET`
- **Middleware:** `authUser`
- **Handler:** `getUserProfile`
- **Description:** This route allows authenticated users to view their profile details, including name, and contact information.

### 4. Edit User Profile
```bash
  https://doctorgbackend.onrender.com/api/user/profile/edit
```
- **Endpoint:** `/profile/edit`
- **Method:** `PUT`
- **Middleware:** `[upload.single('image'), authUser]`
- **Handler:** `updateUser`
- **Description:** Authenticated users can update their profile details such as name, contact information, and upload a new profile picture using this route.

**Example Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+1234567890"
}
```

### 5. List User Appointments
```bash
  https://doctorgbackend.onrender.com/api/user/appointments
```
- **Endpoint:** `/appointments`
- **Method:** `GET`
- **Middleware:** `authUser`
- **Handler:** `listAppointment`
- **Description:** This route retrieves a list of all upcoming and past appointments for the authenticated user. It includes appointment details such as date, time, and doctor information.

### 6. Cancel an Appointment
```bash
  https://doctorgbackend.onrender.com/api/user/cancel-appointment
```
- **Endpoint:** `/cancel-appointment`
- **Method:** `PUT`
- **Middleware:** `authUser`
- **Handler:** `cancelAppointment`
- **Description:** This route allows users to cancel their upcoming appointments by providing the appointment ID.

**Example Request Body:**
```json
{
  "appointmentId":"67890"
}
```

### 7. Payment via Razorpay
```bash
  https://doctorgbackend.onrender.com/api/user/payment-razorpay
```
- **Endpoint:** `/payment-razorpay`
- **Method:** `POST`
- **Middleware:** `authUser`
- **Handler:** `paymentRazopay`
- **Description:** This route allows users to initiate payments using Razorpay for their booked appointments or other services.

**Example Request Body:**
```json
{
  "amount": 500,
  "currency": "INR"
}
```

### 8. Verify Razorpay Payment
```bash
  https://doctorgbackend.onrender.com/api/user/verifyRazorpay
```
- **Endpoint:** `/verifyRazorpay`
- **Method:** `POST`
- **Middleware:** `authUser`
- **Handler:** `verifyRazorpayment`
- **Description:** After completing a payment through Razorpay, users can verify the payment status with this route. The server checks whether the payment was successful or failed.

**Example Request Body:**
```json
{
  "razorpay_payment_id": "pay_29QQoUBi66xm2f",
  "razorpay_order_id": "order_9A33XWu170gUtm",
  "razorpay_signature": "5ad72s0fb23edf9c6f10c843e123b98f48e576f2"
}
```

---

## Middleware Explanation
- **authUser:** Middleware that authenticates users by verifying the JWT token provided during login.
- **upload.single('image'):** Middleware for handling image uploads, such as updating a user's profile picture.

## How to Use
1. Ensure the JWT token is included in the Authorization header for routes requiring `authUser`.
   ```bash
   Authorization: Bearer <token>
   ```
2. Use appropriate HTTP methods (`POST`, `GET`, `PUT`) depending on the endpoint.

---

This section documents the `userRouter` routes, giving a clear overview of the functionalities available to patients in the system.
Here’s a README section for the `appointmentRouter` route:

---

# Appointment API Routes Documentation

The **Appointment API** allows users to book and manage their healthcare appointments. Below is the documentation for the available routes related to appointments.

## Base URL: `/appointment`

### 1. Book an Appointment
```bash
  https://doctorgbackend.onrender.com/api/apointment/booked
```

- **Endpoint:** `/booked`
- **Method:** `POST`
- **Middleware:** `authUser`
- **Handler:** `bookAppointment`
- **Description:** This route allows authenticated users to book a new appointment with a doctor. The user must provide the required details, including the doctor's ID and preferred appointment date/time.

**Example Request Body:**
```json
{
  "doctorId": "12345",
  "appointmentDate": "2024-10-20T14:00:00",
  "reason": "Consultation"
}
```

---

## Middleware Explanation
- **authUser:** Middleware that ensures only authenticated users can access the route by verifying the JWT token.

## How to Use
1. Include the JWT token in the Authorization header when calling the route.
   ```bash
   Authorization: Bearer <token>
   ```
2. Use the `POST` method to book an appointment, ensuring that all required details (doctor ID, date, etc.) are included in the request body.

---

This section documents the `appointmentRouter` for booking appointments in the system.