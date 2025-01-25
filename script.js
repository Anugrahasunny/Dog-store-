document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for reaching out! We will get back to you soon.");
});
const veterinarians = [
    { name: "Dr. Alice Johnson", specialty: "General Practice", location: "New York", phone: "(123) 456-7890" },
    { name: "Dr. Bob Smith", specialty: "Surgery", location: "Los Angeles", phone: "(234) 567-8901" },
    { name: "Dr. Carol Lee", specialty: "Emergency Care", location: "Chicago", phone: "(345) 678-9012" },
    { name: "Dr. David Williams", specialty: "Dermatology", location: "New York", phone: "(456) 789-0123" },
    { name: "Dr. Emily Davis", specialty: "Dental Care", location: "San Francisco", phone: "(567) 890-1234" }
];

function searchVeterinarians() {
    const locationInput = document.getElementById("location").value.toLowerCase();
    const filteredVets = veterinarians.filter(vet => vet.location.toLowerCase().includes(locationInput));
    
    const vetListElement = document.getElementById("vet-list");
    vetListElement.innerHTML = ""; // Clear the previous list

    if (filteredVets.length === 0) {
        vetListElement.innerHTML = "<li>No veterinarians found in this area.</li>";
    } else {
        filteredVets.forEach(vet => {
            const vetElement = document.createElement("li");
            vetElement.innerHTML = `
                <h3>${vet.name}</h3>
                <p>Specialty: ${vet.specialty}</p>
                <p>Location: ${vet.location}</p>
                <p>Phone: ${vet.phone}</p>
            `;
            vetListElement.appendChild(vetElement);
        });
    }
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("message").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById("message").innerHTML = `Your location: Latitude: ${latitude}, Longitude: ${longitude}`;
    loadMap(latitude, longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("message").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("message").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("message").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("message").innerHTML = "An unknown error occurred.";
            break;
    }
}

function loadMap(latitude, longitude) {
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 12
    };
    
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: "You are here"
    });

    // Example marker for a nearby veterinary clinic (coordinates for demonstration)
    const clinicMarker = new google.maps.Marker({
        position: { lat: latitude + 0.01, lng: longitude + 0.01 },
        map: map,
        title: "Nearby Veterinary Clinic"
    });
}