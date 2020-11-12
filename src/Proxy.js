import React, { Component } from 'react'
import axios from "axios"
export default class Proxy extends Component {

  componentDidMount(){
    // axios.get("https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=176511",{
    //   headers:{
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1603709737388153374408706","bc":"110100"}',
    //     'X-Host': 'mall.film-ticket.film.list'
    //   }
    // }).then(res=>{
    //   console.log(res)
    // })

    axios.get("/api/db/in_theaters").then(res=>{
      console.log(res.data)
    })
  }

  render() {
    return (
      <div>
        Proxy
      </div>
    )
  }
}
