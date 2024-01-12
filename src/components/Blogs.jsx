import React from 'react'
import BlogCard from './BlogCard'



const Blogs = () => {
  return (
    <>
    <div className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className="section-heading">Our Latest Blogs</h3>
                </div>
               <BlogCard/>  
            </div>
        </div>
    </div>
    </>
  )
}

export default Blogs