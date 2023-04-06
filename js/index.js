const $ = (query) => document.querySelector(query);

function handleActions(action, state) {
  switch (action.type) {
    case "selected_category": {
      const { category } = action;

      let selectedCategories;
      if (state.selectedCategories.includes(category)) {
        selectedCategories = state.selectedCategories;
      } else {
        selectedCategories = [category, ...state.selectedCategories];
      }

      return { ...state, selectedCategories };
    }
    case "removed_category": {
      return {
        ...state,
        selectedCategories: state.selectedCategories.filter(
          (c) => c !== action.category
        ),
      };
    }
    case "cleared_categories": {
      return { ...state, selectedCategories: [] };
    }
    default: {
      throw new Error("Unknown action type");
    }
  }
}

function filterJobs(jobs, categories) {
  const newJobs = jobs.filter((job) =>
    categories.every((c) => getItems(job).includes(c))
  );
  return newJobs;
}

function getItems(job) {
  const items = [job.role, job.level, ...job.languages, ...job.tools];
  return items;
}

function elt(type, attrs, ...children) {
  const dom = document.createElement(type);
  if (attrs) Object.assign(dom, attrs);

  for (let child of children) {
    if (typeof child === "string") {
      dom.appendChild(document.createTextNode(child));
    } else {
      dom.appendChild(child);
    }
  }

  return dom;
}

function renderRemoveList(items, dispatch) {
  return elt(
    "ul",
    { className: "special-list remove" },
    ...items.map((item) =>
      elt(
        "li",
        {},
        elt("div", { className: "special-list-item" }, item),
        elt(
          "button",
          {
            className: "remove-btn",
            onclick: () => {
              dispatch({ type: "removed_category", category: item });
            },
          },
          elt("img", { src: "./images/icon-remove.svg" })
        )
      )
    )
  );
}

function renderSelectList(items, dispatch) {
  return elt(
    "ul",
    { className: "special-list" },
    ...items.map((item) =>
      elt(
        "li",
        null,
        elt(
          "button",
          {
            className: "special-list-item",
            onclick: () => {
              dispatch({ type: "selected_category", category: item });
            },
          },
          item
        )
      )
    )
  );
}

function renderDottedList(items) {
  return elt(
    "ul",
    { className: "dotted-list" },
    ...items.map((item) => elt("li", null, item))
  );
}

function renderFilter(categories, dispatch) {
  return elt(
    "div",
    { id: "filter", className: "container" },
    renderRemoveList(categories, dispatch),
    elt(
      "button",
      {
        className: "clear-btn",
        onclick: () => {
          dispatch({ type: "cleared_categories" });
        },
      },
      "Clear"
    )
  );
}

function renderJob(job, dispatch) {
  const _new = job.new ? elt("div", { className: "new" }, "New!") : "";
  const featured = job.featured
    ? elt("div", { className: "featured" }, "Featured")
    : "";

  return elt(
    "article",
    {
      className: `job box-shadow ${job.featured ? "featured" : ""}`,
    },
    elt(
      "div",
      { className: "job-description" },
      elt("img", {
        className: "logo",
        src: job.logo,
        alt: job.company + "'s Logo",
      }),
      elt(
        "div",
        { className: "content" },
        elt(
          "div",
          { className: "head" },
          elt("h3", { className: "cyan-text company-name" }, job.company),
          _new,
          featured
        ),
        elt("a", { className: "job-position", href: "#" }, job.position),
        renderDottedList([job.postedAt, job.contract, job.location]),
        elt("hr")
      )
    ),
    renderSelectList(getItems(job), dispatch)
  );
}

class JobListingApp {
  constructor(state, dispatch) {
    this.dispatch = dispatch;

    this.filterDOM = elt("div");
    this.jobsDOM = elt("div", { className: "container" });
    this.dom = elt(
      "div",
      null,
      this.filterDOM,
      elt(
        "section",
        { id: "jobs" },
        elt("h2", { className: "sr-only" }, "List of Jobs"),
        this.jobsDOM
      )
    );

    this.syncState(state);
  }

  syncState(state) {
    if (state === this.state) return;
    this.state = state;

    const visibleJobs = filterJobs(state.jobs, state.selectedCategories);

    this.jobsDOM.textContent = "";
    for (let job of visibleJobs) {
      this.jobsDOM.appendChild(renderJob(job, this.dispatch));
    }

    this.filterDOM.textContent = "";
    if (state.selectedCategories.length !== 0) {
      this.filterDOM.appendChild(
        renderFilter(state.selectedCategories, this.dispatch)
      );
    }
  }
}

function run(state) {
  function dispatch(action) {
    state = handleActions(action, state);
    app.syncState(state);
  }
  const app = new JobListingApp(state, dispatch);
  $("main").appendChild(app.dom);
}

fetch("./data.json")
  .then((response) => response.json())
  .then((json) =>
    run({
      selectedCategories: [],
      jobs: json,
    })
  )
  .catch(() =>
    alert(
      "Error: Something went wrong. Please reload the page or try again later."
    )
  );
