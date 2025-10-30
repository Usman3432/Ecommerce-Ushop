import React, { useEffect, useRef, useState } from "react";
import MetaData from "../layouts/MetaData";
import AdminLayout from "../layouts/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";
import toast from "react-hot-toast";

const UploadImages = () => {
  const imgInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setimagesPreview] = useState([]);
  const [uploadedImages, setuploadedImages] = useState([]);

  const [uploadProductImages, { isLoading, error, isSuccess }] =
    useUploadProductImagesMutation();
  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImageMutation();

  const { data } = useGetProductDetailsQuery(params?.id);
  useEffect(() => {
    if (data?.product) {
      setuploadedImages(data?.product?.images);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      setimagesPreview([]);
      toast.success("Images uploaded successfully!");
      navigate("/admin/products");
    }
  }, [data, navigate, error, deleteError, isSuccess]);

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setimagesPreview((oldArray) => [...oldArray, reader?.result]);
          setImages((oldArray) => [...oldArray, reader?.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleResetInput = () => {
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
  };

  const handleImagePreviewDel = (image) => {
    const filteredImagePreview = imagesPreview.filter((img) => img !== image);
    setImages(filteredImagePreview);
    setimagesPreview(filteredImagePreview);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    uploadProductImages({ id: params?.id, body: { images } });
  };

  const deleteImage = (imgId) =>{
    deleteProductImage({id: params?.id, body: {imgId}})
  }
  return (
    <AdminLayout>
      <MetaData title={"Upload Product Image"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            enctype="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Upload Product Images</h2>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">
                Choose Images
              </label>

              <div className="custom-file">
                <input
                  ref={imgInputRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  multiple
                  onChange={onChange}
                  onClick={handleResetInput}
                />
              </div>
              {imagesPreview?.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images:</p>
                  <div className="row mt-4">
                    {imagesPreview?.map((img) => (
                      <div className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={img}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDel(img)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {uploadedImages?.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product Uploaded Images:</p>
                  <div className="row mt-1">
                    {uploadedImages?.map((img) => (
                      <div className="col-md-3 mt-2">
                        <div className="card">
                          <img
                            src={img?.url}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            type="button"
                            disabled={isLoading || isDeleteLoading}
                            onClick={()=> deleteImage(img?.public_id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadImages;
