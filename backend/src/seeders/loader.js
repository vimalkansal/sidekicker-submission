const fs = require('fs');
const csv = require('csv-parser');
const db = require('../models');
const csvstring = require('csv-string');

(async () => {
    await db.sequelize.sync({ force: true });
    locations = await Promise.all(['Melbourne','Sydney','Brisbane','Perth'].map(async city => {
        const location = await db.Location.create({ name: city.toUpperCase() });
        return location;
    }));
    fs.createReadStream(__dirname + '/jobs-list.csv')
        .pipe(csv())
        .on('data', async (record) => {
            applicants = record.applicants;
            applicantList = csvstring.parse(applicants)[0];
            const jobSeekers = await Promise.all(applicantList.map(async elem => {
                const name = elem.trim();
                const [jobSeeker] = await db.JobSeeker.findOrCreate({
                    where: { name: name },
                });
                return jobSeeker;
            }));
            const jobTitle = record["job title"];
            const jobDescription = record["job description"];
            const segments = record["date"].split('/')
            const jobPostingDate = new Date(segments[1] + '/' +segments[0] +'/' + segments[2]);
            const location = locations.filter(loc => jobDescription.toUpperCase().includes(loc.name))[0]; 
            const jobPosting = await db.JobPosting.create({title: jobTitle, description: jobDescription,postingDate: jobPostingDate,locationId: location.id});
            jobSeekers.forEach(async jobSeeker => {
                await db.JobApplication.create({ JobSeekerId: jobSeeker.id, JobPostingId: jobPosting.id });
            });
        });
})();