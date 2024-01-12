import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'

import {Link} from 'react-router-dom'

const Blog = () => {
    return (
        <>
            <Meta title={"Dynamic Blog Name"} />
            <BreadCrumb title='Dynamic Blog Name' />
            <div className="blog-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="single-blog-card">
                                   <Link to='/blogs' className='d-flex align-items-center gap-10'><FontAwesomeIcon icon={faArrowLeft} className='f-4'/>Go back to Blogs</Link>
                                    <h3 className='title'>A beautiful Sunday Morning Renaissance</h3>
                                    <img src="images/blog-1.jpg" className='img-fluid w-100 my-4' alt="blog" />
                                    <p>You're only as good as your last collection , which is an
                                        enormous pressure. I think there is something about luxury - 
                                        it's not somethinf people need , but it's whaat they want . It 
                                        really pulls at their heart . I havve a fantastic relationship 
                                        with money. Scelerique sociswue, Lorem ipsum dolor sit, amet 
                                        consectetur adipisicing elit. Aliquid explicabo quisquam cor
                                        rupti odit, itaque beatae reiciendis vero sunt doloribus pariatur
                                        quibusdam enim exercitationem ut dignissimos corporis! Commodi 
                                        facere porro eveniet.
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog