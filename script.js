// Global variables
let jobData = [];
let filteredJobs = [];

// Fetch job data from JSON file
async function fetchJobData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    jobData = data.jobs;
    filteredJobs = jobData;
    displayJobs(filteredJobs);
  } catch (error) {
    console.log('Error fetching job data:', error);
  }
}

// Create an element with given tag name and text content
function createElement(tagName, textContent) {
  const element = document.createElement(tagName);
  element.textContent = textContent;
  return element;
}

// Display job listings
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

// Filter jobs based on user selections
function filterJobs() {
  const titleFilter = document.getElementById('title-search').value.toLowerCase();
  const locationFilter = document.getElementById('location-search').value.toLowerCase();
  const fullCheckbox = document.getElementById('full-checkbox');
  const partCheckbox = document.getElementById('part-checkbox');

  filteredJobs = jobData.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(titleFilter);
    const locationMatch = job.location.toLowerCase().includes(locationFilter);
    const fullMatch = !fullCheckbox.checked || job.employmentType.toLowerCase() === 'full-time';
    const partMatch = !partCheckbox.checked || job.employmentType.toLowerCase() === 'part-time';

    return titleMatch && locationMatch && fullMatch && partMatch;
  });

  displayJobs(filteredJobs);
}

// Open a new tab with job details
function openJobDetailsWindow(index) {
  const job = filteredJobs[index];

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
              <form id="application-form" onsubmit="submitApplication(event, ${index})">
                <label for="name">Name:</label>
                <input type="text" id="name" required>
                <label for="email">Email:</label>
                <input type="email" id="email" required>
                <label for="resume">Attach Resume:</label>
                <input type="file" id="resume" required>
                <button type="submit">Apply</button>
              </form>
          </div>
        </div>
        <script src="script.js"></script>
        <script>
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
        </script>
    </body>
    </html>
  `;

  const jobDetailsWindow = window.open('', '_blank');
  jobDetailsWindow.document.open();
  jobDetailsWindow.document.write(jobDetailsHTML);
  jobDetailsWindow.document.close();
}

// Toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}

// Event listener for the dark mode toggle checkbox
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('change', toggleDarkMode);

// Event listeners for search inputs and checkboxes
const titleSearchInput = document.getElementById('title-search');
const locationSearchInput = document.getElementById('location-search');
const fullCheckbox = document.getElementById('full-checkbox');
const partCheckbox = document.getElementById('part-checkbox');

titleSearchInput.addEventListener('input', filterJobs);
locationSearchInput.addEventListener('input', filterJobs);
fullCheckbox.addEventListener('change', filterJobs);
partCheckbox.addEventListener('change', filterJobs);

// Read data when the page loads
window.addEventListener('DOMContentLoaded', fetchJobData);
