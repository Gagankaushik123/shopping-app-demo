import React, { useState } from 'react';

function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const inc = () => setQuantity(q => q + 1);
  const dec = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="title">
          <h2>{product.title}</h2>
          <p>price: ${product.price}</p>
        </div>


        <div className="modal-image">
          <img src={product.image} alt={product.title}  />
        </div>

        <div className="quantity-control">
          <button onClick={dec}>-</button>
          <span>{quantity}</span>
          <button onClick={inc}>+</button>
        </div>

        <p className="total">
          Total: ${(product.price * quantity).toFixed(2)}
        </p>

        <button className="close" onClick={onClose}>Close</button>
      </div>
     </div>
  );
}

export default ProductModal;
