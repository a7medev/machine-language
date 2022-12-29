import Header from './Header';
import Footer from './Footer';
import Machine from './Machine';

function App() {
  return (
    <div className="h-screen grid grid-rows-layout dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <Machine />
      <Footer />
    </div>
  );
}

export default App;
