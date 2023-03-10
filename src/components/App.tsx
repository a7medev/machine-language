import Header from './Header';
import Footer from './Footer';
import Machine from './Machine';

function App() {
  return (
    <div className="lg:h-screen lg:grid lg:grid-rows-layout">
      <Header />
      <Machine />
      <Footer />
    </div>
  );
}

export default App;
