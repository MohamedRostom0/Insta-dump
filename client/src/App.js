import Navbar from './components/Navbar';
import { PostCard } from './components/PostCard';


function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <PostCard />
      </div>
    </>
  );
}

export default App;
