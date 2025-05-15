document.addEventListener("DOMContentLoaded", function () {
    const currentYear = new Date().getFullYear();
    document.getElementById("year").textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById("lastUpdate").textContent = "Last updated: " + lastModified;
});
  