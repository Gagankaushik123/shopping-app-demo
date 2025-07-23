import React, {  useEffect, useState } from 'react'
import { HiOutlineShoppingCart } from "react-icons/hi";

function MyModal({ product, quantity, setQuantity, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{product.title}</h2>
        <p>Price: ${product.price}</p>
        {/* <div className="quantity">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>–</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div> */}
        <button className="close" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

function App() {

  const[products,setProducts]=useState([])
  const[search,setSearch]=useState("")
  const [sortLtH, setSortLtH] = useState(true);
   const [showModal, setShowModal] = useState(false)
     const [modalProduct, setModalProduct] = useState(null)
    //  const [quantity, setQuantity] = useState(1)



useEffect(() => {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      console.log("Fetched Data:", data);
      setProducts(data);
    });
}, []);

const sortedProducts = [...products].sort((a, b) => {
  return sortLtH ? a.price - b.price : b.price - a.price;
});
console.log("Sorted Products:", sortedProducts);


const filData = sortedProducts.filter(product =>
  product.title.toLowerCase().includes(search.toLowerCase())
);
console.log("Filtered Products:", filData);




 const openModal = p => {
    setModalProduct(p)
    // setQuantity(1)
    setShowModal(true)
  }
  const closeModal = () => setShowModal(false)

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
             <span className="cart-badge"></span>
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
    <button
      className={sortLtH ? "active" : ""}
      onClick={() => setSortLtH(true)}
    >
      Price: Low to High
    </button>
    <button
      className={!sortLtH ? "active" : ""}
      onClick={() => setSortLtH(false)}
    >
      Price: High to Low
    </button>
  </div>
</div>

<div className="product-grid">
  {filData.map(p => (
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
        <MyModal
          product={modalProduct}
          // quantity={quantity}
          // setQuantity={setQuantity}
          onClose={closeModal}
        />
      )}

   </>
  );
}

export default App
