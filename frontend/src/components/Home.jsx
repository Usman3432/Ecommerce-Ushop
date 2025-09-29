import React, { useEffect } from "react";
import MetaData from "./layouts/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layouts/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const { data, isLoading, error, isError } = useGetProductsQuery();

  useEffect(() =>{
    if(isError) {
     toast.error(error?.data?.message); 
    }
  }, [isError])

  if(isLoading) return <Loader />

  return (
    <>
      <MetaData title={'Get you best online'} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.product?.length > 0 ? (
                data.product.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
