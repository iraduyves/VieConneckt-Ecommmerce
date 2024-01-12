import React, { useContext, useState, useMemo } from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom"
import { ProductContent } from './Context/ProductProvider';
import { useCallback } from 'react';
import './hoveer.css';



export const product = [
  {
    image: "images/speaker.jpg",
    image1: "images/speaker001.jpg",
    brand: "Havels",
    title: "Kids Headphones bulk 10 pack multi colored for students",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam a, sapiente, debitis ratione saepe, veniam perspiciatis ullam quaerat nesciunt illum hic quasi cupiditate similique consequatur optio eius aspernatur dicta temporibus.",
    price: "$100.00"
  },
  {
    image: "images/smartwatch001.jpg",
    brand: "Havels",
    image1: "images/smartwatch002.jpg",
    title: "Kids Headphones bulk 10 pack multi colored for students",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam a, sapiente, debitis ratione saepe, veniam perspiciatis ullam quaerat nesciunt illum hic quasi cupiditate similique consequatur optio eius aspernatur dicta temporibus.",
    price: "$100.00"
  },
  {
    image: "images/speaker.jpg",
    image1: "images/speaker001.jpg", brand: "Havels",
    title: "Kids Headphones bulk 10 pack multi colored for students",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam a, sapiente, debitis ratione saepe, veniam perspiciatis ullam quaerat nesciunt illum hic quasi cupiditate similique consequatur optio eius aspernatur dicta temporibus.",
    price: "$100.00"
  },
  {
    image: "images/speaker.jpg",
    image1: "images/speaker001.jpg", brand: "Havels",
    title: "Kids Headphones bulk 10 pack multi colored for students",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam a, sapiente, debitis ratione saepe, veniam perspiciatis ullam quaerat nesciunt illum hic quasi cupiditate similique consequatur optio eius aspernatur dicta temporibus.",
    price: "$100.00"
  },
  {
    image: "images/speaker.jpg",
    image1: "images/speaker001.jpg", brand: "Havels",
    title: "Kids Headphones bulk 10 pack multi colored for students",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam a, sapiente, debitis ratione saepe, veniam perspiciatis ullam quaerat nesciunt illum hic quasi cupiditate similique consequatur optio eius aspernatur dicta temporibus.",
    price: "$100.00"
  },
  {
    image: "images/speaker.jpg",
    image1: "images/speaker001.jpg", brand: "Havels",
    title: "Kids Headphones bulk 10 pack multi colored for students",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam a, sapiente, debitis ratione saepe, veniam perspiciatis ullam quaerat nesciunt illum hic quasi cupiditate similique consequatur optio eius aspernatur dicta temporibus.",
    price: "$100.00"
  },
]



const ProductCard = (props) => {
  const { GetAllProduct, CreateCart } = useContext(ProductContent)
  let location = useLocation();
  const { grid, category, sortProperty } = props;
  const filteredProducts = useMemo(() => GetAllProduct.data?.filter(item => !category ||
    Object.values(item).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(category?.toLowerCase());
      } else if (Array.isArray(value)) {
        return value.some(subValue =>
          typeof subValue === 'string' && subValue.toLowerCase().includes(category?.toLowerCase())
        );
      } else if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(subValue =>
          typeof subValue === 'string' && subValue.toLowerCase().includes(category?.toLowerCase())
        );
      }
      return false;
    })
  ), [GetAllProduct.data, category])

  // console.log(GetAllProduct);

    const sort = useCallback((a, b) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b); // String comparison
      } else if (typeof a === 'number' && typeof b === 'number') {
        return a - b; // Numeric comparison
      } else if (a instanceof Date && b instanceof Date) {
        return a - b; // Date comparison
      } else {
        // Fallback for other types
        return 0;
      }
    }, [])

  // sort
  const sortedProducts = useMemo(() => {
    // if (!sortProperty) return filteredProducts
    if(!sortProperty) return filteredProducts
    if (sortProperty?.[0] === '-') {
      const [, ...p] = sortProperty
      return filteredProducts?.sort((a, b) => sort(b[p?.join("")], a[p?.join("")]))
    }
    return filteredProducts?.sort((a, b) => sort(a[sortProperty], b[sortProperty]))
  }, [filteredProducts, sort, sortProperty])

  const AddToCart = useCallback((item) => {
    CreateCart.mutate(item)
  }, [CreateCart])

  const [isHovered, setIsHovered] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isHove, setIsHove] = useState(false);
  const [isHov, setIsHov] = useState(false);
  return (
    <>
      {sortedProducts?.length === 0 ? (
        <p style={{ color: 'red' }}>No products found matching "{category}"</p>
      ) : filteredProducts?.map((item, index) => {

        let image;
        let image2;
        if (item.productImage) {
          image = item.productImage[0]
          image2 = item.productImage[1]

        }
        else {
          image = "https://kigaliphone.com/wp-content/uploads/2023/03/61XO4bORHUL._AC_SL1500_.jpg"
          image2 = "https://kigaliphone.com/wp-content/uploads/2023/03/61XO4bORHUL._AC_SL1500_.jpg"

        }

        // if (category && item?.categoryName !== category) {
        //     return null; // Skip rendering if not in the selected category
        // }



        return (
          <div
            key={item._id}
            className={`${location.pathname === "/ourstore"
              ? `gr-${grid} d-flex gap-15 flex-wrap`
              : "col-3 gap-10 mt-3"
              }`}
          >
            <Link className="product-card position-relative">
              <div className="wishlist-icon position-absolute ">
                <Link
                  className="image-container"
                  onMouseEnter={() => setIsHov(item._id)}
                  onMouseLeave={() => setIsHov(null)}
                >
                  <img src="images/wish.svg" alt="" />
                  {isHov === item._id && (
                    <div className="hover-text">Add to wishlist</div>
                  )}
                </Link>
              </div>
              <div className="product-image ">
                <img
                  src={image}
                  className="image img-fluid"
                  alt="products"
                />
                <img
                  src={image2}
                  className="image img-fluid"
                  alt="products"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand?.brandName}</h6>
                <h5 className="product-title">{item?.productName}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.totalRating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p

                  className={`description ${grid === 12 ? "d-block" : "d-none"
                    }`}
                >
                  {item.description}
                </p>
                <p className="price">{item?.price} RWF</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15 ">
                  <Link
                    className="image-container"
                    onMouseEnter={() => setIsHove(item._id)}
                    onMouseLeave={() => setIsHove(null)}
                  >
                    <img src="images/prodcompare.svg" alt="Compare" />
                    {isHove === item._id && (
                      <div className="hover-text">compare product</div>
                    )}
                  </Link>
                  <Link
                    to={`/product/${item._id}`}
                    className="image-container"
                    onMouseEnter={() => setIsHover(item._id)}
                    onMouseLeave={() => setIsHover(null)}
                  >
                    <img src="images/view.svg" alt="View" />
                    {isHover === item._id && (
                      <div className="hover-text">view product</div>
                    )}
                  </Link>
                  <Link
                    className="image-container"
                    onMouseEnter={() => setIsHovered(item._id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <img
                      src="images/add-cart.svg"
                      alt="Add cart"
                      onClick={() => AddToCart(item)}
                    />
                    {isHovered === item._id && (
                      <div className="hover-text">add to cart</div>
                    )}
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        );
      }

      )}
    </>
  )
}

export default ProductCard