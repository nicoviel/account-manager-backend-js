import Handlebars from "handlebars";

const handlebars = require("handlebars");

// 👉 Tous tes helpers ici
handlebars.registerHelper("formatDate", function(date:Date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
});

// 👉 Exporter l’instance Handlebars avec les helpers
export default Handlebars;
