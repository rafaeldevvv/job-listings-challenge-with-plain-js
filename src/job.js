import { DottedList, SelectList } from "./lists.js";
import {getItems} from './helpers.js';
const { useState, useEffect } = React;

export function useJobs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((reason) => {
        setData([]);
        alert("Error: " + reason);
      });
  }, []);

  return data;
}

export function JobList({ jobs, onSelect }) {
  return (
    <section id="jobs">
      <div className="container">
        {jobs.map((job) => (
          <Job job={job} key={job.id} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

export function Job({ job, onSelect }) {
  return (
    <article
      className={`job box-shadow ${job.featured ? "featured" : ""}`}
    >
      <div className="job-description">
        <img src={job.logo} alt={job.company + "'s Logo"} className="logo" />
        <div className="content">
          <div className="head">
            <h3 className="cyan-text company-name">{job.company}</h3>
            {job.new && <div className="new">New!</div>}
            {job.featured && <div className="featured">Featured</div>}
          </div>
          <a className="job-position" href="#">
            {job.position}
          </a>
          <DottedList items={[job.postedAt, job.contract, job.location]} />
          <hr />
        </div>
      </div>
      <SelectList items={getItems(job)} onSelect={onSelect} />
    </article>
  );
}
