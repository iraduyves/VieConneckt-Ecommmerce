import React, {useContext, useLayoutEffect } from 'react'
import { useState, useEffect } from 'react';
import { GiCash } from "react-icons/gi";
import { TbShoppingCartUp } from "react-icons/tb";
import { TbShoppingCartDown } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import ReactPaginate from 'react-paginate';

import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { GrFormNextLink } from "react-icons/gr";
import { ProductContent } from '../components/Context/ProductProvider';





import { PureComponent } from 'react';

import { PieChart, Pie, Sector, Cell, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard_1() {
  const {
    GetAllProduct,
    GetAllBrands,
    GetAllCategories,
    CreateItemInCart,
    GetProfille,
    GetLatestProduct,
    GetEarningPerMonth,
    GetOrdersPerDay,
    GetUserPerWeek,
    GetAllProductperweek,
    GetEarnedbyCategory,
    GetEarnedperWeek,
   
}= useContext(ProductContent)
  
 var total = GetOrdersPerDay?.count;

 
  const currentYear = new Date().getFullYear();
  const previousYears = 5; // You can change this number to the desired range of previous years
const LatestProduct = GetLatestProduct?.data?.popularProducts[0];

  // Use the useState hook to manage the years state
  const [years, setYears] = useState(
    Array.from({ length: previousYears + 1 }, (_, index) => currentYear - index)
  );
  
 
  const [Selected_year,setSelected_year] = useState(currentYear);

  const handleSubmit = (e) => {
    e.preventDefault();
    GetEarningPerMonth.mutate({Selected_year})
 
  };

  const day = GetEarningPerMonth.data;
  
 
 

  const data_1 = [
    { name: 'Group A', value: 500 },
    { name: 'Group B', value: 300 },
  ];

  const COLORS = ['#00C49F', '#FFBB28'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const colorMap = {
    'in stock': 'green',
    'out of stock': 'red',
    'coming soon': 'rgba(209, 192, 39, 1)',
  };
  const [colors, setColors] = useState('black');
  const [pagenumber, setpagenumber] = useState(0);
  const bookpage = 5;
  const pageVisited = pagenumber * bookpage;
  const display = GetLatestProduct?.data?.popularProducts?.slice(pageVisited, pageVisited + bookpage);
  const changepage = ({ selected }) => {
    setpagenumber(selected)
  };

  const SumEarningCount = () => {
    let total = 0;
    
    GetEarnedperWeek?.data?.forEach(item => {
      total += item.count;
    });
  
    return total;
  };
  
  const SumEarningperMonthCount = () => {
    let total = 0;
    
    GetEarningPerMonth?.data?.forEach(item => {
      total += item.totalEarnings;
    });
  
    return total;
  };
  
 
  const SumEarningbyCategoryCount = () => {
    let total = 0;
    
    GetEarnedbyCategory?.data?.forEach(item => {
      total += item.total;
    });
  
    return total;
  };
  const findCategoryWithHighestTotal = () => {
    let maxTotal = 0;
    let categoryWithHighestTotal = null;
    
    // Ensure GetEarnedbyCategory and its data property exist before trying to iterate
    if (GetEarnedbyCategory && GetEarnedbyCategory.data) {
        GetEarnedbyCategory?.data?.forEach(category => {
            // Ensure each category has a 'total' property
            if (category && typeof category.total === 'number') {
                if (category.total > maxTotal) {
                    maxTotal = category.total;
                    categoryWithHighestTotal = category;
                }
            } else {
                console.error('Invalid category structure:', category);
            }
        });
    } else {
        console.error('Invalid GetEarnedbyCategory structure:', GetEarnedbyCategory);
    }
    
    return categoryWithHighestTotal;
};

  
  console.log("wdebckajbvkb", findCategoryWithHighestTotal());
  const SumOrdersPerDay = () => {
    let total = 0;
    
    GetOrdersPerDay?.data?.forEach(item => {
      total += item.count;
    });
  
    return total;
  };
  
  

  useEffect(() => {
    // Set the color based on the product status
    const newColors = display?.map(item => colorMap[item.status] || 'black');
    setColors(newColors);
  }, []);

  
  
  
  


  
  return (
    <div onLoad={handleSubmit}>
      <div className='Dashboard_main_container'>
        <div className='earning'>
          <div className='charts_container'>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                //  width={window.innerWidth > 230 ? 230 : window.innerWidth - 20} 
                // height={200} 
                data={GetEarnedperWeek?.data}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="count" fill="rgba(76, 139, 158, 1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="d_l_1">
            <div className="d_l_2">
              <h2>earning</h2>
              <p>{SumEarningCount()} rwf</p>
            </div>
            <div className='dash_icon'><GiCash className='icon_1' /></div>

          </div>
        </div>
        <div className='orders'>
          <div className='charts_container'>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={GetOrdersPerDay.data}>
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar dataKey="count" fill="rgba(68, 123, 187, 1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="d_l_1">
            <div className="d_l_2">
              <h2>orders</h2>
              <p>{SumOrdersPerDay()}</p>
            </div>
            <div className='dash_icon'><TbShoppingCartUp className='icon_2' /></div>

          </div>
        </div>
        <div className='allproduct'>
          <div className='charts_container'>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={GetAllProductperweek?.data?.productCounts}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="count" fill="rgba(193, 93, 177, 1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="d_l_1">
            <div className="d_l_2">
              <h2>all product</h2>
              <p>{GetAllProductperweek?.data?.totalProducttCount}</p>
            </div>
            <div className='dash_icon'><TbShoppingCartDown className='icon_3' /></div>

          </div>
        </div>
        <div className='users'>
          <div className='charts_container'>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart width={230} height={200} data={GetUserPerWeek?.data?.userSignupCounts}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="count" fill="rgba(192, 105, 105, 1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="d_l_1">
            <div className="d_l_2">
              <h2>users</h2>
              <p>{GetUserPerWeek?.data?.totalUserCount}</p>
            </div>
            <div className='dash_icon'><FaUsers className='icon_4' /></div>

          </div>
        </div>
        <div className='product_status'>
          <div className='popular_product_x'>
            <div className='popular_product_x_l1'>
              <h1>popular products</h1>
              <div className='popular_product_x_l1_icon'><HiDotsVertical /></div>
            </div>
            <div className='table_px'>
              <table>
                <thead className='allproduct_theader'>
                  <th className='allproduct_theader_th l'>product name</th>
                  <th className='allproduct_theader_th'>price</th>
                  <th className='allproduct_theader_th'>orders</th>
                  <th className='allproduct_theader_th'>quantity in stock</th>
                  <th className='allproduct_theader_th'>Total Rating</th>



                </thead>
                <tbody>
                  {display?.map((item, index) => (
                    <tr key={item.id}>
                      <td className='product_name_td_1'>
                        <div className='product_name_td_1 l'>
                          <div className='product_name_td_img_container'>
                            <img src={item.productDetails?.productImage[0]} alt="" className='product_name_td_img' />
                          </div>
                          <div>
                            <h1 className='product_name_td_h1'>{item.productName}</h1>
                            <p className='product_name_td_p'>{item.productId}</p>
                          </div>
                        </div>
                      </td>
                      <td className='product_name_td_1'>{item.productDetails?.price}</td>
                      <td className='product_name_td_1'>{item.orderCount}</td>
                      <td className='product_name_td_1'>{item.productDetails?.stock_quantity}</td>
                      <td className='product_name_td_1'>{item.productDetails?.totalRating}</td>


                    </tr>

                  ))}
                </tbody>
              </table>
            
            </div>
            <div className="order_pagination">
              <ReactPaginate
                pageCount={Math.ceil(GetLatestProduct?.data?.popularProducts?.length / bookpage)}
                previousLabel={<TbPlayerTrackPrevFilled />}
                nextLabel={<TbPlayerTrackNextFilled />}
                onPageChange={changepage}
                containerClassName="pagination_l_p"
                previousLinkClassName="privBtn_l"
                nextLinkClassName="NextBtn_l"
                disabledClassName="disable_l"
                activeClassName="paginationactiveL_l"
              >

              </ReactPaginate>
              </div>
          </div>
          <div className='latest_product_x'>
            <div className='latest_product'>
              <div className='latest_product_L1'>
                <h2>latest products</h2></div>
              <div className='latest_product_L2'>
                <img src={LatestProduct?.productDetails?.productImage[0]} alt="" />
              </div>
              <div className='latest_product_L3'>
                <h2>{LatestProduct?.productDetails?.productName}</h2>
                <p>Rwf {LatestProduct?.productDetails?.price}</p>
              </div>
            </div>
            <div className='gool'>
              <div className='gool_text'>
                <h3>Top Earning Category</h3>
                <h2><span>{findCategoryWithHighestTotal()?.categoryName}</span></h2>
                <h2><span>{findCategoryWithHighestTotal()?.total}</span><span> Rwf</span></h2>
              </div>

              <div className="pieChart_container" style={{  background: `linear-gradient(90deg, rgba(133,132,198,1) 6.92%, rgba(0, 0, 0, 0.00) 64.36%), url(${findCategoryWithHighestTotal()?.image})`,borderRadius: '20px', }}>
                {/* <img src={findCategoryWithHighestTotal().image} alt="" /> */}
{/* 
                <PieChart width={200} height={150}>
                  <Pie
                    data={data_1}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data_1.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart> */}

              </div>
            </div>
          </div>
        </div>

        <div className='earning_status'>
          <div className='earningbycategory'>
            <div className='popular_product_x_l1'>
              <h1>earning by category</h1>
              <div className='popular_product_x_l1_icon'><HiDotsVertical /></div>
            </div>
            <div className='categories_total'>
              <h1>{SumEarningbyCategoryCount()} Rwf</h1>
            </div>
            <div className='divWithScroll'>
              <table>
                <thead className='allproduct_theader'>
                  <th className='allproduct_theader_th l'>category name</th>
                  <th className='allproduct_theader_th'>total</th>

                </thead>
                <tbody>
                  {GetEarnedbyCategory?.data?.map((item, index) => (
                    <tr key={item.id}>
                      <td className='product_name_td_1'>
                        <div className='product_name_td_1 l'>
                          <div className='product_name_td_img_container'>
                            <img src={item.image} alt="" className='product_name_td_img' />
                          </div>
                          <div>
                            <h1 className='product_name_td_h1'>{item.categoryName}</h1>
                            <p className='product_name_td_p'>{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className='product_name_td_1'>{item.total} Rwf</td>
                    </tr>

                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className=' total_earned'>
            <div className='popular_product_x_l1'>
              <h1>Earning per year</h1>
              <div className='popular_product_x_l1_icon'><HiDotsVertical /></div>
            </div>
            <div className='categories_total'>
              <h1>{SumEarningperMonthCount()} rwf</h1>
            </div>
            <div className='all_total_container'>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={GetEarningPerMonth?.data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalEarnings" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />

                </BarChart>
              </ResponsiveContainer>
              <div className='year_container'>
              <form className='form_year_container' onSubmit={handleSubmit} method='GET'>
      <label htmlFor="yearList">Select a Year:</label>
      <button className='yearList_button' type='submit'><GrFormNextLink /></button>
      <select id="yearList" value={Selected_year} onChange={(e) => setSelected_year(e.target.value)}>
        <option value="" disabled>Select a Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
    </div>
         
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Dashboard_1
