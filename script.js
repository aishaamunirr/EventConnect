const categorySelect = document.getElementById('categorySelect');
const vendorList = document.getElementById('vendorList');

const searchInput = document.createElement('input');
searchInput.type = "text";
searchInput.placeholder = "Search vendors...";
searchInput.classList.add("search-bar");
categorySelect.insertAdjacentElement("afterend", searchInput);

let vendorsData = [];

function renderVendors(vendors) {
  vendorList.innerHTML = '';
  if (vendors.length === 0) {
    vendorList.innerHTML = '<p class"no-vendors">No vendors found.</p>';
    return;
  }

  vendors.forEach(vendor => {
    const card = document.createElement('div');
    card.classList.add('vendor-card');
    card.innerHTML = `
    <img src="${vendor.image}" alt="${vendor.name}">
    <h3>${vendor.name}</h3>
    <p>Price Range: ${vendor.price}</p>
    <p>Location: ${vendor.location}</p>
    <div class="vendor-profile-button">
    <button class="get-started-btn2 profile-btn" data-name="${vendor.name}">View Profile</button>
    <button class="get-started-btn2 contact-btn" data-name="${vendor.name}" data-contact="${vendor.contact}">Contact Vendor</button>
    <button class="get-started-btn2 book-btn" data-name="${vendor.name}">Book Now</button>
    </div>
`;

    vendorList.appendChild(card);
  });


  document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openContactModal(btn.dataset.name, btn.dataset.contact);
    });
  });

  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openBookingModal(btn.dataset.name);
    });
  });

  document.querySelectorAll('.profile-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    openProfileModal(btn.dataset.name);
    });
  });
}

fetch('vendors.json')
  .then(response => response.json())
  .then(data => {
    vendorsData = data;
    renderVendors(vendorsData);
  });

categorySelect.addEventListener('change', () => {
  const category = categorySelect.value;

  let filteredVendors;
  if (category) {
    filteredVendors = vendorsData.filter(vendor => vendor.category === category);
  } else {
    filteredVendors = vendorsData;
  }

  renderVendors(filteredVendors);
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  let filtered = vendorsData.filter(vendor =>
    vendor.name.toLowerCase().includes(query) ||
    vendor.location.toLowerCase().includes(query)
  );

  if (category) {
    filtered = filtered.filter(vendor => vendor.category === category);
  }

  renderVendors(filtered);
});

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector(".hamburger");
  menu.classList.toggle("show");
  hamburger.classList.toggle("active");
}

const signupForm = document.querySelector('.auth-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Account created successfully! You can now log in.");
  });
}

const contactModal = document.getElementById('contactModal');
const bookingModal = document.getElementById('bookingModal');
const closeBtns = document.querySelectorAll('.close-modal');

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.parentElement.style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

function openContactModal(name, contact) {
  document.getElementById('contactVendorName').innerText = name;
  document.getElementById('contactForm').onsubmit = (e) => {
    e.preventDefault();
    alert(`Message sent to ${name} successfully!`);
    contactModal.style.display = 'none';
  };
  contactModal.style.display = 'block';
}

function openBookingModal(name) {
  document.getElementById('bookingVendorName').innerText = name;
  document.getElementById('bookingForm').onsubmit = (e) => {
    e.preventDefault();
    alert(`Booking with ${name} successful!`);
    bookingModal.style.display = 'none';
  };
  bookingModal.style.display = 'block';
}


function openProfileModal(name) {
  document.getElementById('profileVendorName').innerText = name;
  profileModal.style.display = 'block';
}
