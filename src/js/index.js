const { Fragment, useState, useEffect } = React;
const { createRoot } = ReactDOM;

function App() {
  return (
    <Fragment>
      <Main />
      <Footer />
    </Fragment>
  );
}

function Main() {
   const jobs = useJobs();
   
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
        Your Name Here
      </a>
      .
    </footer>
  );
}

function useJobs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((json) => {
         setData(json);
      });
  }, []);

  return data;
}

createRoot(document.querySelector("#root")).render(<App />);
