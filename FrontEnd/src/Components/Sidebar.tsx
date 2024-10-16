import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import Categories from './Categories';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Note {
    category: string;
    title: string;
    description: string; 
}

function Sidebar() {
    const [categs, setCategs] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('/api/notes'); 
                setCategs(response.data);
            } catch (error: any) {
                console.log(error);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div className='bg-[#013536] text-white w-[300px] h-[100vh]'>
            <div className='flex pl-3 pt-[30px]'>
                <img src={logo} style={{ height: "70px" }} alt="Logo" />
                <h1 className='font-serif text-4xl pt-4 text-black font-extrabold'>NOTTI</h1>
            </div>
            <div className='flex pl-5 pt-[50px] pb-[20px] hover:cursor-pointer hover:text-[#9B7A6A]'>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="35px" 
                    viewBox="0 -960 960 960" 
                    width="40px" 
                    fill="#B39C8E"
                    className="hover:fill-[#9B7A6A]"
                >
                    <path d="M186.67-120q-27.5 0-47.09-19.58Q120-159.17 120-186.67v-586.66q0-27.5 19.58-47.09Q159.17-840 186.67-840h586.66q27.5 0 47.09 19.58Q840-800.83 840-773.33v308.66q-15.67-8.33-32.67-13.83t-34-8.5v-286.33H186.67v586.66h286.66q3.67 18 9.19 34.79 5.51 16.78 13.15 31.88h-309Zm0-111.33v44.66-586.66V-487v-3.67V-231.33ZM280-280h195q3.67-17.67 9.17-34.33 5.5-16.67 13.5-32.34H280V-280Zm0-166.67h310.67q20-14.66 41.83-24.33 21.83-9.67 47.5-14.67v-27.66H280v66.66Zm0-166.66h400V-680H280v66.67ZM728.33-40.67q-79.33 0-135.5-56.5-56.16-56.5-56.16-134.83 0-79.96 56.16-136.31 56.16-56.36 135.84-56.36 79 0 135.5 56.36 56.5 56.35 56.5 136.31 0 78.33-56.5 134.83-56.5 56.5-135.84 56.5ZM712-107.33h35.33V-214H854v-35.33H747.33V-356H712v106.67H605.33V-214H712v106.67Z"/>
                </svg>
                <Link to="/CreateNote" className='text-[#B39C8E] underline font-mono font-semibold text-2xl hover:text-[#9B7A6A]'>Create Note</Link>
            </div>
            <div className='pl-6 pt-[20px] pb-[20px]'>
                <h3 className='text-gray-400 font-mono font-semibold text-2xl'>⦿ Your Notes</h3>
            </div>
            <div>
                <div>
                    {/* {categs.map((item) => (
                        <Categories categs={item.category}/>
                    ))} */}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
