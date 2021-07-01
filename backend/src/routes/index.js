var express = require('express');
var router = express.Router();
var cors = require('cors');


const jobPostings  = require("../controllers/jobPosting.controller.js");

router.use(cors());

router.get('/', (req, res) => {
 
  res.send({ message: "ok" });
});

router.get('/jobs', jobPostings.findAllJobPostings);

router.get('/jobs/:id', jobPostings.findJobPostingById);

router.get('/jobs/:id/jobseekers', jobPostings.findAllJobSeekersForAJobPosting);




module.exports = router;
