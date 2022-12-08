import type { NextPage } from 'next'
import { gql, useQuery } from "@apollo/client"; 
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"

const GET_TARJA_PROENEM = gql `
  query MyQuery {
  tarja(where: {idTarja: "123"}) {
    appcupom
    footer
    name
    textCall
  }
}

`
const Home: NextPage = () => {
  const [user, setUsers] =useState()
  useEffect(()=>{
    fetch('/api/proenem')
    .then(res => res.json())
    .then( data => setUsers(data))
  },[])
  return (
  <pre>{JSON.stringify(user)}</pre>
  )
}


export default Home
