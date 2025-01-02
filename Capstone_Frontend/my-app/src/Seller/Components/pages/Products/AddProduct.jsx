import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { UploadToCloudinary } from "../../../../Util/uploadToCloudinary";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { colors } from "../../../../Data/Filter/color";
import { MainCategory } from "../../../../Data/Category/MainCategory";
import { menLevelTwo } from "../../../../Data/Category/leveltwo/menLevelTwo";
import { womenLevelThree } from "../../../../Data/Category/levelthree/womenLevelThree";
import { womenLevelTwo } from "../../../../Data/Category/leveltwo/womenLevelTwo";
import { furnitureLevelTwo } from "../../../../Data/Category/leveltwo/furnitureLevelTwo";
import { electronicsLevelTwo } from "../../../../Data/Category/leveltwo/electronicsLevelTwo";
import { menLevelThree } from "../../../../Data/Category/levelthree/menLevelThree";
import { furnitureLevelThree } from "../../../../Data/Category/levelthree/furnitureLevelThree";
import { electronicsLevelThree } from "../../../../Data/Category/levelthree/electronicsLevelThree";

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const AddProduct = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadImage(true);
    const image = await UploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  useEffect(() => {
    if (!formik.values.category2) {
      formik.setFieldValue("category3", "");
    }
  }, [formik.values.category2]);

  const getCategory3Options = () => {
    const category2Selected = formik.values.category2;
    if (!category2Selected) return [];

    return categoryThree[formik.values.category]?.filter(
      (item) => item.parentCategoryId === category2Selected
    );
  };

  const handleSubmit = async (values) => {
    const sellerToken = localStorage.getItem("sellerToken");

    if (!sellerToken) {
      alert("You must be logged in as a seller");
      return;
    }

    const productData = {
      title: values.title,
      description: values.description,
      mrpPrice: parseFloat(values.mrpPrice),
      sellingPrice: parseFloat(values.sellingPrice),
      discountPercent: Math.round(
        ((values.mrpPrice - values.sellingPrice) / values.mrpPrice) * 100
      ),
      quantity: parseInt(values.quantity, 10),
      color: values.color,
      images: values.images,
      numRatings: 0,
      category: values.category,
      category2: values.category2,
      category3: values.category3,
      sizes: values.sizes,
    };

    try {
      const response = await fetch("http://localhost:8080/seller/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sellerToken}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product added successfully!");
        formik.resetForm();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to add product"}`);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Error submitting product, please try again.");
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* Background container with padding and height */}
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-lg">
        <Grid container spacing={2}>
          <Grid item xs={12} className="flex flex-wrap gap-5">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternate className="text-gray-700" />
              </span>

              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div className="relative" key={index}>
                  <img
                    className="w-24 h-24 object-cover"
                    src={image}
                    alt={`ProductImage ${index + 1}`}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              required
            />
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <TextField
              fullWidth
              id="mrp_price"
              name="mrpPrice"
              label="MRP Price"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
              required
            />
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              required
            />
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {colors.map((color, index) => (
                  <MenuItem value={color.name} key={index}>
                    <div className="flex gap-3">
                      <span
                        style={{ backgroundColor: color.hex }}
                        className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}
                      ></span>
                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* <Grid item xs={12} md={4} lg={3}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Sizes"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="FREE">FREE</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
              {formik.touched.sizes && formik.errors.sizes && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid> */}

          <Grid item xs={12} md={4} lg={3}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {MainCategory.map((item) => (
                  <MenuItem value={item.categoryId} key={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <FormControl
              fullWidth
              error={formik.touched.category2 && Boolean(formik.errors.category2)}
              required
            >
              <InputLabel id="category2-label">Category 2</InputLabel>
              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
                label="Category 2"
              >
                {categoryTwo[formik.values.category]?.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <FormControl
              fullWidth
              error={formik.touched.category3 && Boolean(formik.errors.category3)}
              required
            >
              <InputLabel id="category3-label">Category 3</InputLabel>
              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                label="Category 3"
              >
                {getCategory3Options().map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProduct;
