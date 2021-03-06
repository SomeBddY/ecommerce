import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import ProductCard from "../../components/cards/ProductCard";
import CategoryList from "../../components/category/CategoryList";

const CategoryHome = ({ match }) => {
  const [category, setCategoy] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategoy(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center text-danger p-3 mt-5 mb-5d display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center   p-3 mt-5 mb-5d display-4 jumbotron">
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4">
            <ProductCard product={product}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
