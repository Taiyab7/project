import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=32"
        );
        if (!response.ok) {
          throw new Error("Failed to load products")
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <h2 className="message">Loading products....</h2>
  }
  if (error) {
    return <h2 className="message error">{error}</h2>
  }

  return (
    <main className="container">
      <h1>Product Explorer</h1>
      <p className="subtitle">
        Explore products and find what you need
      </p>

      <input
        className="search-input"
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(event) =>
          setSearchTerm(event.target.value)
        }
      />
      {filteredProducts.length === 0 ?
        (<p className="message">No matching products found.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="product-info">
                  <h2>{product.title}</h2>
                  <p className="category">
                    {product.category}
                  </p>
                  <p className="price">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

            ))}
          </div>
        )}
    </main>
  );
}

export default App;