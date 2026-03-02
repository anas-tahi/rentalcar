import React from "react";
import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import Header from "../../components/Dash/Header";
import { tokens } from "../../styles/theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const boxRef = useRef(null);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [formTitleVisible, setFormTitleVisible] = useState(false);
  const [isEventFormVisible, setIsEventFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [EventSelected, setEventSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (selected) => {
    setFormTitleVisible(true);
    setIsEventFormVisible(true);
    setIsEditFormVisible(false);
    setSelectedDate(selected);
  };

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setIsEventFormVisible(false);
      setIsEditFormVisible(false);
      setFormTitleVisible(false);
      setTitle("");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = () => {
    if (selectedDate && title) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();
      calendarApi.addEvent({
        id: `${selectedDate.dateStr}-${title}`,
        title,
        start: selectedDate.startStr,
        end: selectedDate.endStr,
        allDay: selectedDate.allDay,
      });
      setIsEventFormVisible(false);
      setFormTitleVisible(false);
      setTitle("");
    }
  };

  const handleUpdateEvent = () => {
    if (selectedDate && title && EventSelected) {
      const updatedEvent = {
        ...EventSelected.event.toPlainObject(),
        title: title,
      };
      EventSelected.event.setProp("title", title); // Update the event's title
      console.log("Event Updated:", title);
      setIsEditFormVisible(false);
      setFormTitleVisible(false);
      setTitle("");
      setEventSelected(null); // Clear selected event after update
    }
  };

  const handleDeleteEvent = () => {
    if (EventSelected) {
      EventSelected.event.remove();
      setIsEditFormVisible(false);
      setEventSelected(null); // Clear selected event after delete
    }
  };

  const handleEventClick = (selected) => {
    setEventSelected(selected);
    setIsEditFormVisible(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box position="relative" m="20px">
      <AnimatePresence>
        {(isEventFormVisible || isEditFormVisible) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 99998,
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          />
        )}
      </AnimatePresence>

      <Box className={isEventFormVisible ? "blur-background" : ""}>
        <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
          >
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          {/* CALENDAR */}
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: "12315",
                  title: "All-day event",
                  date: "2024-06-14",
                },
                {
                  id: "5123",
                  title: "Timed event",
                  date: "2024-07-28",
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
      <AnimatePresence>
        {isEventFormVisible && (
          <motion.div
            ref={boxRef}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: 50,
              borderRadius: 4,
              backgroundColor: "white",
              position: "absolute",
              top: "22%",
              left: "32%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              zIndex: 99999,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ marginBottom: 2, color: "#333" }}>
                Please enter a new title for your event
              </Typography>
              <i
                className="fas fa-times close-icon"
                onClick={() => {
                  setIsEventFormVisible(false);
                  setFormTitleVisible(false);
                  setTitle("");
                }}
              />
            </Box>
            <TextField
  sx={{
    backgroundColor: "#DCDCDC",
    borderRadius: "4px",
    "& .MuiFilledInput-root": {
      backgroundColor: "#DCDCDC",
      "&:hover": {
        backgroundColor: "#C0C0C0",
      },
      "&.Mui-focused": {
        backgroundColor: "#DCDCDC",
      },
    },
    "& .MuiInputLabel-root": {
      color: "black",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  }}
  inputProps={{ style: { color: "black" } }} // Set text color to black
  fullWidth
  variant="filled"
  type="text"
  label="Event Title"
  value={title}
  onChange={handleTitleChange}
/>


            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleFormSubmit}
            >
              Add Event
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isEditFormVisible && (
          <motion.div
            ref={boxRef}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: "3rem 8rem",
              borderRadius: 4,
              backgroundColor: "white",
              position: "absolute",
              top: "18%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              zIndex: 99999,
            }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="h6" sx={{ marginBottom: 2, color: "#333" }}>
                Edit Event
              </Typography>
              <TextField
                sx={{
                  backgroundColor: "#DCDCDC",
                  borderRadius: "4px",
                  color: "black",
                  marginBottom: 2,
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#DCDCDC",
                    "&:hover": {
                      backgroundColor: "#C0C0C0",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#DCDCDC",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
                fullWidth
                variant="filled"
                type="text"
                label="Event Title"
                value={title}
                onChange={handleTitleChange}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginBottom: 1 }}
                onClick={handleUpdateEvent}
              >
                Update Event
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteEvent}
                disabled={!EventSelected}
              >
                Delete Event
              </Button>
            </Box>
            <i
              className="fas fa-times"
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "#333",
              }}
              onClick={() => {
                setIsEventFormVisible(false);
                setFormTitleVisible(false);
                setIsEditFormVisible(false);
                setTitle("");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Calendar;
