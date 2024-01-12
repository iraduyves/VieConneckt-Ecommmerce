//
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Notiflix from 'notiflix';
import axios from "../configuration/axios";
import { createContext, context } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContent = createContext();

export default function ProductProvider({ children }) {

    const GetAllBrands = useQuery({
        queryKey: ["GetAllBrands"],
        queryFn: async () => {
            const response = await axios.get("/api/v1/brand/get");
            return response.data.getallBrand;
        },

        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting brands.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const CreateBrand = useMutation({
        mutationFn: async ({ data, images }) => {
            Notiflix.Loading.arrows()
            console.log({ data });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();
            formData.append("brandName", data?.BrandName);
            formData.append("image", images[0]);
            const response = await axios.post("/api/v1/brand/create", formData, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {

            Notiflix.Notify.success(`Brand Created Successfully!!`);
            Notiflix.Loading.remove()
            setTimeout(() => {
                GetAllBrands?.refetch()
            }, 100);
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.message || 'An error occurred while creating the brand.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const EditBrand = useMutation({
        mutationFn: async ({ data, images, id }) => {
            Notiflix.Loading.arrows()
            console.log({ data });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();


            formData.append("brandName", data.BrandName);


            formData.append("image", images[0]);

            const response = await axios.put(`/api/v1/brand/update/${id}`, formData, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Update successfully");
            setTimeout(() => {
                GetAllBrands?.refetch()
            }, 100);
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while updating brand';
            Notiflix.Notify.failure(errorMessage);
        },
    });
    const GetAllProduct = useQuery({
        queryKey: ["GetAllProducts"],
        queryFn: async () => {

            const response = await axios.get("/api/v1/product/viewAllProd");
            return response.data.products;
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting all products.';
            Notiflix.Notify.failure(errorMessage);
        },
    });
    const EditProduct = useMutation({
        mutationFn: async ({ data, images, id }) => {
            Notiflix.Loading.arrows()
            console.log({ data });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();


            formData.append("brandName", data.BrandName);
            formData.append("productName", data.productName);
            formData.append("description", data.description);
            formData.append("brand", data.brand);
            formData.append("price", data.price);
            formData.append("categoryId", data.categoryId);
            formData.append("color", data.color);
            formData.append("stock_quantity", data.stock_quantity);


            for (const file of images) {
                formData.append("productImage", file);
            }


            console.log(formData.get("image"));
            const response = await axios.put(`/api/v1/product/updateProduct/${id}`, formData, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Updated successfully");
            Notiflix.Loading.remove()
            setTimeout(() => {
                GetAllProduct.refetch()
            }, 100);
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while editing the product.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetAllCategories = useQuery({
        queryKey: ["GetAllCategories"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/category/viewAll", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data.catData;
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while all categories.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetAllColours = useQuery({
        queryKey: ["GetAllColours"],
        queryFn: async () => {
            const response = await axios.get("/api/v1/color/get");
            return response.data.getallColor;
        },
        onSuccess: (data) => {
            // Notiflix.Notify.success('Fetched Sucessfully!!')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting all colors.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

   
    const NewArrivals = useQuery({
        queryKey: ["newarrivals"],
        queryFn: async () => {
            const response = await axios.get("/api/v1/product/last-n-products");
            return response.data.products;
        },
        onSuccess: (data) => {
            // Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while New Arrivals.';
            Notiflix.Notify.failure(errorMessage);

        },
    });
    const GetProductByBrand = useMutation({
        queryKey: ["GetProductByBrand"],
        mutationFn: async (brand) => {
            const response = await axios.get(`/api/v1/product/brand/${brand}`);
            return response.data;
        },
        onSuccess: (data) => {
            // Notiflix.Notify.success("Fetched Sucessfully!!");
            // console.log("searched:", data);
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting products by brand.';
            Notiflix.Notify.failure(errorMessage);
        },
    });
    const GetSingleProduct = useMutation({
        queryKey: ["GetSingleProductt"],
        mutationFn: async (id) => {
            const response = await axios.get(`/api/v1/product/viewProd/${id}`);
            return response.data.product;
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while this product.';
            Notiflix.Notify.failure(errorMessage);

        },
    });


    const CreateProduct = useMutation({

        queryKey: ["CreateProduct"],
        mutationFn: async ({ data, images }) => {
            Notiflix.Loading.arrows()
            // console.log({ data, images });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();

            for (const name in data) {
                formData.append(name, data[name]);
            }
            for (const file of images) {
                formData.append("productImage", file);
            }

            const response = await axios.post("/api/v1/product/create", formData, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Product Created Sucessfully!!");
            Notiflix.Loading.remove()
            setTimeout(() => {
                window.location.assign('Allproduct')
            }, 100);
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while creating the product.';
            Notiflix.Notify.failure(errorMessage);

        },
    });
    const RateProduct = useMutation({
        mutationFn: async ({ data, id }) => {
            Notiflix.Loading.arrows()
            const ids = id._id;
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.post(`/api/v1/product/rating/${ids}`, data, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Review Created Sucessfully!!");
            Notiflix.Loading.remove()
            setTimeout(() => {
                window.location.reload();
            }, 100);
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while rating the product.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const DeleteProduct = useMutation({
        mutationFn: async (id) => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            // Show Notiflix confirm before making the delete request
            Notiflix.Confirm.show(
                'Delete Product',
                'Are you sure you want to delete this product?',
                'Yes',
                'No',
                async () => {
                    const response = await axios.delete(`/api/v1/product/deleteProduct/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    });
                    Notiflix.Notify.success("Product Deleted Successfully!!");
                    setTimeout(() => {
                        GetAllProduct.refetch()
                    }, 100);
                    return response.data;
                },
                () => {
                    // User clicked 'No', do nothing or handle as needed
                },
                {
                    useGoogleFont: true,
                    zIndex: 4000,
                }
            );
        },

        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while deleting the product.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()

        },
    });

    const CreateCategory = useMutation({
        mutationFn: async ({ data, images }) => {

            Notiflix.Loading.arrows()
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();


            formData.append("categoryName", data.categoryName);
            formData.append("image", images[0]);

            const response = await axios.post("/api/v1/category/create", formData, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Loading.remove()
            Notiflix.Notify.success("Category Created Successfully!!");
            setTimeout(() => {
                GetAllCategories.refetch()
            }, 100);
        },
        onError: (error) => {

            const errorMessage = error?.response?.data?.error || 'An error occurred while creating the category.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()

        },
    });

    const GetCarts = useQuery({
        queryKey: ["GetCarts"],
        queryFn: async () => {

            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/cart/getUserCart", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data.userCart.products;
            // console.log(response.data.userCart.products);
        },
        onSuccess: (data) => {
            // Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting the carts.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });

    const CreateCart = useMutation({
        mutationFn: async (data) => {
            Notiflix.Loading.arrows()
            console.log({ data });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            const body = {
                productDetails: [
                    {
                        productId: data?._id,
                        count: 1,
                        color: "white",
                    },
                ],
            };

            let response;

            if (user?.access_token) {
                response = await axios.post("/api/v1/cart/createCart", body, {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`,
                    },
                });
            } else {
                response = await axios.post("/api/v1/cart/createCartGuest", body);
            }

            // console.log({ data: response?.data });

            return response?.data;
        },
        onSuccess: (data) => {

            Notiflix.Notify.success("Cart Created Successfully!!");
            Notiflix.Loading.remove()
            setTimeout(() => {
                GetCarts?.refetch()
            }, 100);
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while creating the cart.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });
    const Editcart = useMutation({
        mutationFn: async (data) => {
            Notiflix.Loading.arrows()
            console.log("update cart:", { data });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.put(`/api/v1/cart/updateCart`, data, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Update number of products");
            Notiflix.Loading.remove()
            GetCarts?.refetch()
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while updating count in cart';
            Notiflix.Notify.failure(errorMessage);
        },
    });
    const DeleteItemInCart = useMutation({

        mutationFn: async (id) => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            // Show Notiflix confirm before making the delete request
            Notiflix.Confirm.show(
                'Remove Product in cart',
                'Are you sure you want to remove  this from cart?',
                'Yes',
                'No',
                async () => {
                    // User clicked 'Yes', proceed with the delete request
                    let response = await axios.delete(`/api/v1/cart/removeItem/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    });
                    Notiflix.Notify.success("Product Deleted Successfully!!");
                    setTimeout(() => {
                        // window.location.reload();
                        GetCarts?.refetch()
                    }, 100);
                    return response.data;
                },
                () => {
                    // User clicked 'No', do nothing or handle as needed
                },
                {
                    useGoogleFont: true,
                    zIndex: 4000,
                }
            );
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while deleting product from cart.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()

        },
    });


    const GetProfille = useQuery({
        queryKey: ["GetProfille"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1//user/viewProfile", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            // Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {

            const errorMessage = error?.response?.data?.error || 'An error occurred while getting profile.';
            Notiflix.Notify.failure(errorMessage);

        },
    });
    const GetOrders = useQuery({
        queryKey: ["GetOrders"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/order/getOrder", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data.orderDetails;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting the order.';
            Notiflix.Notify.failure(errorMessage);

        },
    });
    const GetOrdersMade = useQuery({
        queryKey: ["GettotalOrders"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/order/orderMade", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data.orderDetails;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {

            const errorMessage = error?.response?.data?.error || 'An error occurred while getting order.';
            Notiflix.Notify.failure(errorMessage);

        },
    });

    const CreateOrder = useMutation({
        mutationFn: async (data) => {
            const { id, count, color, Address } = data;
            // console.log(data);
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();

            formData.append("productId", id);
            formData.append("count", count);
            formData.append("colorId", color);
            formData.append("shippingAddress", Address);

            const response = await axios.post("/api/v1/order/createOrder", formData, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Order Created Sucessfully!!");
            Notiflix.Loading.remove()
            setTimeout(() => {
                window.location.assign('/Pay')
            }, 1000);
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while creating the order.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });

 
    const DeleteOrder = useMutation({
        mutationFn: async (id) => {

            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            Notiflix.Confirm.show(
                'Delete order',
                'Are you sure you want to delete this order?',
                'Yes',
                'No',
                async () => {
                    // User clicked 'Yes', proceed with the delete request
                    let response = await axios.delete(`/api/v1/order/removeOrder/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    });
                    Notiflix.Notify.success("order Deleted Successfully!!");
                    Notiflix.Loading.remove()
                    setTimeout(() => {
                        GetOrders.refetch()
                    }, 100);
                    return response.data;
                },

                () => {
                    // User clicked 'No', do nothing or handle as needed
                },
                {
                    useGoogleFont: true,
                    zIndex: 4000,
                }
            );

        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while deleting the order.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const MakePayment = useMutation({
        mutationFn: async ({ data, id }) => {
            Notiflix.Loading.arrows()
            console.log("payment", { data, id });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            // console.log({ id, data });
            const response = await axios.post(`/api/v1/payment/cashin/${id}`, data, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Check Your phone for payment details");
            Notiflix.Notify.success("And proceed more further process to complete your payment");
            Notiflix.Loading.remove()
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while making Paymeent';
            Notiflix.Notify.failure(errorMessage);
        },
    });




    /*chat*/
    /*get latest product*/
    const GetLatestProduct = useQuery({
        queryKey: ["GetLatestProduct"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/product/latestPopular", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            // console.log("latest_product:", response.data);
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting latest product.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });
    const GetEarningPerMonth = useMutation({
        mutationFn: async ({ Selected_year }) => {
            // console.log({ Selected_year });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            const response = await axios.get(`/api/v1/earnings/totalEarning?year=${Selected_year}`, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });

            return response.data;
        },

        onSuccess: (data) => {

            // Notiflix.Notify.success("year ");

        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting earnings per month.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });



    const EditCategory = useMutation({
        mutationFn: async ({ data, images, id }) => {
            Notiflix.Loading.arrows()
            console.log({ data });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();


            formData.append("categoryName", data.categoryName);


            formData.append("image", images[0]);


            console.log(formData.get("image"));
            const response = await axios.put(`/api/v1/category/update/${id}`, formData, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Updated successfully");
            Notiflix.Loading.remove()
            setTimeout(() => {
                GetAllCategories.refetch()
            }, 100);
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while updating the category.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const DeleteCategory = useMutation({
        mutationFn: async (id) => {

            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            // Show Notiflix confirm before making the delete request
            Notiflix.Confirm.show(
                'Delete Category',
                'Are you sure you want to delete this category?',
                'Yes',
                'No',
                async () => {
                    const response = await axios.delete(`/api/v1/category/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    });
                    Notiflix.Notify.success("Category Deleted Successfully!!");
                    setTimeout(() => {
                        GetAllCategories.refetch()
                    }, 100);
                    return response.data;
                },
                () => {
                    // User clicked 'No', do nothing or handle as needed
                },
                {
                    useGoogleFont: true,
                    zIndex: 4000,
                }
            );
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while deleting the category.';
            Notiflix.Notify.failure(errorMessage);
        },
    });


    const DeleteBrand = useMutation({
        mutationFn: async (id) => {

            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            Notiflix.Confirm.show(
                'Delete Brand',
                'Are you sure you want to delete this brand?',
                'Yes',
                'No',
                async () => {

                    const response = await axios.delete(`/api/v1/brand/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    });
                    Notiflix.Notify.success("Brand Deleted Successfully!!");
                    setTimeout(() => {
                        GetAllBrands?.refetch()
                    }, 100);
                    return response.data;
                },
                () => {
                    // User clicked 'No', do nothing or handle as needed
                },
                {
                    useGoogleFont: true,
                    zIndex: 4000,
                }
            );
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred Deleting the brand.';
            Notiflix.Notify.failure(errorMessage);
        },
    });



    const Editprofile = useMutation({
        mutationFn: async ({ data, images, id }) => {
            // console.log("formdata", { data, images, id });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();
            formData.append("profileImage", images[0])
            formData.append("FullName", data.userName)
            formData.append("phone", data.phone)
            formData.append("userName", data.userName)
            formData.append("gender", data.gender)
            formData.append("location", data.location)


            const response = await axios.put(`/api/v1/auth/updateAccount/${id}`, formData, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("User Updated successfully");
            setTimeout(() => {
                GetProfille.refetch()
            }, 100);
        },
        onError: (error) => {
            Notiflix.Notify.failure(error.response.data.message);
        },
    });


    const GetOrdersPerDay = useQuery({
        queryKey: ["GetOrdersPerDay"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/order/countPerDay", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting orders per day.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetUserPerWeek = useQuery({
        queryKey: ["GetUserPerWeek"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/users", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting user per week.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetUser = useQuery({
        queryKey: ["GetUser"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/user/viewUsers", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            // console.log("GetUser:", response.data);
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while Users.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetBlogs = useQuery({
        queryKey: ["GetBlogs"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/blog/viewAll", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            // console.log("GetBlogs:", response.data);
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting blogs.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const CreateBlog = useMutation({
        mutationFn: async ({ data, images }) => {
            Notiflix.Loading.arrows()
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("category", data.categoryId);
            formData.append("image", images[0]);


            const response = await axios.post("/api/v1/blog/create", formData, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {

            Notiflix.Notify.success("Blog Created Successfully!!");
            setTimeout(() => {
                GetBlogs.refetch()
            }, 100);
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while creating blog.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const DeleteBlog = useMutation({
        mutationFn: async (id) => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            // Show Notiflix confirm before making the delete request
            Notiflix.Confirm.show(
                'Delete Blog',
                'Are you sure you want to delete this blog?',
                'Yes',
                'No',
                async () => {
                    // User clicked 'Yes', proceed with the delete request
                    const response = await axios.delete(`/api/v1/blog/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    });
                    Notiflix.Notify.success("Blog Deleted Successfully!!");
                    setTimeout(() => {
                        GetBlogs.refetch()
                    }, 100);
                    return response.data;
                },
                () => {
                    // User clicked 'No', do nothing or handle as needed
                },
                {
                    useGoogleFont: true,
                    zIndex: 4000,
                }
            );
        },

        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while deleting blog.';
            Notiflix.Notify.failure(errorMessage);
        },
    });



    const EditBlog = useMutation({
        mutationFn: async ({ data, images, id }) => {
            Notiflix.Loading.arrows()
            console.log({ data });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();


            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("categoryId", data.categoryId);
            formData.append("image", images[0]);
            // console.log(formData.get("image"));
            const response = await axios.put(`/api/v1/blog/update/${id}`, formData, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Updated successfully");
            setTimeout(() => {
                GetBlogs.refetch()
            }, 100);
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting earnings per month.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetMessages = useQuery({
        queryKey: ["GetMessages"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/get-submitted-messages", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data.messages;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            console.log(error.response.data.message);
            Notiflix.Notify.success(error.response.data.message);
        },
    });
    const RespondMessage = useMutation({
        mutationFn: async (data) => {
            Notiflix.Loading.arrows()
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            const response = await axios.post("/api/v1/respond-to-message", data, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {

            Notiflix.Notify.success("Message responded Successfully!!");

            setTimeout(() => {
                GetMessages.refetch()
            }, 100)
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            Notiflix.Loading.remove()
            const errorMessage = error?.response?.data?.error || 'An error occurred while responsding to message.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetColor = useQuery({
        queryKey: ["GetColor"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/color/get", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            // console.log("GetColor:", response.data.messages);
            return response.data.getallColor;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Fetched Sucessfully!!");
        },
        onError: (error) => {
            console.log(error.response.data.message);
            Notiflix.Notify.success(error.response.data.message);
        },
    });

    const CreateColor = useMutation({
        mutationFn: async ({ color }) => {
            Notiflix.Loading.arrows()
            console.log({ color });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();

            formData.append("colorName", color);


            const response = await axios.post("/api/v1/color/create", formData, {
                "content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {

            Notiflix.Notify.success("Color Created Successfully!!");
            GetColor.refetch()
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while creating color.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });

    const DeleteColor = useMutation({
        mutationFn: async (id) => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            // Show Notiflix confirm before making the delete request
            Notiflix.Confirm.show(
                'Delete Color',
                'Are you sure you want to delete this Color?',
                'Yes',
                'No',
                async () => {
                    // User clicked 'Yes', proceed with the delete request
                    const response = await axios.delete(`/api/v1/color/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    });
                    Notiflix.Notify.success("Color Deleted Successfully!!");
                    setTimeout(() => {
                        GetColor.refetch()
                    }, 100);
                    return response.data;
                },
                () => {
                    // User clicked 'No', do nothing or handle as needed
                },
                {
                    useGoogleFont: true,
                    zIndex: 4000,
                }
            );
        },
        onError: (error) => {
            Notiflix.Notify.failure(error.response.data.message);
            // console.log(error.response.data.message);
        },
    });

    const EditColor = useMutation({
        mutationFn: async ({ colorName, id }) => {
            Notiflix.Loading.arrows()
            console.log({ colorName });
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();
            formData.append("colorName", colorName);
            const response = await axios.put(`/api/v1/color/update/${id}`, formData, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });

            return response.data;
        },

        onSuccess: (data) => {
            Notiflix.Notify.success("Color Upudeted Successfully!!");
            setTimeout(() => {
                GetColor.refetch()
            }, 100);
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while updating color.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });

    const Createmessage = useMutation({
        mutationFn: async (data) => {
            Notiflix.Loading.arrows()
            const response = await axios.post("/api/v1/submit-message", data);
            return response.data;
        },
        onSuccess: (data) => {

            Notiflix.Notify.success(" Your Message sent Successfully!!");
            window.location.reload();
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred creating message.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });

    const GetAllBlogs = useQuery({
        queryKey: ["GetAllblogs"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/blog/viewAll", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred getting all blogs.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetAllProductperweek = useQuery({
        queryKey: ["GetAllProductperweek"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/productsData", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred getting all products per week.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const EditRole = useMutation({
        mutationFn: async ({ selectedRole, id }) => {
            Notiflix.Loading.arrows()
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();


            formData.append("role", selectedRole);

            // console.log(formData.get("image"));
            const response = await axios.put(`/api/v1/user/updateRole/${id}`, formData, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Updated successfully");
            setTimeout(() => {
                window.location.reload()
            }, 100);
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while updating role.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });


    const DeleteUser = useMutation({
        mutationFn: async (id) => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            // Show Notiflix confirm before making the delete request
            Notiflix.Confirm.show(
                'Delete User',
                'Are you sure you want to delete this User?',
                'Yes',
                'No',
                async () => {
                    // User clicked 'Yes', proceed with the delete request
                    const response = await axios.delete(`/api/v1/user/deleteaUser/${id}`, {
                        headers: {
                            Authorization: `Bearer ${user?.access_token}`,
                        },
                    });
                    Notiflix.Notify.success("User Deleted Successfully!!");
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                    return response.data;
                },
                () => {
                    // User clicked 'No', do nothing or handle as needed
                },
                {
                    useGoogleFont: true,
                    zIndex: 4000,
                }
            );
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while deleting user.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const EditPassword = useMutation({
        mutationFn: async ({ selectedRole, id }) => {
            Notiflix.Loading.arrows()
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const formData = new FormData();


            formData.append("role", selectedRole);

            // console.log(formData.get("image"));
            const response = await axios.put(`/api/v1/auth/updatePassword`, formData, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            Notiflix.Notify.success("Updated successfully");
            setTimeout(() => {
                window.location.reload()
            }, 100);
            Notiflix.Loading.remove()
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while updating role.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });

    const GetEarnedbyCategory = useQuery({
        queryKey: ["GetEarnedbyCategory"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/order/categoryEarnings", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onError: (error) => {
            Notiflix.Notify.failure(error.response.data.message);
        },
    });
    const GetEarnedperWeek = useQuery({
        queryKey: ["GetEarnedperWeek"],
        queryFn: async () => {
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));
            const response = await axios.get("/api/v1/earningsPerDay", {
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting earned by category.';
            Notiflix.Notify.failure(errorMessage);
        },
    });

    const GetorderDitail = useMutation({
        mutationFn: async ({ id }) => {
            console.log("wdss", id);
            Notiflix.Loading.arrows()
            let user = JSON.parse(localStorage.getItem("isLoggedIn"));

            // console.log(formData.get("image"));
            const response = await axios.get(`/api/v1/order/GetOneOrder/${id}`, {
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                },
            });
            return response.data;
        },
        onSuccess: (data) => {

            Notiflix.Loading.remove()
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while updating role.';
            Notiflix.Notify.failure(errorMessage);
            Notiflix.Loading.remove()
        },
    });
    const GetAllPayments = useQuery({
        queryKey: ["GetAllpayments"],
        queryFn: async () => {
            const response = await axios.get("/api/v1/payment/view-all-Payment?status=Successful");
            return response.data;
        },

        onError: (error) => {
            const errorMessage = error?.response?.data?.error || 'An error occurred while getting All Payments.';
            Notiflix.Notify.failure(errorMessage);
        },
    });
    return (
        <ProductContent.Provider
            value={{
                GetAllProduct,
                GetAllBrands,
                GetAllCategories,
                GetAllColours,
                CreateProduct,
                GetSingleProduct,
                CreateCategory,
                CreateCart,
                GetCarts,
                DeleteItemInCart,
                GetProfille,
                DeleteProduct,
                EditBrand,
                CreateBrand,
                CreateOrder,
                GetOrders,
                MakePayment,
                GetLatestProduct,
                GetEarningPerMonth,
                EditCategory,
                DeleteCategory,
                DeleteBrand,
                Editprofile,
                GetOrdersPerDay,
                GetUserPerWeek,
                GetUser,
                EditProduct,
                GetAllBlogs,
                GetBlogs,
                CreateBlog,
                DeleteBlog,
                EditBlog,
                GetMessages,
                RespondMessage,
                GetColor,
                CreateColor,
                GetProductByBrand,
                DeleteColor,
                EditColor,
                Createmessage,
                // GetSingleBlog,
                GetAllProductperweek,
                EditRole,
                GetOrdersMade,
                DeleteOrder,
                DeleteUser,
                EditPassword,
                GetEarnedbyCategory,
                GetEarnedperWeek,
                NewArrivals,
                RateProduct,
                GetorderDitail,
                Editcart,
                GetAllPayments
            }}
        >
            {children}
        </ProductContent.Provider>
    );
}