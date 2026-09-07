import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {
  // Data array demonstrating JSX rendering & lists
  const topics = [
    {
      id: 1,
      topic: "What is React?",
      description: "A JavaScript library for building user interfaces maintained by Meta.",
      isCompleted: true,
    },
    {
      id: 2,
      topic: "JSX & Components",
      description: "JSX allows writing HTML-like code inside JavaScript to build UI components.",
      isCompleted: true,
    },
    {
      id: 3,
      topic: "Component Reusability",
      description: "Passing dynamic data using 'props' to render custom elements efficiently.",
      isCompleted: true,
    },
  ];

  return (
    <div>
      {/* Reusable Header Component with Props */}
      <Header title="Welcome to React Day 1" />

      <main className="container">
        <h2>Key Concepts Covered:</h2>

        {/* Reusing the Card component by mapping over an array */}
        <div className="card-grid">
          {topics.map((item) => (
            <Card
              key={item.id}
              topic={item.topic}
              description={item.description}
              isCompleted={item.isCompleted}
            />
          ))}
        </div>
      </main>

      {/* Reusable Footer Component */}
      <Footer />
    </div>
  );
}

export default App;