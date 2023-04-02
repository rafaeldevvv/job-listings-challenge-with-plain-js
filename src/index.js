import Footer from "./Footer.js";
import Main from "./Main.js";
const { Fragment } = React;
const { createRoot } = ReactDOM;

function App() {
  return (
    <Fragment>
      <Main />
      <Footer />
    </Fragment>
  );
}

createRoot(document.querySelector("#root")).render(<App />);
