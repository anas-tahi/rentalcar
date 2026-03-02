// menuItemsData.js
export const getMenuItemsData = (t) => [
  {
    title: t("Home"),
    url: "/",
    icon: "fa-home", // FontAwesome icon for Home
  },
  {
    title: t("Vehicles"),
    url: "/Vehicles",
    icon: "fa-car", // FontAwesome icon for Vehicles
  },
  {
    title: t("About"),
    url: "/about",
    icon: "fa-solid fa-circle-info", // FontAwesome icon for About
    submenu: [
      {
        title: t("Our Team"),
        url: "/team",
        icon: "fa-users", // FontAwesome icon for Our Team
      },
      {
        title: t("Testimonials"),
        url: "/testimonials",
        icon: "fa-comment", // FontAwesome icon for Testimonials
      },
    ],
  },
  {
    title: t("Contact"),
    url: "/Contact",
    icon: "fa-solid fa-square-envelope", // FontAwesome icon for Contact
  },
];

export const getMenuItemsDataLogin = (t) => [
  {
    title: t("Book a car"),
    url: "/Booking",
    icon: "fa-solid fa-check-to-slot", // FontAwesome icon for Contact
  },
];
