import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

const productSchema = Yup.object().shape({
  name: Yup.string().required("Product name required"),
  price: Yup.number().required("Price is required"),
  category: Yup.string().required("Category is required"),
  stock: Yup.number().required("Stock is required"),
});

export default function CreateProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.categories || []);
      } catch {
        console.log("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white mt-8 p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-5">Create New Product</h2>

      <Formik
        initialValues={{
          name: "",
          price: "",
          category: "",
          stock: "",
          image: null,
        }}
        validationSchema={productSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const formData = new FormData();

          formData.append("name", values.name);
          formData.append("price", values.price.toString());
          formData.append("category", values.category);
          formData.append("stock", values.stock.toString());

          if (values.image) {
            formData.append("image", values.image);
          }

          try {
            const res = await api.post("/products", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
              alert("Product created");
              navigate("/");
            }
          } catch (err: any) {
            alert(err.response?.data?.message || "Failed to create product");
          }

          setSubmitting(false);
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                placeholder="Product Name"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="price"
                type="number"
                placeholder="Price"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                as="select"
                name="category"
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <Field
                name="stock"
                type="number"
                placeholder="Stock Quantity"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="stock"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFieldValue("image", file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full p-2 border rounded bg-white"
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-3 w-32 h-32 object-cover rounded border"
                />
              )}

              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
                isSubmitting && "opacity-50 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
