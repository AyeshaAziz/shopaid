import React, { useState } from "react";
import "./ProductList.css";
import { useFetch } from "../hooks/useFetch";
import Loading from "../assets/Loading.gif";

const PRODUCTS_URL = "http://localhost:8000/products";
const AVAILABLE_PRODS_URL = "http://localhost:8000/products?in_stock=true";
const ERROR_MESSAGE = "Products not Found";
const ALL_LABEL = 'All';
const IN_STOCK_LABEL = 'In Stock';
const UNAVAILABLE_LABEL = 'Unavailable';

export const ProductsList = () => {
  const [url, setUrl] = useState(PRODUCTS_URL);
  const { data: products, loading, error } = useFetch(url);

  return (
    <section>
      <div className="filter">
        <button onClick={() => setUrl(PRODUCTS_URL)}>{ALL_LABEL}</button>
        <button onClick={() => setUrl(AVAILABLE_PRODS_URL)}>{IN_STOCK_LABEL}</button>
      </div>
      {loading && (
        <div>
          <p className="loading"><img src={Loading} alt="loading"/></p>
        </div>
      )}
      {error && (
        <div>
          <p className="loading">{ERROR_MESSAGE}</p>
        </div>
      )}
      {products &&
        products.map((product) => (
          <div className="card" key={product.id}>
            <p className="id">{product.id}</p>
            <p className="name">{product.name}</p>
            <p className="info">
              <span>£{product.price}</span>
              <span className={product.in_stock ? "instock" : "unavailable"}>
                {product.in_stock ? IN_STOCK_LABEL : UNAVAILABLE_LABEL}
              </span>
            </p>
          </div>
        ))}
    </section>
  );
};
