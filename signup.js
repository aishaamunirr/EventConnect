document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".auth-form");
  if (!signupForm) return;

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();


    let role = "client"; 
    let businessName = ""; 
    let businessType = "";
    if (document.title.includes("Vendor")) {
      role = "vendor";
      businessName = document.getElementById("businessName").value.trim();
      businessType = document.getElementById("businessType").value;
    }

    const hashedPassword = btoa(password); 
    const user = { fullname, email, hashedPassword, role,  businessName, businessType }; 

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email && user.role === role)) {
      alert("User already exists. Please log in.");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));


    const userWithoutPassword = { fullname, email, role, businessName, businessType };
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

    alert("Signup successful! Redirecting to your dashboard...");
    if (role === "client") {
      window.location.href = "clientdashboard.html";
    } else {
      window.location.href = "vendordashboard.html";
    }
  });
});