import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {fetchJobPostingList} from '../api/jobPostings'; 

const JobPostingList = () => {
const [jobPostingList, setJobPostingList] = useState([]);
const history = useHistory();

useEffect(()=>{
    fetchJobPostingList().then(result => {
        setJobPostingList(result);
    });
},[]);
return (
        <div className="ui segment">
            <h1 className="ui header">JobPosting List</h1>
            <table className="ui celled padded table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Posting Date</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {jobPostingList.map((jobPosting) => 
                        (   
                            <tr key={jobPosting.id}>
                                <td data-label="Title">{jobPosting.title}</td>
                                <td data-label="Location">{jobPosting.location}</td>
                                <td data-label="Posting Date">{jobPosting.postingDate}</td>
                                <td data-label="Details">
                                    <button className="ui primary button" onClick={e => history.push(`/jobposting/${jobPosting.id}`) } >
                                        View
                                    </button>
                                    
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default JobPostingList;