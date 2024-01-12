import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContent } from './Context/ProductProvider';
import "./hoveer.css";

export const blogImg = [
  {
    image: "images/blog-1.jpg",
    createdAt: "24 Nov,2023",
    title: "A beautiful Sunday Renai",
    description: "Lorem ipsum dolor sit amet consesit amet consectetur, consectetur, h"
  },
  {
    image: "images/blog-1.jpg",
    createdAt: "24 Nov,2023",
    title: "A beautiful Sunday Renai",
    description: "Lorem ipsum dolor sit amet consesit amet consectetur, consectetur, h"
  },
  {
    image: "images/blog-1.jpg",
    createdAt: "24 Nov,2023",
    title: "A beautiful Sunday Renai",
    description: "Lorem ipsum dolor sit amet consesit amet consectetur, consectetur, h"
  },
  {
    image: "images/blog-1.jpg",
    createdAt: "24 Nov,2023",
    title: "A beautiful Sunday Renai",
    description: "Lorem ipsum dolor sit amet consesit amet consectetur, consectetur, h"
  },
  {
    image: "images/blog-1.jpg",
    createdAt: "24 Nov,2023",
    title: "A beautiful Sunday Renai",
    description: "Lorem ipsum dolor sit amet consesit amet consectetur, consectetur, h"
  },
  {
    image: "images/blog-1.jpg",
    createdAt: "24 Nov,2023",
    title: "A beautiful Sunday Renai",
    description: "Lorem ipsum dolor sit amet consesit amet consectetur, consectetur, h"
  },
  {
    image: "images/blog-1.jpg",
    createdAt: "24 Nov,2023",
    title: "A beautiful Sunday Renai",
    description: "Lorem ipsum dolor sit amet consesit amet consectetur, consectetur, h"
  },
  {
    image: "images/blog-1.jpg",
    createdAt: "24 Nov,2023",
    title: "A beautiful Sunday Renai",
    description: "Lorem ipsum dolor sit amet consesit amet consectetur, consectetur, h"
  },

]

const BlogCard = () => {
  const { GetAllBlogs } = useContext(ProductContent);
  return (
    <>
      {GetAllBlogs?.data?.slice(0,4)?.map((item, index) =>
      <div className="col-3 mb-4">
          <div className="blog-card " >
            <div className="card-image " key={item._id}  style={{height:"257px",width:"100%"}}>
              <img src={item.image} className='img-fluid' alt="blogs" style={{width:"100%",height:"257px"}}/>
            </div>
              <div className="blog-content" >
                <p className="date">{item.createdAt}</p>
                <h5 className="title">{item.title} </h5>
                <p className="desc">{item.description}</p>
                <Link to='/blog:id' className='button'>Read More</Link>
              </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogCard