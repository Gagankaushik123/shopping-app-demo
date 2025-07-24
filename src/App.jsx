import React, { useEffect, useState } from 'react';
import { HiOutlineShoppingCart } from "react-icons/hi";
import ProductModal from './ProductModal';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortLtH, setSortLtH] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data =>{ console.log("Fetched products:", data);
        setProducts(data)});
    }, []);


  const sortedProducts = [...products].sort((a, b) =>
    sortLtH ? a.price - b.price : b.price - a.price
  );

console.log("Sorted products:", sortedProducts);

  const filteredData = sortedProducts.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Filtered products (search:", search, "):", filteredData);

  const openModal = (product) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  return (
    <>
      <header className="navbar">
        <span className="logo">Online Shopping</span>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="search-right">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="cart">
          <HiOutlineShoppingCart size={28} />
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="sort-buttons">
          <button className={sortLtH ? "active" : ""} onClick={() => setSortLtH(true)}>
            Price: Low to High
          </button>
          <button className={!sortLtH ? "active" : ""} onClick={() => setSortLtH(false)}>
            Price: High to Low
          </button>
        </div>
      </div>

      <div className="product-grid">
        {filteredData.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <div className="product-info">
              <h2>{p.title}</h2>
              <p>${p.price}</p>
            </div>
            <div className="addcart">
              <button onClick={() => openModal(p)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default App;
