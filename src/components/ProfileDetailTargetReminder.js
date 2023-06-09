import '../Styles/LoginForm.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classes from '../context/TargetReminder.module.css'

const ProfileDetailTargetReminder = () => {
  const params = useParams();
  const [data, setdata] = useState([])
  const [book, setbook] = useState([])
  const [mulai, setmulai] = useState([])
  
  const fetchdata = async () => {
    const url = "http://34.72.52.78/book/get-targetreminder?id=" + params.id
    const response = await fetch(url)
    const datas = await response.json()
    setdata(Object.values(datas)[0])
    setmulai(Object.values(datas)[0].start_date.slice(0,10))
    }
  const getBook = async () => {
    const url = "http://34.72.52.78/book/get-book-by-id?id=" + params.idbuku
    const response = await fetch(url)
    const books = await response.json()
    setbook(Object.values(books)[0])
  }

  useEffect(() => {
  fetchdata()
  getBook()
  }, [])


  return (
      <div className={classes.content}>
      <div>
        <h1>Detail Target Membaca</h1>
        <hr></hr>
        <h1>{book.title}</h1>
      <img className={classes.img} src={book.image_url_l} style={{ margin:'5px', padding:'10px'}}></img>
        <h3>Author: {book.author}</h3>
        <h3>Mulai membaca: {mulai}</h3>
        <h3>Target selesai: {data.target_date}</h3>
        {getSelisih(data.target_date)<0 ?<h3>Status: sudah melewati target selesai</h3>:<h3>Sisa waktu membaca: {getSelisih(data.target_date)} hari</h3>}

        <div className={classes.item}>
        <Link to="/profile"><button className="btn btn-secondary">
              Back 
            </button>
            </Link>
        </div>
    </div>
    </div>
  )
}

function getSelisih(selesai){
  let hariini = new Date(getCurrentDate())
  let selesaia = new Date(selesai)
  const diffTime = (selesaia - hariini);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  return diffDays
}

function getCurrentDate(separator='-'){
let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
}

export default ProfileDetailTargetReminder