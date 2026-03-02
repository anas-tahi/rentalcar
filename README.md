# 🚗 Rental Car Management System

A modern, full-stack car rental application built with React.js and Node.js, featuring a beautiful white and blue design theme.

## 🌟 Features

### 🎨 **Modern UI/UX Design**
- **Clean White & Blue Theme**: Professional and universally appealing color scheme
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Glass-morphic Effects**: Modern navbar with backdrop blur effects
- **Smooth Animations**: Interactive hover effects and transitions
- **Gradient Backgrounds**: Beautiful white to blue gradients throughout

### **🔐 **Authentication System**
- **User Registration & Login**: Secure authentication with JWT tokens (7-day expiry)
- **Role-Based Access**: Admin and user roles with granular permissions
- **Protected Routes**: Secure dashboard access for authenticated users
- **Session Management**: HTTP-only cookies for enhanced security
- **Profile Management**: Comprehensive user profiles with avatars and preferences
- **Social Features**: Saved locations, favorite cars, booking history

### **🚗 **Car Rental Features**
- **Browse Cars**: View available vehicles with detailed information and images
- **Advanced Search**: Filter by type, location, dates, and time with React Select
- **Real-time Availability**: Check car availability for selected dates via MongoDB
- **Booking Management**: Create, view, and manage reservations with status tracking
- **Payment Integration**: Multiple payment options (Stripe & PayPal)
- **Review System**: User ratings and reviews for vehicles
- **Maintenance Tracking**: Car maintenance schedules and status

### **👥 **User Dashboard**
- **Personal Profile**: Manage user information, avatar, and preferences
- **Reservation History**: View past and current bookings with detailed status
- **Calendar Integration**: Visual schedule of rental periods using FullCalendar
- **Settings**: Account customization, notification preferences, payment methods
- **Loyalty Program**: Points system and subscription plans
- **Saved Locations**: Quick access to frequently used pickup locations
- **Favorite Cars**: Personalized vehicle recommendations

### **🛠️ **Admin Dashboard**
- **User Management**: View and manage all registered users with permissions
- **Fleet Management**: Add, edit, and remove vehicles with maintenance tracking
- **Reservation Oversight**: Monitor all bookings and availability in real-time
- **Analytics Dashboard**: Business insights and statistics with charts
- **System Settings**: Configure application parameters and permissions
- **Payment Management**: Transaction monitoring and refund processing
- **Notification System**: User communication and alerts

### **💳 **Payment System**
- **Stripe Integration**: Secure credit card processing
- **PayPal Support**: Alternative payment method
- **Transaction History**: Complete payment tracking
- **Refund Management**: Automated and manual refund processing
- **Payment Methods**: Multiple saved payment options per user
- **Invoice Generation**: Automatic invoice creation with PDF export

### **📊 **Database Models**
- **User**: Comprehensive user profiles with roles and permissions
- **Car**: Vehicle management with availability and maintenance
- **Reservation**: Booking system with status tracking
- **Transaction**: Payment processing and history
- **Review**: User ratings and feedback system
- **Notification**: User communication and alerts
- **PaymentMethod**: Saved payment options
- **Insurance**: Insurance types and coverage options
- **Maintenance**: Vehicle maintenance scheduling

## 🏗️ Technical Architecture

### **Database (MongoDB)**
- **Provider**: MongoDB Atlas (Cloud)
- **ORM**: Prisma with MongoDB adapter
- **Schema**: Comprehensive rental car management system
- **Models**: User, Car, Reservation, Transaction, Review, and more

### **Frontend (React.js)**
```
frontend_ronorcar-main/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Hero.jsx         # Main hero section
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── SearchCarType.jsx # Car search interface
│   │   ├── Footer.jsx       # Footer component
│   │   └── ...              # Other components
│   ├── Pages/               # Page-level components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── Signup.jsx       # Registration page
│   │   └── ...              # Other pages
│   ├── scenes/              # Dashboard scenes
│   │   ├── dashboard/       # Main dashboard
│   │   ├── global/          # Global components
│   │   └── ...              # Other scenes
│   ├── Context/             # React contexts
│   │   └── authContext.jsx  # Authentication context
│   ├── Api/                 # API services
│   │   └── apiRequest.js    # Axios configuration
│   ├── dist/                # Built styles
│   │   └── styles.css       # Main stylesheet
│   └── routes/              # React Router
│       └── Router.jsx       # Route configuration
```

