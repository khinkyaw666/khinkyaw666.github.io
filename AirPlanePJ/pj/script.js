document.addEventListener('DOMContentLoaded', function() {
    // Example: Smooth scrolling for nav links (if you add internal anchors)
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Example: Make navbar opaque on scroll (like some modern sites)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#2c3e50'; /* A solid darker color */
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        }
    });

    // Handle return date enabling/disabling for one-way/round-trip
    const roundTripRadio = document.getElementById('roundTrip');
    const oneWayRadio = document.getElementById('oneWay');
    const returnDateInput = document.getElementById('returnDate');

    function toggleReturnDate() {
        if (oneWayRadio.checked) {
            returnDateInput.disabled = true;
            returnDateInput.value = ''; // Clear date if disabled
        } else {
            returnDateInput.disabled = false;
        }
    }

    // Initial check
    toggleReturnDate();

    // Add event listeners for changes
    roundTripRadio.addEventListener('change', toggleReturnDate);
    oneWayRadio.addEventListener('change', toggleReturnDate);

    // You would integrate a date picker library here (e.g., flatpickr, jQuery UI Datepicker)
    // For example, using Flatpickr:
    /*
    flatpickr("#departDate", {
        dateFormat: "Y-m-d",
        minDate: "today"
    });
    flatpickr("#returnDate", {
        dateFormat: "Y-m-d",
        minDate: "today"
    });
    */

    // Simple form submission handler (for demonstration, in a real app this would be AJAX)
    const flightBookingForm = document.querySelector('#flight .booking-form');
    flightBookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;
        const departDate = document.getElementById('departDate').value;
        const returnDate = document.getElementById('returnDate').value;
        const passengers = document.getElementById('passengers').value;

        if (origin && destination && departDate && passengers) {
            alert(`Searching flights from ${origin} to ${destination} on ${departDate} ${returnDate ? 'returning ' + returnDate : ''} for ${passengers} traveler(s).`);
            // In a real application, you would make an API call here.
        } else {
            alert('Please fill in all required flight details.');
        }
    });

});

// **********************************************************************
// explore start 
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarCollapse = document.getElementById('sidebarCollapse');

    // Function to toggle sidebar classes
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
        // Optional: Add a temporary overlay on content when sidebar is open on small screens
        // This can improve UX by making it clear that the main content is currently obscured.
        // For example, you could add/remove a 'sidebar-open-overlay' class to the body or #content.
    }

    // Event listener for the toggle button
    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent this click from bubbling up to content and immediately closing sidebar
            toggleSidebar();
        });
    }

    // Close sidebar if clicking outside when it's open on small screens
    content.addEventListener('click', function(e) {
        // Check if the sidebar is currently open AND if the screen width is small (below lg breakpoint)
        if (sidebar.classList.contains('active') && window.innerWidth <= 991.98) {
            // Check if the click is *outside* the sidebar itself and *not* on the toggle button
            // If the clicked element is not the sidebar and not the toggle button, then close the sidebar
            if (!sidebar.contains(e.target) && !sidebarCollapse.contains(e.target)) {
                toggleSidebar();
            }
        }
    });

    // Optional: Highlight active sidebar link based on current URL path
    const path = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('#sidebar ul li a');
    sidebarLinks.forEach(link => {
        // Adjust logic if your links are to different pages or just hash links
        const linkHref = link.getAttribute('href');
        if (linkHref === path || (linkHref === '#' && path === '/explore.html') /* Example for dashboard link on this page */) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });

    // Simple alert for "Check Deals Now" button
    const checkDealsBtn = document.querySelector('.hero-banner .btn-purple');
    if (checkDealsBtn) {
        checkDealsBtn.addEventListener('click', function() {
            alert('Redirecting to the best flight deals!');
            // In a real application, you'd navigate to a search results page
            // window.location.href = '/flight-deals';
        });
    }

    // Simple alert for "View Deals" buttons on cards
    document.querySelectorAll('.explore-card .btn-outline-purple').forEach(button => {
        button.addEventListener('click', function() {
            const cardTitle = this.closest('.explore-card').querySelector('.card-title').textContent;
            alert(`Exploring deals for ${cardTitle}!`);
            // In a real app, this would link to a detailed page for that destination or deal
        });
    });

    // Adjust sidebar and content state on window resize (important for responsive behavior)
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 991.98) { // If screen becomes large
            sidebar.classList.remove('active'); // Ensure sidebar is visible
            content.classList.remove('active'); // Ensure content is pushed
        } else { // If screen becomes small
            // Decide if sidebar should be hidden or stay open based on desired behavior
            // For this design, it starts hidden on small screens
            // sidebar.classList.add('active'); // If you want it to start hidden on small screens
            // content.classList.add('active'); // If you want it to start hidden on small screens
        }
    }, 200)); // Debounce to prevent excessive calls
});

