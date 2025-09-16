import './Main.css';
import Calendar from '../Calendar';
import PostBoard from '../PostBoard';
import PostSummary from '../components/PostSummary';

function Main() {
    return (
  <main className="main-grid">
    <section className="top-left">
      <PostBoard />
    </section>
    <aside className="top-right">
      <Calendar />
    </aside>
    <section className="bottom-left">
      <PostSummary />
    </section>
  </main>
);

};

export default Main;