### **Backend (Node.js)**
```
Backend_ronorcar-main/
├── controllers/             # Route controllers
│   ├── auth.controller.js   # Authentication logic
│   ├── car.controller.js    # Car management
│   ├── reservation.controller.js # Booking logic
│   └── user.controller.js   # User management
├── routes/                 # API routes
│   ├── auth.js             # Auth endpoints
│   ├── cars.js             # Car endpoints
│   ├── reservations.js     # Booking endpoints
│   └── users.js            # User endpoints
├── prisma/                 # Database configuration
│   ├── schema.prisma       # Database schema
│   └── seed.js             # Database seeding
├── lib/                   # Database utilities
│   └── prisma.js          # Database connection
├── middleware/            # Express middleware
├── utils/                 # Helper functions
└── app.js                 # Main application file
```

## 🎨 Design System

### **Color Palette**
```css
/* White & Blue Theme */
--primary-white: #ffffff;
--light-blue: #e0f2fe;
--main-blue: #0ea5e9;
--dark-blue: #0284c7;
--text-dark: #1f2937;
--text-light: #6b7280;
```

### **Typography**
- **Font Family**: Poppins (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body Text**: Regular weight (300-400)
- **Buttons**: Uppercase with letter spacing

### **Design Patterns**
- **Glass-morphism**: Backdrop blur effects on navbar
- **Gradients**: White to blue linear gradients
- **Shadows**: Blue-tinted shadows for depth
- **Transitions**: Smooth 0.4s ease animations

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn package manager
- Git for version control

### **Installation Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/anas-tahi/rentalcar.git
   cd rentalcar
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend_ronorcar-main
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend_ronorcar-main
   npm install
   ```

4. **Environment Configuration**
   
   **Backend (.env)**
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/rentalcar?retryWrites=true&w=majority"
   
   # Server
   PORT=5000
   CLIENT_URL=http://localhost:3000
   
   # JWT
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   
   # PayPal (Sandbox)
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   ```

   **Frontend (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Database Setup**
   
   **Initialize Database**
   ```bash
   cd Backend_ronorcar-main
   npx prisma generate
   npx prisma db push
   npm run seed  # Optional: Seed database with sample data
   ```

6. **Start the Application**
   
   **Start Backend Server**
   ```bash
   cd Backend_ronorcar-main
   npm start
   ```
   
   **Start Frontend Server**
   ```bash
   cd frontend_ronorcar-main
   npm start
   ```

6. **Access the Application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000/api

## 📱 Application Screens

### **Public Pages**
- **Home Page**: Landing page with hero section and features
- **Login/Signup**: User authentication pages
- **About**: Company information
- **Contact**: Contact form and information
- **FAQ**: Frequently asked questions

### **User Dashboard**
- **Dashboard Home**: User welcome screen
- **Rent Car**: Car search and booking interface
- **My Reservations**: Booking history and management
- **Calendar**: Visual rental schedule
- **Profile**: User settings and preferences

### **Admin Dashboard**
- **Admin Home**: Administrative overview
- **User Management**: User administration
- **Car Management**: Fleet administration
- **Reservations**: Booking oversight
- **Analytics**: Business metrics

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### **Cars**
- `GET /api/cars` - Get all available cars
- `GET /api/cars/:id` - Get specific car details
- `POST /api/cars` - Add new car (Admin only)
- `PUT /api/cars/:id` - Update car (Admin only)
- `DELETE /api/cars/:id` - Delete car (Admin only)

### **Reservations**
- `GET /api/reservations` - Get user reservations
- `POST /api/reservations` - Create new reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Cancel reservation

### **Users**
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin only)

## 🎯 Key Features Implementation

### **Search Functionality**
- **AsyncSelect**: For car type and location selection
- **Date/Time Pickers**: For rental period selection
- **Real-time Filtering**: Instant search results
- **Responsive Design**: Mobile-friendly search interface

### **Booking System**
- **Availability Check**: Real-time car availability
- **Price Calculation**: Automatic pricing based on duration
- **Confirmation System**: Booking confirmation and details
- **Cancellation**: Easy booking cancellation

### **User Experience**
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages
- **Navigation**: Intuitive menu and breadcrumbs

## 🔒 Security Features

### **Authentication Security**
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Prevent XSS attacks
- **Password Hashing**: bcrypt for secure password storage
- **Session Management**: Secure session handling

### **Data Protection**
- **Input Validation**: Sanitize all user inputs
- **SQL Injection Prevention**: Parameterized queries
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: Prevent brute force attacks

## 🎨 Customization Guide

### **Changing Colors**
Edit `src/dist/styles.css`:
```css
:root {
  --main-blue: #your-color;
  --light-blue: #your-light-color;
  --dark-blue: #your-dark-color;
}
```

### **Adding New Components**
1. Create component in `src/components/`
2. Add styles to `src/dist/styles.css`
3. Import and use in pages

### **Modifying Layout**
- Edit `src/App.js` for routing
- Modify `src/components/Navbar.jsx` for navigation
- Update `src/components/Footer.jsx` for footer

## 📊 Technologies Used

### **Frontend Technologies**
- **React.js**: JavaScript library for UI (v18.3.1)
- **React Router**: Client-side routing (v6.23.1)
- **Ant Design**: UI component library (v5.17.4)
- **Material-UI (MUI)**: Advanced components (v5.15.17)
- **TailwindCSS**: Utility-first CSS framework (v3.4.3)
- **Axios**: HTTP client for API calls (v1.7.2)
- **Redux Toolkit**: State management (v2.2.5)
- **Styled Components**: CSS-in-JS styling (v6.1.11)
- **React Select**: Advanced select components (v5.8.0)
- **FullCalendar**: Calendar components (v6.1.13)
- **Chart.js & Recharts**: Data visualization
- **Stripe React**: Payment integration (v2.7.1)
- **FontAwesome**: Icon library (v6.5.2)

### **Backend Technologies**
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework (v4.19.2)
- **Prisma**: Database ORM with MongoDB (v5.14.0)
- **MongoDB**: NoSQL database (MongoDB Atlas)
- **JWT**: Authentication tokens (v9.0.2)
- **bcrypt**: Password hashing (v5.1.1)
- **Stripe**: Payment processing (v15.10.0)
- **PayPal SDK**: Alternative payment option
- **Morgan**: HTTP request logger
- **CORS**: Cross-origin resource sharing
- **Cookie Parser**: Cookie handling

### **Database & Storage**
- **MongoDB Atlas**: Cloud-hosted MongoDB
- **Prisma ORM**: Type-safe database access
- **Mongoose**: MongoDB object modeling (v8.4.0)

### **Development Tools**
- **Git**: Version control
- **npm**: Package management
- **PowerShell**: Command line (Windows)
- **VS Code**: Code editor
- **Nodemon**: Development server auto-restart
- **ESLint**: Code linting and formatting

## 🐛 Troubleshooting

### **Common Issues**

#### **Frontend Not Loading**
- Check if React server is running on port 3000
- Verify environment variables are set
- Check browser console for errors

#### **Backend API Not Responding**
- Ensure Node.js server is running on port 5000
- Check MongoDB Atlas connection string
- Verify Prisma client is generated
- Check environment variables in .env file

#### **Database Connection Issues**
- Verify MongoDB Atlas credentials
- Check IP whitelist in MongoDB Atlas
- Ensure DATABASE_URL is correctly formatted
- Run `npx prisma generate` to update client
- Run `npx prisma db push` to sync schema

#### **Authentication Issues**
- Clear browser cookies and cache
- Check JWT_SECRET in .env file
- Verify token expiration settings (7d default)
- Ensure MongoDB user collection exists

### **Performance Optimization**
- Use React.memo for component optimization
- Implement lazy loading for large components
- Optimize images and assets
- Enable gzip compression on server

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### **Code Guidelines**
- Follow React best practices
- Use descriptive variable names
- Add comments for complex logic
- Maintain consistent code style

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- **GitHub Issues**: Create an issue in the repository
- **Email**: anasstahir4@gmail.com
- **Documentation**: Refer to this README file

## 🎉 Acknowledgments

- **React Team**: For the amazing React library
- **Ant Design**: For beautiful UI components
- **TailwindCSS**: For utility-first CSS framework
- **Node.js Community**: For the robust backend ecosystem

---

**Built with ❤️ using React.js and Node.js**

**Visit the live demo**: [Deployment URL - if available]

**Repository**: https://github.com/anas-tahi/rentalcar.git
