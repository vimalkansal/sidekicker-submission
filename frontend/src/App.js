import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import JobPostingList from './components/JobPostingList';
import JobPosting from './components/JobPosting';

const App = () => {
  return (
      <div className="ui container" style={{marginTop: '10px'}}>
          <BrowserRouter>
              <Route path="/jobpostinglist" exact component={JobPostingList}/>
              <Route path="/jobposting/:id" exact component={JobPosting}/>
          </BrowserRouter>
      </div>
  )
}

export default App;
