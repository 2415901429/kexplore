// AFTERGLOW - Event Management Website

const events = [
    {
        id: 1,
        title: "Neon Nights Festival",
        category: "Music",
        date: "November 22, 2026",
        time: "6:00 PM",
        venue: "Bhubaneswar Convention Centre",
        price: "₹799",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
        description: "Experience an unforgettable night of music, lights and energy with amazing artists and live performances."
    },
    {
        id: 2,
        title: "Creative Minds Summit",
        category: "Technology",
        date: "November 25, 2026",
        time: "10:00 AM",
        venue: "KIIT Auditorium",
        price: "₹499",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        description: "Meet creative thinkers, developers and innovators. Explore technology, ideas and the future."
    },
    {
        id: 3,
        title: "The Art Affair",
        category: "Art",
        date: "November 28, 2026",
        time: "4:00 PM",
        venue: "Art District Gallery",
        price: "₹299",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
        description: "Discover beautiful artwork, meet artists and explore an inspiring collection of creative expressions."
    },
    {
        id: 4,
        title: "Startup Spark",
        category: "Business",
        date: "December 2, 2026",
        time: "11:00 AM",
        venue: "Innovation Hub",
        price: "₹599",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
        description: "Connect with entrepreneurs, learn from industry experts and discover exciting startup opportunities."
    },
    {
        id: 5,
        title: "Rhythm & Soul",
        category: "Music",
        date: "December 5, 2026",
        time: "7:00 PM",
        venue: "Open Air Theatre",
        price: "₹899",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
        description: "Enjoy a magical evening filled with live music, unforgettable performances and great company."
    },
    {
        id: 6,
        title: "Future Forward",
        category: "Technology",
        date: "December 10, 2026",
        time: "9:30 AM",
        venue: "Tech Innovation Centre",
        price: "₹699",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
        description: "Explore emerging technologies, artificial intelligence and innovative solutions shaping tomorrow."
    }
];

const eventGrid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.querySelector(".filters");

let selectedCategory = "All";

// Display events
function displayEvents(list) {
    eventGrid.innerHTML = "";

    if (list.length === 0) {
        document.getElementById("emptyState").style.display = "block";
        return;
    }

    document.getElementById("emptyState").style.display = "none";

    list.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" loading="lazy">
            <div class="event-card-content">
                <span class="event-category">${event.category}</span>
                <h3>${event.title}</h3>
                <p>${event.description}</p>

                <div class="event-meta">
                    <span>📅 ${event.date}</span>
                    <span>${event.price}</span>
                </div>

                <button onclick="showEvent(${event.id})">
                    View Details →
                </button>
            </div>
        `;

        eventGrid.appendChild(card);
    });
}

// Search and category filter
function filterEvents() {
    const searchText = searchInput.value.toLowerCase();

    const filtered = events.filter(event => {
        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;

        const matchesSearch =
            event.title.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText) ||
            event.venue.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    displayEvents(filtered);
}

searchInput.addEventListener("input", filterEvents);

filters.addEventListener("click", function(e) {
    if (e.target.classList.contains("filter")) {
        document.querySelectorAll(".filter").forEach(button => {
            button.classList.remove("active");
        });

        e.target.classList.add("active");
        selectedCategory = e.target.dataset.category;

        filterEvents();
    }
});

// Event details modal
function showEvent(id) {
    const event = events.find(item => item.id === id);
    const content = document.getElementById("eventModalContent");

    content.innerHTML = `
        <img src="${event.image}" alt="${event.title}"
             style="width:100%;height:200px;object-fit:cover;border-radius:6px;margin-bottom:15px;">
        <span class="event-category">${event.category}</span>
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
        <p><strong>Ticket:</strong> ${event.price}</p>
        <button class="submit-btn" onclick="openRegistration(${event.id})">
            Register Now
        </button>
    `;

    document.getElementById("eventModal").classList.add("open");
}

// Registration
function openRegistration(eventId) {
    document.getElementById("eventModal").classList.remove("open");
    document.getElementById("registerModal").classList.add("open");

    const select = document.getElementById("eventSelect");

    select.innerHTML = '<option value="">Select an event</option>';

    events.forEach(event => {
        const option = document.createElement("option");
        option.value = event.id;
        option.textContent = event.title;
        select.appendChild(option);
    });

    if (eventId) {
        select.value = eventId;
    }

    document.getElementById("registrationForm").style.display = "flex";
    document.getElementById("successPanel").style.display = "none";
}

// Close modal
function closeModal(id) {
    document.getElementById(id).classList.remove("open");
}

// Close modal by clicking outside
document.querySelectorAll(".modal-backdrop").forEach(modal => {
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            modal.classList.remove("open");
        }
    });
});

// Registration form validation
document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const eventSelect = document.getElementById("eventSelect");

    let valid = true;

    document.querySelectorAll(".error").forEach(error => {
        error.textContent = "";
    });

    [name, email, phone, eventSelect].forEach(input => {
        input.classList.remove("invalid");
    });

    if (name.value.trim().length < 3) {
        document.getElementById("nameError").textContent =
            "Please enter your full name.";
        name.classList.add("invalid");
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";
        email.classList.add("invalid");
        valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone.value.trim())) {
        document.getElementById("phoneError").textContent =
            "Enter a valid 10-digit phone number.";
        phone.classList.add("invalid");
        valid = false;
    }

    if (!eventSelect.value) {
        document.getElementById("eventError").textContent =
            "Please select an event.";
        eventSelect.classList.add("invalid");
        valid = false;
    }

    if (!valid) return;

    const selectedEvent = events.find(
        event => event.id === Number(eventSelect.value)
    );

    const registration = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        event: selectedEvent.title,
        registeredAt: new Date().toISOString()
    };

    const registrations = JSON.parse(
        localStorage.getItem("afterglowRegistrations") || "[]"
    );

    registrations.push(registration);

    localStorage.setItem(
        "afterglowRegistrations",
        JSON.stringify(registrations)
    );

    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("successPanel").style.display = "block";

    document.getElementById("successText").textContent =
        `Thank you, ${registration.name}! Your registration for ${selectedEvent.title} is confirmed.`;
});

// Dark and light mode
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("afterglowTheme") === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");

    themeToggle.textContent = isLight ? "☾" : "☀";
    localStorage.setItem("afterglowTheme", isLight ? "light" : "dark");
});

// Newsletter subscription
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("newsletterEmail");
    const message = document.getElementById("newsletterMessage");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        message.textContent = "Please enter a valid email address.";
        return;
    }

    const subscribers = JSON.parse(
        localStorage.getItem("afterglowSubscribers") || "[]"
    );

    if (subscribers.includes(email.value.trim())) {
        message.textContent = "You are already subscribed!";
        return;
    }

    subscribers.push(email.value.trim());

    localStorage.setItem(
        "afterglowSubscribers",
        JSON.stringify(subscribers)
    );

    message.textContent = "You're subscribed! Stay tuned for exciting events.";
    email.value = "";
});

// Countdown timer
function updateCountdown() {
    const targetDate = new Date("November 22, 2026 18:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerHTML =
            "<h3>The event is happening now!</h3>";
        return;
    }

    document.getElementById("days").textContent =
        Math.floor(difference / (1000 * 60 * 60 * 24));

    document.getElementById("hours").textContent =
        Math.floor((difference / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").textContent =
        Math.floor((difference / (1000 * 60)) % 60);

    document.getElementById("seconds").textContent =
        Math.floor((difference / 1000) % 60);
}

// Initialize website
displayEvents(events);
updateCountdown();
setInterval(updateCountdown, 1000);
