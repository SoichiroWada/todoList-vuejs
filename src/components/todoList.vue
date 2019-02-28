<template>
  <div class="todo-list">
    <h1>{{ title }}</h1>
    <h3>{{ message }}</h3>
    <div id="todo-input">
      <form v-on:submit.prevent="AddTodoList">
        <input id="item" type="text" v-model="item" placeholder="Add new item...">

        <div id="prioritySelector">
          <p id="p-priority">Priority: <span id="p-picked">{{priority}}</span></p>
          <input type="radio" id="one" value="1" v-model="priority">
          <label for="one"><i class="material-icons star" id="star1" v-on:click="clickedStars(1)" v-bind:style="this.styleChange1">star</i></label>
          <input type="radio" id="two" value="2" v-model="priority">
          <label for="two"><i class="material-icons star" id="star2" v-on:click="clickedStars(2)" v-bind:style="this.styleChange2">star</i></label>
          <input type="radio" id="three" value="3" v-model="priority">
          <label for="three"><i class="material-icons star" id="star3" v-on:click="clickedStars(3)" v-bind:style="this.styleChange3">star</i></label>
          <input type="radio" id="four" value="4" v-model="priority">
          <label for="four"><i class="material-icons star" id="star4" v-on:click="clickedStars(4)" v-bind:style="this.styleChange4">star</i></label>
          <input type="radio" id="five" value="5" v-model="priority">
          <label for="five"><i class="material-icons star" id="star5" v-on:click="clickedStars(5)" v-bind:style="this.styleChange5">star</i></label>
        </div>

        <div id="olddue" v-bind:style="this.styleChange6">{{ olddue }}</div>
        <datetime id="datetime" type="datetime" v-model="due" placeholder="Select due date..." format="yyyy MMM dd a hh:mm"></datetime>
        <button id="clear" type="button" v-on:click="clearAndRender">Clear</button>
        <button id="submit" type="submit">Submit</button>
        <button id="routingC" type="button" v-on:click="routingToCompleted">Done</button>
        <button id="routingD" type="button" v-on:click="routingToDeleted">Deleted</button>
      </form>
    </div>

  <table id="todo-table">
    <tr>
      <th id="indexHeader">No</th>
      <th id="itemHeader">item
        <i class="material-icons edit" id="itemDropDown" v-on:click="sortingByItem(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="itemDropUp" v-on:click="sortingByItem(0)">arrow_drop_up</i>
      </th>
      <th id="doneHeader">done</th>
      <th id="priorityHeader">priority
        <i class="material-icons edit" id="priorityDropDown" v-on:click="sortingByPriority(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="priorityDropUp" v-on:click="sortingByPriority(0)">arrow_drop_up</i>
      </th>
      <th id="dueHeader">due
        <i class="material-icons edit" id="dueDropDown" v-on:click="sortingByDue(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="dueDropUp" v-on:click="sortingByDue(0)">arrow_drop_up</i>
      </th>
      <th id="createdHeader">created
        <i class="material-icons edit" id="createdDropDown" v-on:click="sortingByCreated(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="createdDropUp" v-on:click="sortingByCreated(0)">arrow_drop_up</i>
      </th>
      <th id="editHeader">edit</th>
      <th id="delHeader">del</th>
      <!--<th id="idHeader">id</th>-->
    </tr>

    <tr v-for="(todo, index) in todos" v-bind:key="index">
      <td id="index">{{index+1}}</td>
      <td>{{todo.item}}</td>
      <td id="doneClick"><i class="material-icons done_outline" v-on:click="CompletedTodo(todo)">done_outline</i></td>
      <td id="priorityValue"><i class="material-icons star">{{ priorityStars[todo.priority-1] }}</i></td>
      <td id="dueDateAndTime">{{todo.due}}</td>
      <td id ="createdDateAndTime">{{todo.created}}</td>
      <td id="editClick"><i class="material-icons edit" v-on:click="routingToEditView(todo)">edit</i></td>
      <td id="deleteClick"><i class="material-icons delete" v-on:click="DeleteTodo(todo)">delete</i></td>
    </tr>
  </table>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'todoList',
  components: {
  },
  data: function(){
    return {
      title: 'Todo List',
      priorityNumbers: [1,2,3,4,5],
      originalColor:'#989898',
      activeColor:'gold',
      styleChange1:[],
      styleChange2:[],
      styleChange3:[],
      styleChange4:[],
      styleChange5:[],
      styleChange6:[],
      styleChange7:[],
      priorityStars: [
        'star',
        'star star',
        'star star star',
        'star star star star',
        'star star star star star'
      ],
      id: null,
      item: null,
      priority: null,
      due: null,
      created: null,
      deleted: null,
      todos:[],
      deletedTodos:[],
      editMode:0, //0 is for no editMode, 1 is for editMode
      message: null,
      olddue: null,
      prioritySort: null,
      dueSort: null,
      createdSort: null,
      itemSort: null
    }
  },
  methods: {

    renderTodoLists(){
      db.collection('todolists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            let todoSingleList = doc.data()
            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);

            todoSingleList.id = doc.id
            this.todos.push(todoSingleList)
          })
          this.sortingByCreated(1)
        }
      )
    },
    sortingByItem(value){
      this.clearAllData();
      db.collection('todolists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.itemSort = null;
            let todoSingleList = doc.data();
            todoSingleList.itemSort = todoSingleList.item;

            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);

            todoSingleList.id = doc.id;
            this.todos.push(todoSingleList);
          })
        }
      ).then(() => {
        if (value === 0) {

          this.todos.sort(function(a, b) {
            var itemSortA = a.itemSort.toUpperCase(); // ignore upper and lowercase
            var itemSortB = b.itemSort.toUpperCase(); // ignore upper and lowercase
            if (itemSortA < itemSortB) {
              return -1;
            }
            if (itemSortA > itemSortB) {
              return 1;
            }
            // names must be equal
            return 0;
          });

        } 
        else if (value === 1){
          this.todos.sort(function(a, b) {
            var itemSortA = a.itemSort.toUpperCase(); // ignore upper and lowercase
            var itemSortB = b.itemSort.toUpperCase(); // ignore upper and lowercase
            if (itemSortA < itemSortB) {
              return 1;
            }
            if (itemSortA > itemSortB) {
              return -1;
            }
            // names must be equal
            return 0;
          });

        }
      })
    },
    sortingByCreated(value){
      this.clearAllData();
      db.collection('todolists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.createdSort = null;
            let todoSingleList = doc.data();

            let createdTimeObj = new Date(todoSingleList.created);
            let milliTime = createdTimeObj.getTime();
            todoSingleList.createdSort = milliTime;

            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);

            todoSingleList.id = doc.id;
            this.todos.push(todoSingleList);
          })
        }
      ).then(() => {
        if (value === 0) {
            this.todos.sort(function (a,b){
            return a.createdSort - b.createdSort;
          })
        } 
        else if (value === 1){
            this.todos.sort(function (a,b){
            return b.createdSort - a.createdSort;
        })
        }
      })
    },
    sortingByDue(value){
      this.clearAllData();
      db.collection('todolists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.dueSort = null;
            let todoSingleList = doc.data();

            let dueTimeObj = new Date(todoSingleList.due);
            let milliTime = dueTimeObj.getTime();
            todoSingleList.dueSort = milliTime;
            
            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);

            todoSingleList.id = doc.id;
            this.todos.push(todoSingleList);
          })
        }
      ).then(() => {
        if (value === 0) {
            this.todos.sort(function (a,b){
            return a.dueSort - b.dueSort;
          })
        } 
        else if (value === 1){
            this.todos.sort(function (a,b){
            return b.dueSort - a.dueSort;
        })
        }
      })
    },
    sortingByPriority(value){
      this.clearAllData();
      db.collection('todolists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.prioritySort = null;
            let todoSingleList = doc.data();
            todoSingleList.prioritySort = Number(todoSingleList.priority);

            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);

            todoSingleList.id = doc.id;
            this.todos.push(todoSingleList);
          })
        }
      ).then(() => {
        if (value === 0) {
            this.todos.sort(function (a,b){
            return a.prioritySort - b.prioritySort;
          })
        } 
        else if (value === 1){
            this.todos.sort(function (a,b){
            return b.prioritySort - a.prioritySort;
        })
        }
      })
    },
    routingToCompleted(){
      this.$router.push({name:'completedList'});
    },
    routingToDeleted(){
      this.$router.push({name:'deletedList'});
    },
    routingToTodoList(){
      this.$router.push({name:'todoList'});
    },
    routingToEditView(todo){
      // console.log('todo.id in todoList-vue:',todo.id)
      this.$router.push({name:'editView', params: { id: todo.id }});
    },
    clickedStars(value){
      // console.log(value)
      switch (true) {
        case value === 1:
          this.starsColorClear();
          this.styleChange1.push({color:this.activeColor});
          break;
        case value === 2:
          this.starsColorClear();
          this.styleChange1.push({color:this.activeColor});
          this.styleChange2.push({color:this.activeColor});
          break;
        case value === 3:
          this.starsColorClear();
          this.styleChange1.push({color:this.activeColor});
          this.styleChange2.push({color:this.activeColor});
          this.styleChange3.push({color:this.activeColor});
          break;
        case value === 4:
          this.starsColorClear();
          this.styleChange1.push({color:this.activeColor});
          this.styleChange2.push({color:this.activeColor});
          this.styleChange3.push({color:this.activeColor});
          this.styleChange4.push({color:this.activeColor});
          break;
        case value === 5:
          this.starsColorClear();
          this.styleChange1.push({color:this.activeColor});
          this.styleChange2.push({color:this.activeColor});
          this.styleChange3.push({color:this.activeColor});
          this.styleChange4.push({color:this.activeColor});
          this.styleChange5.push({color:this.activeColor});
          break;
      }
    },
    clearAndRender(){
      this.clearAllData();
      this.renderTodoLists();
    },
    starsColorClear(){
      this.styleChange1.push({color:this.originalColor});
      this.styleChange2.push({color:this.originalColor});
      this.styleChange3.push({color:this.originalColor});
      this.styleChange4.push({color:this.originalColor});
      this.styleChange5.push({color:this.originalColor});
    },
    editDataClear(){
      this.item = null,
      this.priority = null,
      this.due = null
    },

    clearAllData(){
      this.title = 'Todo List',
      this.item = null,
      this.priority = null,
      this.due = null,
      this.created = null,
      this.deleted = null,
      this.id = null,
      this.todos =[],
      this.deletedTodos = [],
      this.message = null,
      this.starsColorClear()
      this.olddue = null;
    },

    //date converter
    dateFormatConverter(dateValue){
      var newDate = new Date(dateValue);
      var year = newDate.getFullYear();
      var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      var monthName = months[newDate.getMonth()];
      var date = newDate.getDate();
      var hours = newDate.getHours();
      var hoursText;
      var hours12;

      if (hours >= 12) {
        hours12 = hours - 12;
        if (hours12 < 10) {
          hoursText = 'PM'+' '+'0'+hours12;
        } else {
          hoursText = 'PM'+' '+hours12;
        }
      } 
      else if (hours < 12) {
        hours12 = hours;
        if (hours12 < 10) {
          hoursText = 'AM'+' '+0+hours12;
        } else {
          hoursText = 'AM'+' '+hours12;
        }
      }

      var minutes = newDate.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      if (date < 10){
        date = '0' + date;
      }

      var time = hoursText + ':' + minutes;
      var fullNewFormatDate = year + ' ' + monthName + ' ' + date + ' ' + time;
      // console.log('fullNewFormatDate:', fullNewFormatDate)
      return fullNewFormatDate;
    },

    //convert dateGen data into date readable format;
    dateFormatRestorer (dateValue) {
      var AMPMtime = dateValue.match(/\w{2}\s\d{2}:\d{2}/);
      var AMPMtimeString = AMPMtime[0];
      var reversedTime = '';
      if ( AMPMtimeString.charAt(0) === "A") {
        var firstHalfAM = dateValue.match(/\d{4}\s\w{3}\s\d{2}\s/);
        var firstHalfAMString = firstHalfAM[0];
        var laterHalfAM = dateValue.match(/\d{2}:\d{2}/);
        var laterHalfAMString = laterHalfAM[0];
        reversedTime = firstHalfAMString + laterHalfAMString;
      }
      else if ( AMPMtimeString.charAt(0) === "P" ){
        var firstHalf = dateValue.match(/\d{4}\s\w{3}\s\d{2}\s/);
        var firstHalfString = firstHalf[0];
        var laterHalf = dateValue.match(/\d{2}:\d{2}/);
        var laterHalfString = laterHalf[0];
        var laterHalfStringSliced1 = laterHalfString.slice(0,2);
        var laterHalfStringSliced2 = laterHalfString.slice(2,5);
        var lhssNumbered = Number(laterHalfStringSliced1);
        var adjustedNumber = lhssNumbered + 12;
        var convertedString = adjustedNumber.toString(10);
        var laterHalfStringAdjusted = convertedString + laterHalfStringSliced2;
        reversedTime = firstHalfString + laterHalfStringAdjusted;
      }
      var newReversedDate = new Date(reversedTime);
      var dateString = newReversedDate.toString()
      var dateArray = dateString.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
      var newReversedDateAndTime = dateArray[0];
      // console.log('nR:', newReversedDateAndTime);
      return newReversedDateAndTime;
    },

    AddTodoList(){
      //add new item
      if ( this.item !== null && this.due !== null ) {
        //created
        var today = Date();
        var dateString = today.toString()
        var dateArray = dateString.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
        var created = dateArray[0];

        //due
        var duedate = new Date(this.due);
        duedate = duedate.toString();
        var duedateArray = duedate.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
        duedate = duedateArray[0];

        //priority
        this.priority = Number(this.priority);

        if (this.priorityNumbers.includes(this.priority) === false) {
          this.priority = 1;
          this.title = "This priority is automatically filled with 1 !";
        }
        
        db.collection('todolists').add({
          item: this.item,
          priority: this.priority,
          due: duedate,
          created: created,
          deleted: null
        })
        .then(() => {
          this.clearAllData();
          this.renderTodoLists();
        }).catch(err => {
            console.log(err)
        })
      }
      else if ( this.item === null || this.due === null) {
        this.title = "Please fill the data"
      }
    },

    CompletedTodo(todo){
      //input deleted item into deletedlists collection;
      //Generating deleted time to input;
      var today = Date();
      var dateString = today.toString()
      var dateArray = dateString.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
      const completed = dateArray[0];
      // console.log('completed:',completed)
      const due = this.dateFormatRestorer(todo.due)
      const created = this.dateFormatRestorer(todo.created)

      db.collection('completedlists').add({
        item: todo.item,
        priority: todo.priority,
        due: due,
        created: created,
        completed: completed
      }).then(() => {
          // console.log("added into deletedlists !")
          db.collection('todolists').doc(todo.id).delete()
            .then(() => {
              this.todos = this.todos.filter(todos => {
              return todos.id !== todo.id
            })
          })
      })
    },

    DeleteTodo(todo){
      //input deleted item into deletedlists collection;
      //Generating deleted time to input;
      var today = Date();
      var dateString = today.toString()
      var dateArray = dateString.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
      const deleted = dateArray[0];
      const due = this.dateFormatRestorer(todo.due)
      const created = this.dateFormatRestorer(todo.created)
      // console.log('deleted:',deleted)

      db.collection('deletedlists').add({
        item: todo.item,
        priority: todo.priority,
        due: due,
        created: created,
        deleted: deleted
      }).then(() => {
          // console.log("added into deletedlists !")
          db.collection('todolists').doc(todo.id).delete()
            .then(() => {
              this.todos = this.todos.filter(todos => {
              return todos.id !== todo.id
            })
          })
      })
    }

  },

  created(){
    this.todos = [];
    //fetch data from the firestore
    db.collection('todolists').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
          let todoList = doc.data()
          // console.log("todoList:", todoList)
          // console.log("doc.id:", doc.id)
          todoList.id = doc.id
          todoList.due = this.dateFormatConverter(todoList.due);
          todoList.created = this.dateFormatConverter(todoList.created)
          this.todos.push(todoList)
          // console.log("this.todos:", this.todos)
        })
        this.sortingByCreated(1)
      }
    )
  }
}
</script>

<style>


</style>
