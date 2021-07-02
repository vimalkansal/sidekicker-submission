const db = require("../models");
const JobPosting = db.JobPosting;
const JobSeeker = db.JobSeeker;
const Location = db.Location;
const Op = db.Sequelize.Op;

exports.findAllJobPostings = (req, res) => {
    JobPosting.findAll({
        include: {
            model: Location,
            as: 'location'
          }
    })
    .then(data => {
        res.send(data.map(jobPosting => ({
        id: jobPosting.id,
        title: jobPosting.title,
        postingDate: jobPosting.postingDate,
        location: jobPosting.location.name
        })));
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving JobPostings"
        });
    })
 };

exports.findJobPostingById = (req,res) => {
    const id = req.params.id;
    JobPosting.findOne({
        where : {id : id},
        include : [JobSeeker, { model: Location, as: 'location' }]
    }).then(data => {
        const applicants = data.JobSeekers.map(jobSeeker => jobSeeker.name);
        console.log(data)
        res.send(
            {
                title: data.title,
                description: data.description,
               location: data.location.name,
                postingDate: data.postingDate,
                applicants,
            }
        );
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job Posting with id=" + id
      });
    });
};

