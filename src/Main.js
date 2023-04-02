import { RemoveList } from "./lists.js";
import { JobList, useJobs, filterJobs } from "./job.js";
const {useState} = React;

export default function Main() {
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
