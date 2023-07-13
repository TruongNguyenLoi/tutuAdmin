import { Button, makeStyles, LinearProgress } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import {
  addProduct,
  getOneItem,
  updateProduct,
} from "services/ProductServices";
// import { uploadImage } from 'services/UploadFileService';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import "./style.css";
import InputField from "components/input/InputField";
import SelectField from "components/input/SelectField";
import { getAllCategory } from "services/CategoryServices";
import ImageUploading from "react-images-uploading";
import { useHistory } from "react-router";
import { storage } from "utils/firebase";
// import { getAll as getAllColor } from 'services/ColorServices';

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  button: {
    padding: "12px 24px",
    fontWeight: 600,
    fontSize: "1.3rem",
    marginRight: 15,
    marginBottom: 30,
  },
}));

function ProductActions(props) {
  const classes = useStyles();
  const history = useHistory();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    categories: [],
    subcategories: [],
    brands: [],
    suppliers: [],
  });

  // const [colors, setColors] = useState([]);

  const maxNumber = 69;
  // const [imagesUpload, setImagesUpload] = useState([]);

  const [urlMainImage, setUrlMainImage] = useState("");
  const [urlsListImage, setUrlsListImage] = useState([]);
  const [progressMainUpload, setProgressMainUpload] = useState(0);
  const [progressListUpload, setProgressListUpload] = useState(0);

  const [product, setProduct] = useState({
    id: null,
    type: null,
    name: "",
    sku: "",
    model: "",
    price: 0,
    list_price: 0,
    description: "",
    category: "",
    subcategory: "",
    brand: "",
    supplier: "",
    sizeWeight: null,
    material: null,

    // main & child image
    mainImage: "",
    images: [],

    // thông tin vận chuyển
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  });

  const onChangeUploadMainImage = (imageList, addUpdateIndex) => {
    const image = imageList[0].file;
    const now = new Date().getTime();
    const uploadTask = storage
      .ref(`images/product/${now + "_" + image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressMainUpload(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images/product")
          .child(now + "_" + image.name)
          .getDownloadURL()
          .then((url) => {
            setUrlMainImage(url);
            toast.success("Upload hình ảnh thành công!");
          });
      }
    );
  };

  const onChangeUploadImage = (imageList, addUpdateIndex) => {
    const imageFiles = imageList.map((item) => item.file);

    const promises = [];
    const now = new Date().getTime();
    imageFiles.map((image) => {
      const uploadTask = storage
        .ref(`images/product/${now + "_" + image.name}`)
        .put(image);
      promises.push(uploadTask);
      return uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressListUpload(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images/product")
            .child(now + "_" + image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrlsListImage((prevState) => [...prevState, urls]);
            });
        }
      );
    });
    Promise.all(promises)
      .then(() => toast.success("Upload hình ảnh thành công!"))
      .catch(() => toast.warning("Upload hình ảnh không thành công!"));
  };

  const handleRemoveImage = (image) => {
    const newArray = urlsListImage.filter((item) => item !== image);
    // setImagesUpload(newArray);
    var desertRef = storage.refFromURL(`${image}`);
    desertRef
      .delete()
      .then(function () {
        toast.success("Xoá hình ảnh thành công!");
        setUrlsListImage(newArray);
      })
      .catch(function (error) {
        toast.error("Xoá hình ảnh không thành công!");
      });
  };

  const handleRemoveMainImage = () => {
    var desertRef = storage.refFromURL(urlMainImage);
    desertRef
      .delete()
      .then(function () {
        toast.success("Xoá hình ảnh thành công!");
        setUrlMainImage("");
        setProgressMainUpload(0);
      })
      .catch(function (error) {
        toast.error("Xoá hình ảnh không thành công!");
      });
  };

  const handleRemoveAllImage = () => {
    const promises = [];
    urlsListImage.map((url) =>
      promises.push(storage.refFromURL(`${url}`).delete())
    );
    Promise.all(promises)
      .then(() => {
        progressListUpload(0);
        setUrlsListImage([]);
        toast.success("Xoá hình ảnh thành công!");
      })
      .catch(() => toast.warning("Xoá hình ảnh không thành công!"));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({
      ...product,
      type: product.category === "sach" ? 1 : 2,
      [e.target.name]: value,
    });
  };

  const handleChangeEditor = (newValue, editor) => {
    setProduct({
      ...product,
      description: editor.getContent({ format: "HTML" }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newData = { ...product };
    const mainImage = urlMainImage;
    const images = urlsListImage;
    newData.type = 1;

    if (newData.id) {
      newData.images = images;
      newData.mainImage = mainImage;
      updateProduct(newData)
        .then(() => {
          toast.success("Cập nhật sản phẩm thành công");
          history.push("/admin/products/list");
        })
        .catch(() => {
          toast.error("Cập nhật sản phẩm không thành công");
        });
    } else {
      newData.images = images;
      newData.mainImage = mainImage;
      addProduct(newData)
        .then(() => {
          toast.success("Thêm sản phẩm thành công");
          history.push("/admin/products/list");
        })
        .catch(() => {
          toast.error("Thêm sản phẩm không thành công");
        });
    }
  };

  let title = props.match.params.id
    ? `Cập nhật thông tin sản phẩm có id: ${props.match.params.id}`
    : "Thêm mới sản phẩm";

  const fetchData = useCallback(() => {
    let searchObj = {};
    searchObj.limit = 1000;
    searchObj.page = 0;
    searchObj.display = 1;
    getAllCategory(searchObj).then((res) => {
      setData({
        ...data,
        categories: res.data.content,
      });
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataOther = useCallback(() => {
    const config = { headers: headers };
    if (product.category !== "") {
      const getAllSubcategory = axios.get(
        `${API_URL}/api/subcategory/category?category=${product.category}`
      );
      const getAllBrand = axios.get(`${API_URL}/api/brand/all`, config);
      const getAllSupplier = axios.get(
        `${API_URL}/api/supplier/all?page=${0}&limit=${1000}`,
        config
      );
      axios.all([getAllSubcategory, getAllBrand, getAllSupplier]).then(
        axios.spread((...allData) => {
          const allSubcategory = allData[0].data;
          const allBrand = allData[1].data.content;
          const allSupplier = allData[2].data.content;
          setData({
            ...data,
            subcategories: allSubcategory,
            brands: allBrand,
            suppliers: allSupplier,
          });
        })
      );
    } else {
      setData({
        ...data,
        subcategories: [],
        brands: [],
        suppliers: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.category]);

  useEffect(() => {
    const search = {
      page: 0,
      limit: 1000,
    };
    // getAllColor(search)
    //     .then(res => {
    //         setColors(res.data.content);
    //     })
  }, []);

  useEffect(() => {
    fetchData();
    fetchDataOther();
    const id = props.match.params.id;
    if (id) {
      getOneItem(id).then((res) => {
        setProduct(res.data);
        setUrlsListImage([...urlsListImage, ...res.data.images]);
        setUrlMainImage(res.data.mainImage);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, fetchDataOther, props.match.params.id]);

  return (
    <>
      {" "}
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <div>
          <h2 className="page-header">{title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="glOjBk list-cusomer-order">
                    <h2 className="heading">Thông tin cơ bản</h2>
                  </div>
                  <div className="card__body">
                    <div className="row">
                      <div className="col-12">
                        <InputField
                          type="text"
                          label="Tên sản phẩm"
                          name="name"
                          value={product && product?.name}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                      <div className="col-6">
                        <InputField
                          type="text"
                          label="Mã sản phẩm"
                          name="sku"
                          value={product.sku ? product.sku : ""}
                          onChange={handleChange}
                          required={false}
                        />
                      </div>
                      <div className="col-6">
                        <SelectField
                          label="Danh mục"
                          value={product.category || ""}
                          name="category"
                          onChange={handleChange}
                          data={data?.categories}
                          required={true}
                        />
                      </div>
                      <div className="col-6">
                        <SelectField
                          label="Danh mục con"
                          value={product.subcategory || ""}
                          name="subcategory"
                          onChange={handleChange}
                          data={data?.subcategories}
                          required={true}
                        />
                      </div>
                      <div className="col-6">
                        <SelectField
                          label="Thương hiệu"
                          value={product.brand || ""}
                          name="brand"
                          onChange={handleChange}
                          data={data?.brands}
                          required={true}
                        />
                      </div>
                      <div className="col-6">
                        <InputField
                          type="number"
                          label="Giá niêm yết"
                          name="list_price"
                          value={product.list_price || ""}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                      <div className="col-6">
                        <InputField
                          type="number"
                          label="Giá bán"
                          name="price"
                          value={product.price || ""}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>

                      <div className="col-12 tiny-editor-margin">
                        <Editor
                          initialValue="<p></p>"
                          apiKey="vazqmmifl5cbvcga3ziko90ekv08tcmitaii5xj4ep17jtpf"
                          value={product?.description}
                          init={{
                            selector: "textarea#default-editor",
                            height: 400,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | " +
                              "bold italic backcolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "link | image |" +
                              "removeformat | help",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                          onEditorChange={handleChangeEditor}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="glOjBk list-cusomer-order">
                    <h2 className="heading">Thông tin vận chuyển</h2>
                  </div>
                  <div className="card__body">
                    <div className="row">
                      <div className="col-12">
                        <SelectField
                          label="Nhà cung cấp"
                          value={product.supplier || ""}
                          name="supplier"
                          onChange={handleChange}
                          data={data?.suppliers}
                          required={true}
                        />
                      </div>
                      <div className="col-12">
                        <InputField
                          type="number"
                          label="Cân nặng sau khi đóng gói (gram)"
                          name="weight"
                          value={product.weight || ""}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                      <div className="col-4">
                        <InputField
                          type="number"
                          label="Chiều dài (sau khi đóng gói)"
                          name="length"
                          value={product.length || ""}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                      <div className="col-4">
                        <InputField
                          type="number"
                          label="Chiều rộng (sau khi đóng gói)"
                          name="width"
                          value={product.width || ""}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                      <div className="col-4">
                        <InputField
                          type="number"
                          label="Chiều cao (sau khi đóng gói)"
                          name="height"
                          value={product.height || ""}
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="glOjBk list-cusomer-order">
                    <h2 className="heading">Hình ảnh sản phẩm</h2>
                  </div>
                  <div className="card__body">
                    <div className="row">
                      <div className="col-12 tiny-editor-margin">
                        <ImageUploading
                          value={product.mainImage}
                          onChange={onChangeUploadMainImage}
                          maxNumber={1}
                          dataURLKey="data_url"
                        >
                          {({ onImageUpload, dragProps }) => (
                            <div className="upload__image-wrapper">
                              <Button
                                className={classes.button}
                                variant="outlined"
                                color="primary"
                                component="span"
                                onClick={onImageUpload}
                                {...dragProps}
                              >
                                Thêm ảnh chính
                              </Button>
                              {progressMainUpload > 0 ? (
                                <progress
                                  className="progress-bar"
                                  value={progressMainUpload}
                                  max="100"
                                />
                              ) : (
                                ""
                              )}
                              <div className="image-wrapper">
                                <div className="image-wrapper-item">
                                  {urlMainImage !== "" ? (
                                    <img src={urlMainImage} alt="" />
                                  ) : (
                                    ""
                                  )}
                                  <div className="overlay"></div>
                                  <div className="image-item__btn-wrapper">
                                    <button onClick={handleRemoveMainImage}>
                                      <i className="bx bx-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </ImageUploading>
                      </div>
                      <div className="col-12 tiny-editor-margin">
                        <ImageUploading
                          multiple
                          value={product.images}
                          onChange={onChangeUploadImage}
                          maxNumber={maxNumber}
                          dataURLKey="data_url"
                        >
                          {({ onImageUpload, dragProps }) => (
                            <div className="upload__image-wrapper">
                              <Button
                                className={classes.button}
                                variant="outlined"
                                color="primary"
                                component="span"
                                onClick={onImageUpload}
                                {...dragProps}
                              >
                                Thêm ảnh phụ
                              </Button>
                              {progressListUpload > 0 ? (
                                <progress
                                  className="progress-bar"
                                  value={progressListUpload}
                                  max="100"
                                />
                              ) : (
                                ""
                              )}
                              <div className="image-wrapper">
                                <button
                                  onClick={handleRemoveAllImage}
                                  className="btn-remove-all"
                                >
                                  Xoá tất cả
                                </button>
                                {urlsListImage.map((image, index) => (
                                  <div
                                    key={index}
                                    className="image-wrapper-item"
                                  >
                                    <img src={image} alt="" />
                                    <div className="overlay"></div>
                                    <div className="image-item__btn-wrapper">
                                      <button
                                        onClick={() => handleRemoveImage(image)}
                                      >
                                        <i className="bx bx-trash"></i>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </ImageUploading>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      type="submit"
                      // onClick={handleSubmit}
                      className={classes.button}
                    >
                      {product.id ? "Cập nhật" : "Lưu sản phẩm"}
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      onClick={() => history.push("/admin/products/list")}
                    >
                      Quay lại
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ProductActions;