// Debounce utility function
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}
// explore end

// *************************************************************************
// hotel ppage Start
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarCollapse = document.getElementById('sidebarCollapse'); // For small screen toggle

    // Function to toggle sidebar state (expanded/compact)
    function toggleSidebarExpansion() {
        sidebar.classList.toggle('expanded');
        content.classList.toggle('shifted');
    }

    // Set initial sidebar state based on screen size (default to expanded on large, compact on small)
    function setInitialSidebarState() {
        if (window.innerWidth > 991.98) { // Desktop view (lg breakpoint)
            sidebar.classList.add('expanded');
            content.classList.add('shifted');
        } else { // Mobile/Tablet view
            sidebar.classList.remove('expanded');
            content.classList.remove('shifted');
        }
    }

    // Call on load
    setInitialSidebarState();

    // Event listener for the small-screen toggle button
    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent this click from bubbling up
            // On small screens, this button will fully open/close the sidebar
            if (sidebar.classList.contains('expanded') && sidebar.classList.contains('temp-open')) {
                // If expanded by temp-open, close it fully
                sidebar.classList.remove('expanded', 'temp-open');
                content.classList.remove('shifted');
            } else {
                // Otherwise, open it fully
                sidebar.classList.add('expanded', 'temp-open'); // temp-open helps distinguish from default expanded state
                content.classList.add('shifted');
            }
        });
    }

    // Sidebar hover/click logic for desktop (expands/compacts)
    if (window.innerWidth > 991.98) {
        sidebar.addEventListener('mouseenter', function() {
            if (!sidebar.classList.contains('expanded')) {
                toggleSidebarExpansion();
            }
        });

        sidebar.addEventListener('mouseleave', function() {
            // Only collapse if it was expanded by hover
            if (sidebar.classList.contains('expanded')) {
                toggleSidebarExpansion();
            }
        });
    }


    // Close sidebar on clicking content area ONLY for small screens
    content.addEventListener('click', function(e) {
        if (window.innerWidth <= 991.98 && sidebar.classList.contains('expanded')) {
            // If sidebar is expanded on small screen and click is outside sidebar/toggle
            if (!sidebar.contains(e.target) && !sidebarCollapse.contains(e.target)) {
                sidebar.classList.remove('expanded', 'temp-open');
                content.classList.remove('shifted');
            }
        }
    });


    // Adjust sidebar and content state on window resize
    window.addEventListener('resize', debounce(function() {
        setInitialSidebarState(); // Recalculate and apply state
        // Hide sidebar toggle button on large screens
        if (window.innerWidth > 991.98) {
            sidebarCollapse.style.display = 'none';
        } else {
            sidebarCollapse.style.display = 'block';
        }
    }, 200));


    // Highlight active sidebar link based on current URL path
    const path = window.location.pathname.split('/').pop(); // Get filename
    const sidebarLinks = document.querySelectorAll('#sidebar ul li a');
    sidebarLinks.forEach(link => {
        // Example: if current page is hotel.html, highlight 'Hotel Stays'
        // You might need to adjust logic based on your actual site structure
        if (link.textContent.includes('Hotel Stays') && path === 'hotel.html') {
             link.parentElement.classList.add('active');
        } else if (link.textContent.includes('Dashboard') && path === 'index.html') {
            link.parentElement.classList.add('active'); // Assuming index.html is dashboard
        } else if (link.textContent.includes('Explore Destinations') && path === 'explore.html') {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });

    // Simple alerts for buttons (replace with actual functionality)
    document.querySelector('.hero-banner .btn-accent')?.addEventListener('click', function() {
        alert('Exploring the best hotel deals!');
    });

    document.querySelectorAll('.hotel-card .btn-outline-accent').forEach(button => {
        button.addEventListener('click', function() {
            const hotelName = this.closest('.hotel-card').querySelector('.card-title').textContent;
            alert(`Booking details for ${hotelName}!`);
        });
    });

    document.querySelectorAll('.feedback-item').forEach(item => {
        item.addEventListener('click', function() {
            const feedbackText = this.querySelector('.feedback-text').textContent;
            alert(`Full feedback: ${feedbackText}`);
        });
    });

});

// Debounce utility function
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}
// hotel page end