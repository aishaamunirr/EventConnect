document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const hashedInputPassword = btoa(password); 


    const foundUser = users.find(
      (user) => user.email === email && user.hashedPassword === hashedInputPassword && user.role === role
    );

    if (foundUser) {
      alert(`Welcome back, ${foundUser.fullname || foundUser.role}!`);


      const userWithoutPassword = {
        fullname: foundUser.fullname,
        email: foundUser.email,
        role: foundUser.role,
        businessName: foundUser.businessName,
        businessType: foundUser.businessType
      };
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));


      if (role === "client") {
        window.location.href = "clientdashboard.html"; 
      } else if (role === "vendor") {
        window.location.href = "vendordashboard.html";
      }
    } else {
      const userExists = users.some(user => user.email === email && user.role === role);
      if (userExists) {
        alert("Invalid password. Please try again.");
      } else {
        alert("No account found with this email and role. Please sign up first.");
      }
    }

  });
});