"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _React = React,
  Fragment = _React.Fragment,
  useState = _React.useState,
  useEffect = _React.useEffect;
var _ReactDOM = ReactDOM,
  createRoot = _ReactDOM.createRoot;
function useJobs() {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  useEffect(function () {
    fetch("data.json").then(function (response) {
      return response.json();
    }).then(function (json) {
      setData(json);
    })["catch"](function (reason) {
      setData([]);
      alert("Error: " + reason);
    });
  }, []);
  return data;
}
function App() {
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Main, null), /*#__PURE__*/React.createElement(Footer, null));
}
function filterJobs(jobs, categories) {
  var newJobs = jobs.filter(function (job) {
    return categories.every(function (c) {
      return getItems(job).includes(c);
    });
  });
  return newJobs;
}
function Main() {
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedCategories = _useState4[0],
    setSelectedCategories = _useState4[1];
  var jobs = useJobs();
  var visibleJobs = filterJobs(jobs, selectedCategories);
  function addCategory(category) {
    if (!selectedCategories.some(function (c) {
      return c === category;
    })) {
      setSelectedCategories([category].concat(_toConsumableArray(selectedCategories)));
    }
  }
  function removeCategory(category) {
    setSelectedCategories(selectedCategories.filter(function (c) {
      return c !== category;
    }));
  }
  return /*#__PURE__*/React.createElement("main", null, selectedCategories.length > 0 && /*#__PURE__*/React.createElement(Filter, {
    categories: selectedCategories,
    onRemove: removeCategory,
    onClear: function onClear() {
      setSelectedCategories([]);
    }
  }), /*#__PURE__*/React.createElement(JobList, {
    jobs: visibleJobs,
    onSelect: addCategory
  }));
}
function Filter(_ref) {
  var categories = _ref.categories,
    onRemove = _ref.onRemove,
    onClear = _ref.onClear;
  return /*#__PURE__*/React.createElement("div", {
    className: "box-shadow container",
    id: "filter"
  }, /*#__PURE__*/React.createElement(RemoveList, {
    items: categories,
    onRemove: onRemove
  }), /*#__PURE__*/React.createElement("button", {
    className: "clear-btn",
    onClick: onClear
  }, "Clear"));
}
function JobList(_ref2) {
  var jobs = _ref2.jobs,
    onSelect = _ref2.onSelect;
  return /*#__PURE__*/React.createElement("section", {
    id: "jobs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, jobs.map(function (job) {
    return /*#__PURE__*/React.createElement(Job, {
      job: job,
      key: job.id,
      onSelect: onSelect
    });
  })));
}
function Job(_ref3) {
  var job = _ref3.job,
    onSelect = _ref3.onSelect;
  return /*#__PURE__*/React.createElement("article", {
    className: "job-container box-shadow ".concat(job.featured ? "featured" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "job-description"
  }, /*#__PURE__*/React.createElement("img", {
    src: job.logo,
    alt: job.company + "'s Logo",
    className: "logo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cyan-text company-name"
  }, job.company), job["new"] && /*#__PURE__*/React.createElement("div", {
    className: "new"
  }, "New!"), job.featured && /*#__PURE__*/React.createElement("div", {
    className: "featured"
  }, "Featured")), /*#__PURE__*/React.createElement("a", {
    className: "job-position",
    href: "#"
  }, job.position), /*#__PURE__*/React.createElement(DottedList, {
    items: [job.postedAt, job.contract, job.location]
  }), /*#__PURE__*/React.createElement("hr", null))), /*#__PURE__*/React.createElement(SelectList, {
    items: getItems(job),
    onSelect: onSelect
  }));
}
function getItems(job) {
  var items = [job.role, job.level].concat(_toConsumableArray(job.languages), _toConsumableArray(job.tools));
  return items;
}
function SelectList(_ref4) {
  var items = _ref4.items,
    onSelect = _ref4.onSelect;
  return /*#__PURE__*/React.createElement("ul", {
    className: "special-list"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item
    }, /*#__PURE__*/React.createElement("button", {
      className: "special-list-item",
      onClick: function onClick() {
        onSelect(item);
      }
    }, item));
  }));
}
function RemoveList(_ref5) {
  var items = _ref5.items,
    onRemove = _ref5.onRemove;
  return /*#__PURE__*/React.createElement("ul", {
    className: "special-list remove"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item
    }, /*#__PURE__*/React.createElement("div", {
      className: "special-list-item"
    }, item), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        onRemove(item);
      },
      className: "remove-btn"
    }, /*#__PURE__*/React.createElement("img", {
      src: "./images/icon-remove.svg"
    })));
  }));
}
function DottedList(_ref6) {
  var items = _ref6.items;
  return /*#__PURE__*/React.createElement("ul", {
    className: "dotted-list"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item
    }, item);
  }));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", null, "Challenge by", " ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.frontendmentor.io?ref=challenge",
    target: "_blank"
  }, "Frontend Mentor"), ". Coded by", " ", /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/rafaeldevvv",
    target: "_blank"
  }, "Rafael Maia"), ".");
}
createRoot(document.querySelector("#root")).render( /*#__PURE__*/React.createElement(App, null));