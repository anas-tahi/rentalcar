# 🚗 Rental Car Management System

A modern, full-stack car rental application built with React.js and Node.js, featuring a beautiful white and blue design theme.

## 🌟 Features

### 🎨 **Modern UI/UX Design**
- **Clean White & Blue Theme**: Professional and universally appealing color scheme
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Glass-morphic Effects**: Modern navbar with backdrop blur effects
- **Smooth Animations**: Interactive hover effects and transitions
- **Gradient Backgrounds**: Beautiful white to blue gradients throughout

### 🔐 **Authentication System**
- **User Registration & Login**: Secure authentication with JWT tokens
- **Role-Based Access**: Admin and user roles with different permissions
- **Protected Routes**: Secure dashboard access for authenticated users
- **Session Management**: HTTP-only cookies for enhanced security

### 🚗 **Car Rental Features**
- **Browse Cars**: View available vehicles with detailed information
- **Advanced Search**: Filter by type, location, dates, and time
- **Real-time Availability**: Check car availability for selected dates
- **Booking Management**: Create, view, and manage reservations
- **Payment Integration**: Multiple payment options support

### 👥 **User Dashboard**
- **Personal Profile**: Manage user information and preferences
- **Reservation History**: View past and current bookings
- **Calendar Integration**: Visual schedule of rental periods
- **Settings**: Account customization and notification preferences

### 🛠️ **Admin Dashboard**
- **User Management**: View and manage all registered users
- **Fleet Management**: Add, edit, and remove vehicles
- **Reservation Oversight**: Monitor all bookings and availability
- **Analytics Dashboard**: Business insights and statistics
- **System Settings**: Configure application parameters

## 🏗️ Technical Architecture

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
   PORT=5000
   JWT_SECRET_KEY=your_jwt_secret_key
   NODE_ENV=development
   ```

   **Frontend (.env)**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the Application**
   
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
- **React.js**: JavaScript library for UI
- **React Router**: Client-side routing
- **Ant Design**: UI component library
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Material-UI**: Date and time pickers

### **Backend Technologies**
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Prisma**: Database ORM
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing

### **Development Tools**
- **Git**: Version control
- **npm**: Package management
- **PowerShell**: Command line (Windows)
- **VS Code**: Code editor

## 🐛 Troubleshooting

### **Common Issues**

#### **Frontend Not Loading**
- Check if React server is running on port 3000
- Verify environment variables are set
- Check browser console for errors

#### **Backend API Not Responding**
- Ensure Node.js server is running on port 5000
- Check database connection
- Verify API endpoints in browser

#### **Authentication Issues**
- Clear browser cookies and cache
- Check JWT secret key in .env file
- Verify token expiration settings

#### **Database Issues**
- Check if database files exist
- Verify file permissions
- Restart backend server

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
- **Email**: [Your email address]
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
