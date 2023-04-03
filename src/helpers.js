export function filterJobs(jobs, categories) {
  const newJobs = jobs.filter((job) =>
    categories.every((c) => getItems(job).includes(c))
  );
  return newJobs;
}

export function getItems(job) {
  const items = [job.role, job.level, ...job.languages, ...job.tools];
  return items;
}
