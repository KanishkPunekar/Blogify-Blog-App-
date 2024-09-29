import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../Services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
function CategorySideMenu() {
    const[categories,setCategories] = useState([])
    useEffect(()=>{
        loadAllCategories().then(data=>{
            console.log("loading categories")
            setCategories([...data])
            console.log(data)
        }).catch(error=>{
            console.log(error)
            toast.error("error in loading all categories")
        })
    },[])
  return (
    <div>
        <ListGroup>
            <ListGroupItem tag={Link} to={'/'} action={true} className='border-0'>
                All Blogs
            </ListGroupItem>
            { 
                categories && categories.map((cat,index)=>{
                    return (
                      <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} key={index} action={true} className='border-0 shadow-0 mt-1'>
                        {cat.categoryTitle}
                      </ListGroupItem>
                    );
                })
            }
        </ListGroup>
    </div>
  )
}

export default CategorySideMenu