import React, { useContext, useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import Products from '../components/Products';
import ProductCard from '../components/ProductCard';
import { ProductContent } from '../components/Context/ProductProvider';
import { useLocation } from 'react-router-dom';

const OurStore = ({ selectedCategory, setSelectedCategory }) => {
    const { GetAllProduct } = useContext(ProductContent)

    const location = useLocation();
    const [randomProducts, setRandomProducts] = useState([]);
    const searchQuery = new URLSearchParams(location.search).get('selectedCategory');
    const setCategoryFunction = new URLSearchParams(location.search).get('setSelectedCategory');
    const [sortProperty, setSortOption] = useState('');
    const [products, setProducts] = useState([]);
    //  const setSelectedCategory = setCategoryFunction ? JSON.parse(setCategoryFunction) : null;

    const uniqueCategoryNames = new Set(
        GetAllProduct?.data?.map(product => product?.category?.categoryName)
    );

    const productTags = Array.from(uniqueCategoryNames);


    const [grid, SetGrid] = useState(4)


    const handleCategoryChange = (category) => {

        setSelectedCategory(category);
    };


    useEffect(() => {
        if (GetAllProduct && GetAllProduct.data && GetAllProduct.data.length > 0) {
            const getRandomIndex = () => Math.floor(Math.random() * GetAllProduct.data.length);

            let randomProductIndexes = [];
            while (randomProductIndexes.length < 2) {
                const randomIndex = getRandomIndex();
                if (!randomProductIndexes.includes(randomIndex)) {
                    randomProductIndexes.push(randomIndex);
                }
            }

            const selectedProducts = randomProductIndexes.map(index => GetAllProduct.data[index]);
            setRandomProducts(selectedProducts);
        }
    }, [GetAllProduct]);

    useEffect(() => {
        setSelectedCategory(searchQuery);
    }, [searchQuery, setSelectedCategory])

    return (
        <>
            <Meta title={"OUR STORE"} />
            <BreadCrumb title="Our Store" />
            <div className="store-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            {/* <div className="filter-card mb-3">
                                <h3 className="filter-title">Shop By Categories</h3>
                                <div>
                                    <ul className='ps-0'>
                                        {productTags.map((category, index) => (
                                            <li key={index} onClick={() => handleCategoryChange(category)}>
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div> */}
                            {/* <div className="filter-card mb-3">
                                <h3 className="filter-title">Filter By</h3>
                                <div>
                                    <h5 className="sub-title">Availability</h5>
                                    <div>
                                        <div className="form-check">
                                            <input type="checkbox" name="" id="" className='form-check-input' />
                                            <label htmlFor="" className='form-check-label'>
                                                In Stock(1)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" name="" id="" className='form-check-input' />
                                            <label htmlFor="" className='form-check-label'>
                                                Out Of Stock(0)
                                            </label>
                                        </div>
                                    </div>
                                    <h5 className='sub-title'>Price</h5>
                                    <div className='d-flex align-items-center gap-10'>
                                        <div className="form-floating ">
                                            <input type="text" className="form-control py-1" id='floatingInput' placeholder='From' />
                                            <label htmlFor="floatingInput">From</label>
                                        </div>
                                        <div className="form-floating ">
                                            <input type="text" className="form-control py-1" id='floatingInput' placeholder='To' />
                                            <label htmlFor="floatingInput">To</label>
                                        </div>
                                    </div>
                                    <h5 className='sub-title'>Colors</h5>
                                    <div >
                                        <ul className='colors'>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                            <li></li>
                                        </ul>
                                    </div>
                                    <h5 className='sub-title'>Size</h5>
                                    <div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="color-1"
                                                className='form-check-input'
                                            />
                                            <label htmlFor="color-1" className='form-check-label'>
                                                S (2)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="color-2"
                                                className='form-check-input'
                                            />
                                            <label htmlFor="color-2" className='form-check-label'>
                                                M (2)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="color-3"
                                                className='form-check-input'
                                            />
                                            <label htmlFor="color-3" className='form-check-label'>
                                                L (0)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="color-4"
                                                className='form-check-input'
                                            />
                                            <label htmlFor="color-4" className='form-check-label'>
                                                XL (6)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="color-5"
                                                className='form-check-input'
                                            />
                                            <label htmlFor="color-5" className='form-check-label'>
                                                XXL (0)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Product Tags</h3>
                                <div>
                                    <div className="product-tags d-flex flex-wrap align-items-center gap-15" >
                                        {productTags.map((item, index) =>
                                            <span className="badge bg-light text-secondary rounded-3 py-2 px-3"> {item}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">Random Product</h3>
                                <div >
                                    {randomProducts?.map((randproducts, index) => (
                                        <div className="random-products d-flex" key={randproducts._id}>
                                            <div className="w-50">
                                                <img src={randproducts?.productImage[0]} alt="random_image" className='image-fluid' style={{ width: '100px', height: '110px' }} />
                                            </div>


                                            <div className="w-50">
                                                <h5>{randproducts?.productName}</h5>
                                                <ReactStars
                                                    count={5}
                                                    size={24}
                                                    value={randproducts.totalRating}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                />
                                                <p> {randproducts?.price} RWF</p>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="filter-sort-grid mb-4">
                                <div className="d-flex justify-content-between align-item-center">
                                    <div className="d-flex align-items-center gap-10">
                                        <p className="mb-0" style={{ width: '100px' }}>Sort By:</p>
                                        <select name="" id="" className='form-control form-select' onChange={(e) => setSortOption(e.target.value)}>
                                            <option value="" selected="selected">All products</option>
                                            <option value="productName" >Albabetically, A-Z</option>
                                            <option value="-productName" >Albabetically, Z-A</option>
                                            <option value="price" >Price , low to high</option>
                                            <option value="-price" >Price , high to low</option>
                                            <option value="createdAt" >Date , old to New</option>
                                            <option value="-createdAt" >Date , New to old</option>
                                        </select>
                                    </div>
                                    <div className='d-flex align-items-center gap-10'>
                                        <p className="totalProducts mb-0">{GetAllProduct?.data?.length} products</p>
                                        <div className="d-flex gap-10 align-items-center grid"  >
                                            <img src="images/gr4.svg" className='d-block img-fluid' alt="grid" onClick={() => { SetGrid(3) }} />
                                            <img src="images/gr3.svg" className='d-block img-fluid' alt="grid" onClick={() => { SetGrid(4) }} />
                                            <img src="images/gr2.svg" className='d-block img-fluid' alt="grid" onClick={() => { SetGrid(6) }} />
                                            <img src="images/gr.svg" className='d-block img-fluid' alt="grid" onClick={() => { SetGrid(12) }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="products-list pb-3">
                                <div className="d-flex gap-10 flex-wrap">
                                    <ProductCard grid={grid} category={searchQuery} sortProperty={sortProperty} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurStore