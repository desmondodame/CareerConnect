// Global variable to store the job data
let jobData = [];

// Function to fetch data from JSON file
function fetchJobData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            jobData = data.jobs;
            displayJobs(jobData);
        })
        .catch(error => console.log('Error fetching job data:', error));
}

// Function to display job listings
function displayJobs(jobs) {
    const jobBoard = document.getElementById('job-board');
    jobBoard.innerHTML = ''; // Clear previous job listings

    jobs.forEach((job, index) => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job');

        const titleElement = document.createElement('h3');
        titleElement.textContent = job.title;
        jobElement.appendChild(titleElement);

        const locationElement = document.createElement('p');
        locationElement.textContent = 'Location: ' + job.location;
        jobElement.appendChild(locationElement);

        const typeElement = document.createElement('p');
        typeElement.textContent = 'Employment Type: ' + job.employmentType;
        jobElement.appendChild(typeElement);

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
    const titleFilter = document.getElementById('title-filter').value;
    const locationFilter = document.getElementById('location-filter').value;
    const typeFilter = document.getElementById('type-filter').value;

    const filteredJobs = jobData.filter(job => {
        const titleMatch = job.title.toLowerCase().includes(titleFilter.toLowerCase());
        const locationMatch = locationFilter === '' || job.location === locationFilter;
        const typeMatch = typeFilter === '' || job.employmentType === typeFilter;

        return titleMatch && locationMatch && typeMatch;
    });

    displayJobs(filteredJobs);
}

// Function to open a new window with job details
function openJobDetailsWindow(index) {
    const job = jobData[index];

    const windowFeatures = 'width=600,height=400,resizable=yes';
    const jobDetailsWindow = window.open('', '_blank', windowFeatures);
    const jobDetailsHTML = `
        <html>
        <head>
            <title>Job Details</title>  
            <style>
                /* CSS styles for the new window */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    padding: 20px;
                }

                h3 {
                    color: #333;
                }

                p {
                    color: #666;
                }

                button {
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    border: none;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0056b3;
                }
            </style
            
        </head>
        <body>
            <h3>${job.title}</h3>
            <p>Location: ${job.location}</p>
            <p>Employment Type: ${job.employmentType}</p>
            <p>Description: ${job.description}</p>
            <button onclick="applyForJob(${index})">Apply</button>
        </body>
        </html>
    `;

    jobDetailsWindow.document.open();
    jobDetailsWindow.document.write(jobDetailsHTML);
    jobDetailsWindow.document.close();
}

// Function to handle applying for a job
function applyForJob(index) {
    const job = jobData[index];
    // Implement your logic to handle the job application, e.g., opening a new page or form
    console.log('Applying for Job:', job);
}

// Read data when the page loads
window.addEventListener('DOMContentLoaded', fetchJobData);
