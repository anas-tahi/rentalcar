import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { promiseOptionsCar, promiseOptionsCities } from "./CarBrand";
import "bootstrap/dist/css/bootstrap.min.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import {
  CarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

const StyledLocalizationProvider = styled(LocalizationProvider)({
  "& .MuiFormControl-root": {
    width: "100%",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const StyledTimePicker = styled(TimePicker)({
  "& .MuiInputBase-root": {
    fontSize: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 215, 0, 0.2)",
    borderRadius: "12px",
    color: "#fff",
  },
  "& .MuiInputLabel-root": {
    zIndex: "1",
    fontSize: "16px",
    color: "#FFD700",
    marginBottom: "0.5rem",
    fontWeight: "500",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    "& fieldset": {
      borderColor: "rgba(255, 215, 0, 0.2)",
      borderRadius: "12px",
    },
    "&:hover fieldset": {
      borderColor: "#FFD700",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFA500",
      boxShadow: "0 0 0 2px rgba(255, 215, 0, 0.2)",
    },
  },
});

const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputBase-root": {
    fontSize: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 215, 0, 0.2)",
    borderRadius: "12px",
    color: "#fff",
  },
  "& .MuiInputLabel-root": {
    zIndex: "1",
    fontSize: "16px",
    color: "#FFD700",
    marginBottom: "0.5rem",
    fontWeight: "500",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    "& fieldset": {
      borderColor: "rgba(255, 215, 0, 0.2)",
      borderRadius: "12px",
    },
    "&:hover fieldset": {
      borderColor: "#FFD700",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFA500",
      boxShadow: "0 0 0 2px rgba(255, 215, 0, 0.2)",
    },
  },
});

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    zIndex: "999",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 215, 0, 0.2)",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.1)",
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    borderColor: state.isFocused ? "#FFD700" : "rgba(255, 215, 0, 0.2)",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(255, 215, 0, 0.2)" : "none",
    borderRadius: "12px",
    padding: "12px",
    color: "#fff",
    "&:hover": {
      borderColor: "#FFD700",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#FFD700" : state.isFocused ? "rgba(255, 215, 0, 0.1)" : "transparent",
    color: state.isSelected ? "#000" : "#fff",
    "&:hover": {
      backgroundColor: "rgba(255, 215, 0, 0.1)",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
    fontWeight: "500",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.6)",
  }),
  input: (provided) => ({
    ...provided,
    color: "#fff",
  },
};

const SearchCarType = ({ onSearch }) => {
  const [carType, setCarType] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState(null);
  const [pickTime, setPickTime] = useState(null);
  const [dropOffDate, setDropOffDate] = useState(null);
  const [dropTime, setDropTime] = useState(null);
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!pickUpDate || !pickTime || !dropOffDate || !dropTime) {
      setFormError(true);
      return;
    }
    
    setFormError(false);
    const params = {
      carType,
      pickUpLocation,
      pickUpDate,
      pickTime,
      dropOffDate,
      dropTime
    };
    onSearch(params);
    document
      .querySelector("#Result-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="booking-section" className="book-section relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black/90 z-10" />
      
      <div className="container relative z-20">
        <div className="book-content">
          <motion.div 
            className="book-content__box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold text-white mb-2">
                <span className="text-yellow-400">Premium</span> Car Booking
              </h2>
              <p className="text-gray-300 text-lg">
                Find your perfect ride in just a few clicks
              </p>
            </motion.div>

            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-center"
              >
                Please fill in all required fields marked with *
              </motion.div>
            )}

            <form className="box-formF" onSubmit={handleSubmit}>
              {/* First Row - Car Type and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="box-form__car-type"
                >
                  <label className="LabelSearch flex items-center space-x-2 text-yellow-400 font-semibold mb-3">
                    <CarOutlined />
                    <span>Select Your Car Type</span>
                    <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={promiseOptionsCar}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        fontSize: "16px",
                        color: "#fff",
                        paddingBlock: "8px",
                      }),
                      menu: customStyles.menu,
                    }}
                    onChange={(selectedOption) =>
                      setCarType(selectedOption?.label || "")
                    }
                    placeholder="Choose your preferred car type..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="box-form__car-type"
                >
                  <label className="LabelSearch flex items-center space-x-2 text-yellow-400 font-semibold mb-3">
                    <EnvironmentOutlined />
                    <span>Pick-up Location</span>
                  </label>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={promiseOptionsCities}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        fontSize: "16px",
                        color: "#fff",
                        paddingBlock: "8px",
                      }),
                      menu: customStyles.menu,
                    }}
                    onChange={(selectedOption) =>
                      setPickUpLocation(selectedOption?.label || "")
                    }
                    placeholder="Select pick-up location..."
                  />
                </motion.div>
              </div>

              {/* Second Row - Date and Time */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="date-time-box grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <div className="box-form__car-type">
                  <label className="LabelSearch flex items-center space-x-2 text-yellow-400 font-semibold mb-3">
                    <CalendarOutlined />
                    <span>Pick-up Date <span className="text-red-400">*</span></span>
                  </label>
                  <StyledLocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <StyledDatePicker
                        label="Select Date"
                        className="datePickerStyle"
                        onChange={(date) =>
                          setPickUpDate(date ? date.format("YYYY-MM-DD") : "")
                        }
                      />
                    </DemoContainer>
                  </StyledLocalizationProvider>
                </div>

                <div className="box-form__car-type">
                  <label className="LabelSearch flex items-center space-x-2 text-yellow-400 font-semibold mb-3">
                    <ClockCircleOutlined />
                    <span>Pick-up Time <span className="text-red-400">*</span></span>
                  </label>
                  <StyledLocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <StyledTimePicker
                        label="Select Time"
                        className="timePickerStyle"
                        onChange={(time) =>
                          setPickTime(time ? time.format("HH-mm A") : "")
                        }
                      />
                    </DemoContainer>
                  </StyledLocalizationProvider>
                </div>

                <div className="box-form__car-type">
                  <label className="LabelSearch flex items-center space-x-2 text-yellow-400 font-semibold mb-3">
                    <CalendarOutlined />
                    <span>Drop-off Date <span className="text-red-400">*</span></span>
                  </label>
                  <StyledLocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <StyledDatePicker
                        label="Select Date"
                        className="datePickerStyle"
                        onChange={(date) =>
                          setDropOffDate(date ? date.format("YYYY-MM-DD") : "")
                        }
                      />
                    </DemoContainer>
                  </StyledLocalizationProvider>
                </div>

                <div className="box-form__car-type">
                  <label className="LabelSearch flex items-center space-x-2 text-yellow-400 font-semibold mb-3">
                    <ClockCircleOutlined />
                    <span>Drop-off Time <span className="text-red-400">*</span></span>
                  </label>
                  <StyledLocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <StyledTimePicker
                        label="Select Time"
                        className="timePickerStyle"
                        onChange={(time) =>
                          setDropTime(time ? time.format("HH-mm A") : "")
                        }
                      />
                    </DemoContainer>
                  </StyledLocalizationProvider>
                </div>
              </motion.div>

              {/* Search Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 text-center"
              >
                <button
                  className="buttonSave group relative overflow-hidden"
                  type="submit"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <SearchOutlined />
                    <span>Search Available Cars</span>
                    <ThunderboltOutlined className="group-hover:animate-pulse" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SearchCarType;
