import React, { Component } from 'react'
import axios from "axios"
export default class Todolist extends Component {
  state = {
    list:[],
    username:"",
    age:0
  }
  //组件挂载完毕进行异步请求
  componentDidMount(){
    this.getData()
  }

  getData = ()=>{
    axios.get("http://localhost:4000/list").then(res=>{
      this.setState({
        list:res.data 
      })
    })
  }

  handlechange = e =>{
    // console.log(e.target.id)
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  //添加
  add = ()=>{
    axios.post("http://localhost:4000/list",{
      username:this.state.username,
      age:this.state.age
    }).then(res=>{
      //重新进行后端数据请求
       this.getData()
       //清空输入框的值
       this.setState({
         username:"",
         age:0
       })
      
    })
  }

  //删除
  delete = id=>{
    axios.delete("http://localhost:4000/list/"+id).then(res=>{
      this.getData()
    })
  }

  //修改
  update = ({username,age,id})=>{
    let value = prompt("请输入要修改的值",username+","+age)
    let arr = value.split(",")
    axios.patch("http://localhost:4000/list/"+id,{
      username:arr[0],
      age:arr[1]
    }).then(res=>{
      this.getData()
    })
  }

  //模糊查询
  blur = ()=>{
    let keyword = prompt("请输入查询关键字")
    axios.get("http://localhost:4000/list?username_like="+ keyword)
    .then(res=>{
      if(res.data.length){
        this.setState({list:res.data})
      }else{
        alert("输入关键字有误")
      }
    })
  }
  
  render() {
    let {username,age,list} = this.state
    return (
      <div>
          <input id="username" onChange={this.handlechange} type="text" value={username} placeholder="请输入用户名"/>
          <input id="age" onChange={this.handlechange} type="number" value={age} placeholder="请输入年龄"/>
          <button onClick={this.add}>添加</button>
          <button onClick={this.blur}>查询</button>
          <button onClick={()=>{this.getData()}}>返回</button>
          {
            list.map(item=>{
            return <li key={item.id}>{item.username} -- {item.age}
              <button onClick={this.delete.bind(this,item.id)}>删除</button>
              <button onClick={this.update.bind(this,item)}>修改</button>
            </li>
            })
          }
      </div>
    )
  }
}
