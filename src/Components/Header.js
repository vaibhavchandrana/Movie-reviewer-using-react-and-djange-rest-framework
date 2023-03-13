import React, { useEffect, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Header = () => {
    const [token,setToken]=useState(localStorage.getItem('token'))
    useEffect(() => {
         function getData() {
            setToken(localStorage.getItem('token'))
        }
        window.addEventListener('storage', getData)
        return () => {
            window.removeEventListener('storage', getData)
        }
      },[])
    

    return (
        <div className='text-lg sm:text-3xl flex flex-wrap items-center justify-between text-red-500 font-bold p-3 border-b-2 border-gray-500'>
            <Link to="/" ><span> Movie<span className='text-white'>Reviewer</span></span>
            </Link>
            {
                token?
                <Link to="/addmovie"><h1 className='text-lg cursor-pointer flex items-center'>
                    <Button >
                        <AddBoxIcon className='text-lg sm:text-xl'> </AddBoxIcon>
                        Add Movie
                    </Button>
                </h1>
                </Link>
                :
                <Link to="/login"><h1 className='text-lg text-white bg-red-500 cursor-pointer flex items-center'>
                    <Button >
                       <p className='text-white'> Login</p>
                    </Button>
                </h1>
                </Link>

            }
        </div>
    )
}

export default Header