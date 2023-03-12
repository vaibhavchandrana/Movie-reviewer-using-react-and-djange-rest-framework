import React, {useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Reviews = ({ id }) => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false)
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0)
  const [form, setForm] = useState({
    rating: 0,
    comment: ""
  });



  const sendReview = async () => {
    setLoading(true);
    setData([]);
    var error=true
    var token=localStorage.getItem('token')
    try {
      if (token) 
      {
       await axios.post(`https://imdb.up.railway.app/api/${id}/review-create/`,form,{
          headers: {
            'Authorization': `Token ${token}` 
          }
        })
         .then(res => {
            
        if (res.status == 201) 
        {
          error=false;
          swal({
            text: "Review Added Succesfully",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setNewAdded(newAdded+1);
        }
      })
      .catch(
        function (error) {
          console.log('Show error notification!')
          return Promise.reject(error)
        }
      )
      .catch(function(error) {
        console.log(error.response.data.Error);
        // setError(error.response.data.Error); 
        setLoading(false);
      });
    
      if(error==true)
      {
        swal({
          text: "You have reviewed already",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
        setNewAdded(newAdded+1)
      }
    }
    else 
    {
      window.alert("please login");
      navigate('/login')  
    }
    }
    catch (err) {
      swal({
        title: err,
        icon: "error",
        button: false,
        timer: 5000

      })

    }
    setLoading(false);

  }


  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      axios.get(`https://imdb.up.railway.app/api/${id}/review/`)
                .then(res => {
                    const mydata = res.data;
                    setData(mydata)
                })
      setReviewLoading(false);
    }
    getData();
  }, [newAdded])


  
  return (
    <div className='mt-2 py-2 border-t-2 border-gray-700 w-full'>
      <ReactStars
        size={30}
        half={true}
        value={form.rating}
        onChange={(rate) => setForm({ ...form, rating: rate })}
      />
      <input
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        placeholder="Share your thoughts..."
        type="text"
        className="w-full p-2 outline-none bg-gray-600 "
      />
      <button onClick={sendReview} className='bg-red-500 w-full p-1'>
        {loading ? <div className='flex justify-center items-center'><TailSpin height={15} color="white" /> </div> : 'Share'}
      </button>
      {reviewLoading ?
        <div className="mt-6 flex justify-center item-center"><ThreeDots height={20} color="red" /></div> :
        <div>{
          data.map((e, i) => {
            return (
              <div className='p-2 w-full mt-2  border-b border-red-600' key={i}>
                <div className='flex'>
                  <p className='text-red-500 '>{e.review_user}</p>
                  <p className='ml-3 text-xs'>({new Date(e.update).toLocaleString()})</p>
                </div>
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating}
                  edit={false}
                />
                <p>{e.comment}</p>
              </div>
            )
          })}
        </div>

      }
    </div>
  )
}

export default Reviews