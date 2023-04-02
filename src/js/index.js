const { Fragment, useState, useEffect } = React;
const { createRoot } = ReactDOM;

function useJobs() {
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

function App() {
  return (
    <Fragment>
      <Main />
      <Footer />
    </Fragment>
  );
}

function filterJobs(jobs, categories) {
  const newJobs = jobs.filter((job) =>
    categories.every((c) => getItems(job).includes(c))
  );
  return newJobs;
}

function Main() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const jobs = useJobs();
  const visibleJobs = filterJobs(jobs, selectedCategories);

  function addCategory(category) {
    if (!selectedCategories.some((c) => c === category)) {
      setSelectedCategories([category, ...selectedCategories]);
    }
  }

  function removeCategory(category) {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  }

  return (
    <main>
      {selectedCategories.length > 0 && (
        <Filter
          categories={selectedCategories}
          onRemove={removeCategory}
          onClear={() => {
            setSelectedCategories([]);
          }}
        />
      )}
      <JobList jobs={visibleJobs} onSelect={addCategory} />
    </main>
  );
}

function Filter({ categories, onRemove, onClear }) {
  return (
    <div className="box-shadow container" id="filter">
      <RemoveList items={categories} onRemove={onRemove} />
      <button className="clear-btn" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}

function JobList({ jobs, onSelect }) {
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

function Job({ job, onSelect }) {
  return (
    <article
      className={`job-container box-shadow ${job.featured ? "featured" : ""}`}
    >
      <div className="job-description">
        <img src={job.logo} alt={job.company + "'s Logo"} className="logo" />
        <div className="content">
          <div className="head">
            <h3 className="cyan-text company-name">{job.company}</h3>
            {job.new && <div className="new">New!</div>}
            {job.featured && <div className="featured">Featured</div>}
          </div>
          <a className="job-position" href="#">{job.position}</a>
          <DottedList items={[job.postedAt, job.contract, job.location]} />
          <hr />
        </div>
      </div>
      <SelectList items={getItems(job)} onSelect={onSelect} />
    </article>
  );
}

function getItems(job) {
  const items = [job.role, job.level, ...job.languages, ...job.tools];
  return items;
}

function SelectList({ items, onSelect }) {
  return (
    <ul className="special-list">
      {items.map((item) => (
        <li key={item}>
          <button
            className="special-list-item"
            onClick={() => {
              onSelect(item);
            }}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

function RemoveList({ items, onRemove }) {
  return (
    <ul className="special-list remove">
      {items.map((item) => (
        <li key={item}>
          <div className="special-list-item">{item}</div>
          <button
            onClick={() => {
              onRemove(item);
            }}
            className="remove-btn"
          >
            <img src="./images/icon-remove.svg" />
          </button>
        </li>
      ))}
    </ul>
  );
}

function DottedList({ items }) {
  return (
    <ul className="dotted-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Footer() {
  return (
    <footer>
      Challenge by{" "}
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
        Frontend Mentor
      </a>
      . Coded by{" "}
      <a href="https://github.com/rafaeldevvv" target="_blank">
        Rafael Maia
      </a>
      .
    </footer>
  );
}

createRoot(document.querySelector("#root")).render(<App />);
