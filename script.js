// Global variable to store the job data
let jobData = [];

// Function to fetch data from JSON file
async function fetchJobData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        jobData = data.jobs;
        displayJobs(jobData);
    } catch (error) {
        console.log('Error fetching job data:', error);
    }
}

// Function to create an element with given tag name and text content
function createElement(tagName, textContent) {
    const element = document.createElement(tagName);
    element.textContent = textContent;
    return element;
}

// Function to display job listings
function displayJobs(jobs) {
    const jobBoard = document.getElementById('job-board');
    jobBoard.innerHTML = ''; // Clear previous job listings

    jobs.forEach((job, index) => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job');

        jobElement.appendChild(createElement('h3', job.title));
        jobElement.appendChild(createElement('p', 'Location: ' + job.location));
        jobElement.appendChild(createElement('p', 'Employment Type: ' + job.employmentType));

        // View Details button
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Details';
        viewButton.addEventListener('click', () => openJobDetailsWindow(index));
        jobElement.appendChild(viewButton);

        jobBoard.appendChild(jobElement);
    });
}

// Function to filter jobs based on user selections
function filterJobs() {
    const titleFilter = document.getElementById('title-filter').value.toLowerCase();
    const locationFilter = document.getElementById('location-filter').value;
    const typeFilter = document.getElementById('type-filter').value;

    const filteredJobs = jobData.filter(job => {
        const titleMatch = job.title.toLowerCase().includes(titleFilter);
        const locationMatch = locationFilter === '' || job.location === locationFilter;
        const typeMatch = typeFilter === '' || job.employmentType === typeFilter;

        return titleMatch && locationMatch && typeMatch;
    });

    displayJobs(filteredJobs);
}

// Function to open a new tab with job details
function openJobDetailsWindow(index) {
    const job = jobData[index];

    const jobDetailsHTML = `
        <html>
        <head>
            <title>Job Details</title>  
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>
        <body>
            <div class="job-details-body">
    <h3>${job.title}</h3>
    <div class="job-info">
        <p>Location: ${job.location}</p>
        <p>Employment Type: ${job.employmentType}</p>
    </div>
    <div class="description-container">
        <p>Description: ${job.description}</p>
    </div>
    <div class="application-container">
        <h4>Application Form</h4>
        <label for="name">Name:</label>
        <input type="text" id="name">
        <label for="email">Email:</label>
        <input type="email" id="email">
        <label for="files">Attach Files:</label>
        <input type="file" id="files" multiple>
        <button onclick="applyForJob(${index})">Apply</button>
    </div>
            <script src="script.js"></script>
        </body>
        </html>
    `;

    const jobDetailsWindow = window.open('', '_blank');
    jobDetailsWindow.document.open();
    jobDetailsWindow.document.write(jobDetailsHTML);
    jobDetailsWindow.document.close();
}

// Function to submit job application
function submitApplication(event, index) {
    event.preventDefault();

    const form = document.getElementById('application-form');
    const name = form.name.value;
    const email = form.email.value;
    const resume = form.resume.files[0];

    console.log('Application submitted for job index', index);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Resume:', resume);
}

}

// Read data when the page loads
window.addEventListener('DOMContentLoaded', fetchJobData);
