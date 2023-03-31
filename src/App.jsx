import Banner from "./components/Banner";
import Form from "./components/Form";
import styles from "./App.module.css";
function App() {
  return (
    <div className={styles.App}>
      <Banner />
      <Form />
    </div>
  );
}

export default App;
