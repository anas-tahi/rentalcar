# Rental Car Application - Frontend (React)

Welcome to the Rental Car Application! This project is the frontend portion of a comprehensive car rental service platform built using React.js.

## Demo
Experience the application firsthand:
- **Live Demo**: [Visit here](https://ibrahimelmailoudi.github.io/frontend_ronorcar/)

## Features
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **User Interface**: Interactive and user-friendly design using Ant Design components.
- **Car Browsing**: Users can browse and search for available cars.
- **Booking Management**: Interfaces for creating, viewing, updating, and deleting car reservations.
- **Modern Animations**: Smooth and appealing UI transitions.

## Technologies

### Frontend
- **React.js**: For building a dynamic and interactive user interface.
- **Ant Design**: To create sleek, professional UI components.
- **React Router**: For efficient client-side routing.
- **Axios**: To handle HTTP requests for data fetching.
- **Tailwind CSS**: (Optional) For additional styling.

## Setup
To get this project running on your local machine:

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **Git**

### Installation
1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd rental-car-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** for environment-specific configurations:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   The application should be running on `http://localhost:3000`.

## Project Structure
```plaintext
rental-car-frontend/
├── Api/
├── components/
│   ├── 1/
│   │   └── reuseable/
│   │       └── Layout/
│   ├── Dash/
│   └── scenes/
│       ├── bar/
│       ├── calendar/
│       ├── contacts/
│       ├── dashboard/
│       ├── faq/
│       ├── form/
│       ├── geography/
│       ├── global/
│       ├── invoices/
│       ├── line/
│       ├── pie/
│       └── team/
├── Context/
├── data/
├── dist/
├── images/
│   ├── about/
│   ├── banners/
│   ├── BlogPost/
│   ├── book-car/
│   ├── BrandCar/
│   │   └── new/
│   ├── Cars/
│   ├── cars-big/
│   ├── chooseUs/
│   ├── Default/
│   ├── faq/
│   ├── hero/
│   ├── logo/
│   ├── plan/
│   ├── profileImg/
│   ├── team/
│   └── testimonials/
├── Pages/
├── routes/
├── scenes/
│   ├── bar/
│   ├── calendar/
│   ├── contacts/
│   ├── dashboard/
│   ├── faq/
│   ├── form/
│   ├── geography/
│   ├── global/
│   ├── Help/
│   ├── invoices/
│   ├── line/
│   ├── pie/
│   ├── Settings/
│   │   └── sections/
│   └── team/
├── styles/
│   ├── AboutStyles/
│   ├── BannerStyles/
│   ├── BookStyles/
│   ├── ChooseStyles/
│   ├── ContactStyles/
│   ├── DownloadStyles/
│   ├── FaqStyles/
│   ├── FooterStyles/
│   ├── global/
│   ├── HeroStyles/
│   ├── ModelsStyles/
│   ├── NavbarStyles/
│   ├── PickStyles/
│   ├── PlanTripStyles/
│   ├── TeamStyles/
│   └── TestimonialsStyles/
└── Videos/
```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a pull request.
