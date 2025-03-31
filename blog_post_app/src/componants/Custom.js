import React, { useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import JoditEditor from 'jodit-react';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

function Custom({ blogData, setBlogData }) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [dropdownId, setDropDownId] = useState(null);
  const [viewContentId, setViewContentId] = useState(null);
  const bgColors = ["#d8360028", "#efb70028", "#00d19228"];
  const fontColors = ["#d83600", "#efb700", "#00d192"];

  function clickedEditorBtn(id) {
    (dropdownId === id) ? setDropDownId(null) : setDropDownId(id);
    setViewContentId(null);
    let blogContent = blogData.filter((data) => {
      return data.id == id;
    });
    setContent(blogContent[0].data);
  }

  function contentDone(id) {
    if (content !== "") {
      setBlogData((pre)=>{
       return pre?.map(item => {
          if (item.id === id) {
            return {
              ...item,
              data:content
            }
          } else {
            return item
          }
        })
      })

      setContent("");
      Swal.fire({
        title: "Blog Content Added!",
        icon: "success",
        draggable: true
      });
      setDropDownId(null);
    }
    else {
      Swal.fire({
        title: "Value can not be empty!",
        icon: "error",
        draggable: true
      });
    }
  }

  function deleteBlog(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let newBlogData = blogData.filter((blog) => {
          return blog.id !== id;
        })
        setBlogData(newBlogData);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  function showBlogContent(id) {
    let empty = blogData.find((data) => {
      return data.id == id;
    })
    if (empty.data) {
      (viewContentId === id) ? setViewContentId(null) : setViewContentId(id);
      setDropDownId(null);
    }
    else {
      Swal.fire({
        title: "Content is empty!",
        icon: "warning",
        draggable: true
      });
    }
  }

  return (
    <div className='top-main-div'>
      <div className='main-div'>
        <div className='heading'>
          <div className='heading-text'>Recommended Topics</div>
        </div>
        {
          blogData?.map((item, index) => (
            <div className='content' key={index}>
              <div className='content-view'>
                <div className='first-content-div' onClick={() => showBlogContent(item.id)}>
                  <div className='content-heading'><p className='heading-para'>{item.title}</p></div>
                  <div className='title-keys'>
                    {
                      item?.key.map((key, index) => (
                        <div className='key-value' key={index} style={{
                          backgroundColor: bgColors[index % bgColors.length],
                          color: fontColors[index % fontColors.length],
                          border: `1.5px solid ${fontColors[index % fontColors.length]}`,
                        }} >{key}</div>
                      ))
                    }
                  </div>
                </div>
                <div className='second-content-div'>
                  <div className='action-div'>
                    <div className='action-del-top'>
                      <div className='action-del' onClick={() => deleteBlog(item.id)}><DeleteIcon /></div>
                    </div>
                    <div className='action-edit'>
                      <button type='button' className={`btn-edit ${item.data ? "" : "btn-wrt"}`} onClick={() => clickedEditorBtn(item.id)}>
                        <div className='btn-text txt-edit'> {item.data ? "Edit" : "Write"}</div><div className='dropdown-icon'>{dropdownId === item.id ? <KeyboardArrowDownRoundedIcon /> : <NavigateNextRoundedIcon />} </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`content-editor ${item.id == dropdownId ? "editor-view" : "editor-hide"}`}>
                <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={newContent => setContent(newContent)}
                />
                <div className='btn-editor-div'>
                  <button type='button' className='btn-editor' onClick={() => contentDone(item.id)}>Done</button>
                </div>
              </div>
              <div className={`editor-content-view ${viewContentId == item.id ? "editor-content-show" : "editor-content-hide"}`} dangerouslySetInnerHTML={{ __html: item.data }}></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Custom