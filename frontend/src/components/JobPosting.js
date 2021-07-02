import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {fetchJobPostingById} from '../api/jobPostings'; 

const JobPosting = () => {
    const [jobPosting, setJobPosting] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const history = useHistory();
    let { id } = useParams();
    console.log("Job Posting Id: ", id);
    useEffect(()=>{
        setIsLoading(true);
        console.log(jobPosting);
        fetchJobPostingById(id).then(result => {
            console.log(result);
            setJobPosting(result);
            setIsLoading(false);
        })
    },[]);
    if (isLoading) {
        return (
            <div>Loading....</div>
        )
    } else {
        return (
                <div className="ui segment">
                    <h1 className="ui header">{jobPosting.title}</h1>
                    <div class="ui segment">
                        <h3 class="ui header">Description</h3>
                        <div>
                            {jobPosting.description}
                        </div>

                        <h3 class="ui header">Location</h3>
                        <div>
                            {jobPosting.location}
                        </div>

                        <h3 class="ui header">Date Posted</h3>
                        <div>
                            {jobPosting.postingDate}
                        </div>
                    </div>
                    <div class="ui segment">
                        <h3 class="ui header">Applicants</h3>

                        <ul>
                            {jobPosting.applicants.map((applicant, index) => {
                                return <li key={index}>{applicant.charAt(0).toUpperCase() + applicant.slice(1)}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <button className="ui primary button" onClick={e => history.push('/jobpostinglist')}>
                            <i class="angle left icon" /> Back
                        </button>
                    </div>
                </div>
        )
    }
}

export default JobPosting;