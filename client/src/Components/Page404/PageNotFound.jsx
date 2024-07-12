import React from 'react'
import './pagenotfound.css'
import ErrorIcon from "@mui/icons-material/Error"
import {Link} from "react-router-dom"
import { Typography } from "@mui/material";
const PageNotFound = () => {
  return (
    <div className="PageNotFound">
    <ErrorIcon />

    <Typography>Page Not Found </Typography>
    <Link to="/">Home</Link>
  </div>
  )
}

export default PageNotFound
