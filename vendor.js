document.addEventListener("DOMContentLoaded", () => {
let vendorServices = JSON.parse(localStorage.getItem("vendorServices")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    

    if (!currentUser || currentUser.role !== "vendor") {
        alert("Please log in as a vendor first.");
        window.location.href = "login.html";
        return;
    }
    
    document.getElementById("vendorName").textContent = currentUser.fullname || "Not provided";
    document.getElementById("vendorEmail").textContent = currentUser.email || "Not provided";
    
    document.getElementById("businessName").textContent = currentUser.businessName || "Not provided";
    document.getElementById("businessType").textContent = currentUser.businessType || "Not provided";
    
    const serviceList = document.getElementById('serviceList');
    const modal = document.getElementById('serviceModal');
    const addBtn = document.getElementById('addServiceBtn');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('serviceForm');
    let editIndex = null;

    addBtn.onclick = () => {
        form.reset();
        editIndex = null;
        document.getElementById('modalTitle').textContent = "Add Service";
        modal.style.display = 'block';
    };


    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };

    function renderServices() {
        serviceList.innerHTML = '';
        vendorServices.forEach((service, index) => {
            const card = document.createElement('div');
            card.classList.add('service-card');
            card.innerHTML = `
                <img src="${service.image}" alt="${service.serviceName}">
                <h4>${service.serviceName}</h4>
                <p>Price: ${service.price}</p>
                <p>Location: ${service.location}</p>
                <div class="service-buttons">
                <button onclick="editService(${index})" class="service-button">Edit</button>
                <button onclick="deleteService(${index})" class="service-button">Delete</button>
                </div>
            `;
            serviceList.appendChild(card);
        });
    }

    
    form.onsubmit = (e) => {
        e.preventDefault();
        const newService = {
            serviceName: document.getElementById('serviceName').value,
            price: document.getElementById('servicePrice').value,
            location: document.getElementById('serviceLocation').value,
            image: document.getElementById('serviceImage').value
        };

        if(editIndex !== null) {
            vendorServices[editIndex] = newService;
        } else {
            vendorServices.push(newService);
        }
        localStorage.setItem("vendorServices", JSON.stringify(vendorServices));

        modal.style.display = 'none';
        renderServices();
    };


    window.editService = function(index) {
        editIndex = index;
        const service = vendorServices[index];
        document.getElementById('modalTitle').textContent = "Edit Service";
        document.getElementById('serviceName').value = service.serviceName;
        document.getElementById('servicePrice').value = service.price;
        document.getElementById('serviceLocation').value = service.location;
        document.getElementById('serviceImage').value = service.image;
        modal.style.display = 'block';
    }

    // Delete service
    window.deleteService = function(index) {
        if(confirm("Are you sure you want to delete this service?")) {
            vendorServices.splice(index, 1);
            localStorage.setItem("vendorServices", JSON.stringify(vendorServices)); // 🔑 Save changes
            renderServices();
    }
}
renderServices();
});
