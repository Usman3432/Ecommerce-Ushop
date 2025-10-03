import React, { useEffect } from "react";
import MetaData from "./layouts/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layouts/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layouts/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layouts/Filters";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const category = searchParams.get("category");

  const params = { page, keyword };

  if (min) params.min = min;
  if (max) params.max = max;
  if (category) params.category = category;

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Get you best online"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div
          className={keyword ? "col-6 col-md-9" : "col-12 col-sm-6 col-md-12"}
        >
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.product?.length} Products found with keyword:${keyword}`
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.product?.length > 0 ? (
                data.product.map((product) => (
                  <ProductItem
                    key={product._id}
                    product={product}
                    columnSize={columnSize}
                  />
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </section>
          <CustomPagination
            resPerPage={data?.resPerPage}
            filterProdCount={data?.filterProdCount}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
