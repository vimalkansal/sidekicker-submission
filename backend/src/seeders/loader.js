const fs = require('fs');
const csv = require('csv-parser');
const db = require('../models');
const csvstring = require('csv-string');



(async () => {
    await db.sequelize.sync({ force: true });

    // Locations
    locations = await Promise.all(['Melbourne','Sydney','Brisbane','Perth'].map(async city => {
        const location = await db.Location.create({ name: city.toUpperCase() });
        return location;
    }));

    fs.createReadStream(__dirname + '/jobs-list.csv')
        .pipe(csv())
        .on('data', async (record) => {
            /*
            1. Create applicant if it doesn't exist (JobSeeker table).
            2. Extract location from the description.
            3. Create the location if it doesn't exist (Location table).
            4. Extract the title and description.
            5. Create the job posting (Job Posting table) with the title, description and the existing location (foreign key).
            6. Create job application with the job posting (foreign key relationship) and application (foreign key relationship.)
            */
            applicants = record.applicants;
            // let's create  an array of applicants
            applicantList = csvstring.parse(applicants)[0];
            const jobSeekers = await Promise.all(applicantList.map(async elem => {
                const name = elem.trim();

                const [jobSeeker] = await db.JobSeeker.findOrCreate({
                    where: { name: name },
                });

                return jobSeeker;
            }));

            

            // Job Posting
            
            //Find the location object, for now I ma harcoding it to Melbourne
            const jobTitle = record["job title"];
            const jobDescription = record["job description"];
            const segments = record["date"].split('/')
            const jobPostingDate = new Date(segments[1] + '/' +segments[0] +'/' + segments[2]);
            const location = locations.filter(loc => jobDescription.toUpperCase().includes(loc.name))[0]; // check if array is empty
            const jobPosting = await db.JobPosting.create({title: jobTitle, description: jobDescription,postingDate: jobPostingDate,locationId: location.id});
            console.log(jobPosting, '######', jobPosting.dataValues.id, '@@@');
            jobSeekers.forEach(async jobSeeker => {
                await db.JobApplication.create({ JobSeekerId: jobSeeker.id, JobPostingId: jobPosting.id });
            });
            
           
        }); //on
       
})();