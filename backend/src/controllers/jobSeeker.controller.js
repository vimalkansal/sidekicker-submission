const db = require("../models");
const JobSeeker = db.JobSeeker;
const Op = db.Sequelize.Op;

// exports.findAllJobPostings = (req, res) => {
//    // res.send();
//    JobPosting.findAll()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occured while retrieving JobPostings"
//             });
//         })
// };

// exports.findAllJobPostings = (req, res) => {
//     // res.send();
//     JobPosting.findAll({
//         attributes: {
            
//             include: [
                
//                 [
//                     db.sequelize.literal(`(
//                         SELECT name
//                         FROM Locations
//                         WHERE
//                             JobPosting.id = Locations.id
                            
//                     )`),
//                     'Location'
//                 ],
               
//             ],
           
//         }
        
//     })
//          .then(data => {
//              res.send(data);
//          })
//          .catch(err => {
//              res.status(500).send({
//                  message:
//                      err.message || "Some error occured while retrieving JobPostings"
//              });
//          })
//  };

exports.findAllJobPostings = (req, res) => {
    // res.send();
    JobPosting.findAll({
        attributes: [
            'id',
                'title',
                [
                    db.sequelize.literal(`(
                        SELECT name
                        FROM Locations
                        WHERE
                            Locations.id = JobPosting.locationId
                            
                    )`),
                    'Location'
                ],
               'postingDate'
            ],
    })
         .then(data => {
             res.send(data);
         })
         .catch(err => {
             res.status(500).send({
                 message:
                     err.message || "Some error occured while retrieving JobPostings"
             });
         })
 };


// Get the list of applicants

// [
//     db.sequelize.literal(`(
//         SELECT JobSeekers.name
//         FROM JobSeekers, JobApplications
//         WHERE
//             JobApplications.JobPostingId = ${id} and JobSeekers.id = JobApplications.JobSeekerId
            
//     )`),
//     'Applicants'
// ]



exports.findJfindAllApplicantsForAJobPosting = (req,res) => {
    const id = req.params.id;
    JobPosting.findByPk(id,{
        attributes: [
            'title',
            'description',
            [
                db.sequelize.literal(`(
                    SELECT name
                    FROM Locations
                    WHERE
                        Locations.id = JobPosting.locationId
                        
                )`),
                'Location'
            ],
           'postingDate',
           
        ],
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job Posting with id=" + id
      });
    });
};