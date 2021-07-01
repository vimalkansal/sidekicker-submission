const db = require("../models");
const JobPosting = db.JobPosting;
const JobSeeker = db.JobSeeker;
const Op = db.Sequelize.Op;

exports.findAllJobPostings = (req, res) => {
    JobPosting.findAll({
        include: {
            model: db.Location,
            as: 'location'
          }
    })
    .then(data => {
        res.send(data.map(jobPosting => ({
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
        include : JobSeeker
    }).then(data => {
        const applicants = data.JobSeekers.map(jobSeeker => jobSeeker.name);
        res.send(
            {
                title: data.title,
                description: data.description,
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

exports.findAllJobSeekersForAJobPosting = (req,res) => {
    const id = req.params.id;
    JobPosting.findOne({
       where : {id : id},
       include : JobSeeker
    })
    .then(data => {
      res.send(
          data.JobSeekers.map(jobSeeker => jobSeeker.name)
      );
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job applicants for Job Posting with id=" + id
      });
    });
};