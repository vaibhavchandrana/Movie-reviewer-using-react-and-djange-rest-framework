import React, { useState, useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddMovie = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [form, setForm] = useState(
        {
            name: "",
            year: 0,
            storyline: "",
            imageurl: "",
            plateform:1

        }
    )
    const [loading, setLoading] = useState(false);

    const addMovie = async () => {
        {
            var error=true;
            var token=localStorage.getItem('token')
            try {
                if(!token) {
                    window.alert("please login");
                    navigate('/login')
                }
                else
                {
                    setLoading(true);
                    console.log(form)
                    await axios.post('https://imdb.up.railway.app/api/movielist/', form)
                        .then(res => {
                            if (res.data.name) {
                                error = false;
                                swal({
                                    text: "Sucessfully added",
                                    icon: "success",
                                    buttons: false,
                                    timer: 3000,
                                });
                                setLoading(false)
                                setForm({
                                    name: "",
                                    year: "",
                                    storyline: "",
                                    imageurl: "",
                                    plateform:1
                                });
                                navigate('/addmovie');
                            }
                        })
                        if(error)
                        {
                            swal({
                                text: "Please enter detail correctly",
                                icon: "error",
                                buttons: false,
                                timer: 3000,
                            });
                            setLoading(false)

                        }
                    
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
        }

        setLoading(false)
    }
    useEffect(() => {
        async function getData() {
            axios.get(`https://imdb.up.railway.app/api/plateform/`)
                .then(res => {
                    const mydata = res.data;
                    setData(mydata)
                })
        }
        getData();
    }, [])


    return (
        <div>
            <section class="text-black-600 body-font relative">
                <div class="container px-5 py-16 mx-auto">
                    <div class="flex flex-col text-center w-full mb-4">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">Add New Movie</h1>
                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-white-600">Name</label>
                                    <input
                                       required
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        class="w-full bg-white-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-white-600">Year</label>
                                    <input
                                    required
                                        type="number"
                                        id="email"
                                        name="email"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                                        class="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-white-600">Image Link</label>
                                    <input
                                    required
                                        id="message"
                                        name="message"
                                        value={form.imageurl}
                                        onChange={(e) => setForm({ ...form, imageurl: e.target.value })}
                                        class="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-white-600">Description</label>
                                    <textarea
                                    required
                                        id="message"
                                        name="message"
                                        value={form.storyline}
                                        onChange={(e) => setForm({ ...form, storyline: e.target.value })}
                                        class="w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-white-600">Select Plateform</label>
                                    <select className='w-full bg-white-100 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'>
                                        {data.map((e, i) => {
                                            return (
                                                <option key={i}
                                                value={e.id}
                                                    onChange={(e) => setForm({...form,plateform: e.target.value })}
                                                    >
                                                    {e.name}
                                                </option>
                                            )
                                        }
                                        )
                                        }
                                    </select>

                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={addMovie} class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-400 rounded text-lg">

                                    {loading ? <TailSpin height={25} color="white" /> : 'Submit'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddMovie