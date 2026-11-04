const categoryImages = {
  SPORTS: "/images/events/sports.jpg",
  TECH: "/images/events/technology.jpg",
  TECHNOLOGY: "/images/events/technology.jpg",
  DESIGN: "/images/events/design.jpg",
  CULTURE: "/images/events/culture.jpg",
  WORKSHOP: "/images/events/workshop.jpg",
  GENERAL: "/images/events/campus.jpg",
};

export function getEventCategoryImage(category) {
  return (
    categoryImages[String(category || "").toUpperCase()] ||
    categoryImages.GENERAL
  );
}
