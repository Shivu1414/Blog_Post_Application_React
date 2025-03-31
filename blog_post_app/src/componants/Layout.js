import React, {useRef, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogData } from '../BlogData';
import Swal from 'sweetalert2';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

function Layout({blogData, setBlogData}) {
    const [title, setTitle] = useState("");
    const [keys, setKeys] = useState("");
    const [selectedItem, setSelectedItem] = useState('Custom');
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navElements = ['All', 'Custom', 'ICP', 'Mission', 'Product'];
    const navigate = useNavigate();

    const itemClicked = (item) => {
        setSelectedItem(item);
        let navigateValue = item.trim();
        navigateValue = item.toLowerCase();
        navigate(`/${navigateValue}`);
    }

    useEffect(()=>{
        navigate('/custom');
    },[])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    function dropdownVisible(){
        setDropdown(!dropdown);
    }
    
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdown(false);
            setTitle("");
            setKeys("");
        }
    };

    const createBlog = ()=> {
        let filterTitle = title.trim();
        let filterKeys = keys.trim();
        filterTitle = filterTitle.charAt(0).toUpperCase() + filterTitle.substring(1);
        filterKeys = filterKeys.split(" ");

        filterKeys = filterKeys.filter((key)=>{
            if(key.trim() === ""){
                return false;
            }else{
                return key.toLowerCase();
            }
        })

        if(filterTitle && filterKeys.length){
            setBlogData((preBlogData) => [...preBlogData,{
                id : preBlogData[preBlogData.length-1].id +1,
                title : filterTitle,
                key : filterKeys,
                data : ""
            }]);
            setTitle("");
            setKeys("");
            Swal.fire({
                title: "Blog Topic Added!",
                icon: "success",
                draggable: true
            });
        }
        else{
            Swal.fire({
                title: "All fields are required!",
                icon: "error",
                draggable: true
            });
        }
    }

  return (
    <div className='navbar'>
        <div className='nav-text-top'><div className='nav-text'>Categories</div></div>
        <div className="nav-data">
            <div className="nav-first-block">
                <div className='nav-bar'>
                {
                    navElements?.map((item, index) => (
                        <div key={index} 
                        className={`nav-item ${item === selectedItem ? 'highlight' : ''}`} 
                        onClick={() => itemClicked(item)}>{item}</div>
                    ))
                }
                </div>
            </div>
            <div className="nav-second-block">
                <div className='dropdown-field' ref={dropdownRef}>
                    <button className={`nav-dropdown ${selectedItem !== "Custom" ? "btn-disable" : ""}`} onClick={dropdownVisible} disabled={selectedItem !== "Custom"}><div className='btn-text'>Add Topics </div><div className='dropdown-icon'>{ dropdown ? <KeyboardArrowDownRoundedIcon /> : <NavigateNextRoundedIcon/> } </div></button>
                    {
                        dropdown &&  (
                            <div className='dropdown-content'>
                                <div className='dropdown-heading'>Please Enter Data</div>
                                <input type='text' id='blogTitle' placeholder='Topic Name' className='dropdown-input' onChange={(e)=>setTitle(e.target.value)} value={title} />
                                <input type='text' id='blogKeys' placeholder='Key' className='dropdown-input' onChange={(e)=>setKeys(e.target.value)} value={keys} />
                                <button className='btn dropdown-btn' type='button' onClick={createBlog}>Add Topics</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout