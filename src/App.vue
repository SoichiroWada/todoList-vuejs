<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import todoList from '@/components/todoList.vue'

export default {
  name: 'app',
  components: {
    todoList
  }
}
</script>

<style>
body{
    background: #0d1521;
    font-family: tahoma;
    color: #989898;
}

#todo-input{
    position: relative;
    width: 95%;
    border: 2;
    background: #090d13;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
}

#todo-input form:after{
    margin: 0;
    content: '';
    display: block;
    clear: both;
}

input[type="text"]{
    width: 30%;
    padding: 22px;
    background:#181c22;
    border: 0;
    float: left;
    font-size: 20px;
    color: #989898;
}
#item{
    float: left;
    width: 45%;
    margin-right: 5px;
    font-size: 20px;
    padding-top: 10px;
}
#prioritySelector{
    float: left;
    width: 10%;
    margin-right: 0px;
    margin-left: 15px;
    margin-top: -8px;
    margin-bottom: -10px;
    font-size: 24px;
    padding-top:0px;
    padding-top:0px;
    font: white;
    font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
}
#olddue{
    font-size: 16px;
    margin-right: 0px;
    margin-left: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
}
#p-priority{
    margin-right: 2px;
    margin-left: 2px;
    margin-top: 0px;
    margin-bottom: 0px;
}
#p-picked{
    color: turquoise;
    font-size: 32px;
}
#prioritySelector label{
    float: left;
    margin-right: 3px;
    margin-left: 3px;
    margin-bottom: 0px;
    font-size: 20px;
    cursor: pointer;
}
#datetime{
    float: left;
    width: 10%;
    margin-right: 10px;
    margin-left:0px;
    padding-top: 10px;
    color: white;
    font-size: 12px;
}

button{
    padding: 20px;
    float: left;
    background: #23282e;
    border: 2;
    border-color:black;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    margin-left: 2px;
}
#clear{
    width: 6%;
}
#cancel{
    width: 6%;
}
#submit {
    margin-left:2px;
    width: 12%;
}
#routingT {
    margin-left:2px;
    width: 6%;
}
#routingC {
    margin-left:2px;
    width: 6%;
}
#routingD {
    margin-left:2px;
    width: 6%;
}
#routingToTodo {
    margin-left:2px;
    width: 6%;
}
#cancelToDeleted {
    margin-left:2px;
    width: 10%;
}

#feedback {
    font-size: 24px;
    color:turquoise;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
}



#todo-table {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    color: white;
    border-collapse: collapse;
    width: 95%;
    background-color: black;
    margin-left: auto;
    margin-right: auto;
    font-size:16px;
}

#todo-table td, #todo-table th {
    border: 1px solid #ddd;
    padding: 8px;
}

#todo-table tr:nth-child(even){
    background-color: #303030;
    }

#todo-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: green;
    color: white;
    font-size:20px;
}
#todo-table tr:hover {
    color: white;
    background-color: #0c2756;;
}
#indexHeader{
    text-align: center;
    width: 2%;
}
#itemHeader{
    text-align: center;

}
#deletedItemHeader{
    text-align: center;

}
#priorityHeader{
    width: 9%;
    text-align: center;
}
#dueHeader{
    width: 10%;
}
#createdHeader{
    width: 10%;
}
#completedDateHeader{
    width: 10%;
}
#editHeader{
    width: 3%;
}
#doneHeader{
    width: 3%;
}
#delHeader{
    width: 3%;
}
#idHeader{
    width: 11%;
}
#deletedHeader{
    width: 10%;
}
#recoverHeader{
    width: 3%;
}
#deleteHeader{
    width: 3%;
}
#index{
    text-align: center;
}
#dueDateAndTime{
    text-align: right;
}
#createdDateAndTime{
    text-align: right;
}
#deletedDateAndTime{
    text-align: right;
}
#completedDateAndTime{
    text-align: right;
}
#priorityValue{
    text-align: left;
}
#editClick{
    text-align:center;
    cursor: pointer;
}
#doneClick{
    text-align:center;
    cursor: pointer;
}
#recoverClick{
    text-align:center;
    cursor: pointer;
}
#deleteClick{
    text-align:center;
    cursor: pointer;
}
#idValue{
    text-align:right;
}
#createdDropDown{
    vertical-align: -13px;
    margin-right: -12px;
    margin-bottom: -8px;
    cursor: pointer;
}
#createdDropUp{
    vertical-align: 1px;
    margin-left: -12px;
    cursor: pointer;
}
#deletedDropDown{
    vertical-align: -13px;
    margin-right: -12px;
    margin-bottom: -8px;
    cursor: pointer;
}
#deletedDropUp{
    vertical-align: 1px;
    margin-left: -12px;
    cursor: pointer;
}
#itemDropDown{
    vertical-align: -13px;
    margin-right: -12px;
    margin-bottom: -8px;
    cursor: pointer;
}
#itemDropUp{
    vertical-align: 1px;
    margin-left: -12px;
    cursor: pointer;
}
#dueDropDown{
    vertical-align: -13px;
    margin-right: -12px;
    margin-bottom: -8px;
    cursor: pointer;
}
#dueDropUp{
    vertical-align: 1px;
    margin-left: -12px;
    cursor: pointer;
}
#priorityDropDown{
    vertical-align: -13px;
    margin-right: -12px;
    margin-bottom: -8px;
    cursor: pointer;
}
#priorityDropUp{
    vertical-align: 1px;
    margin-left: -12px;
    cursor: pointer;
}
h1{
    background: url() no-repeat center;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 48px;
}
h3{
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 0px;
    margin-left: 0%;
    text-align: center;
    font-size: 24px;
    font-family: tahoma;
    color: lightslategray;
}
#deletedListTitle{
    text-align: center;
    color: red;
}
#completedListTitle{
    text-align: center;
    color: green;
}
#Message{
    margin-top:-44px;
    margin-left: 0%;
    margin-right:0%;
    color: #0d1521;
    font-size:32px;
    text-align: center;
    opacity:0;
}

</style>
