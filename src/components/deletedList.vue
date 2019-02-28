<template>
  <div class="deleted-list">
    <h1 id="deletedListTitle" v-bind:style="this.styleChange7">{{ title }}</h1>
    <h3 id="Message" v-bind:style="this.styleChange6">{{ message }}</h3>
    <div id="todo-input">
      <form>
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

        <div id="olddue">{{ olddue }}</div>
        <datetime id="datetime" type="datetime" v-model="due" placeholder="Select due date..."></datetime>
        <button id="clear" type="button" v-on:click="clearAndRender">{{ clear }}</button>
        <button id="submit" type="submit">{{ submit }}</button>
        <button id="routingT" type="button" v-on:click="routingToTodoList">{{ routingT }}</button>
        <button id="routingC" type="button" v-on:click="routingToCompleted">{{ routingC }}</button>
      </form>
    </div>

  <table id="todo-table">
    <tr>
      <th id="indexHeader">No</th>
      <th id="deletedItemHeader">item
        <i class="material-icons edit" id="itemDropDown" v-on:click="sortingByItem(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="itemDropUp" v-on:click="sortingByItem(0)">arrow_drop_up</i>
      </th>
      <th id="priorityHeader">priority
        <i class="material-icons edit" id="priorityDropDown" v-on:click="sortingByPriority(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="priorityDropUp" v-on:click="sortingByPriority(0)">arrow_drop_up</i>
      </th>
      <th id="createdHeader">created
        <i class="material-icons edit" id="createdDropDown" v-on:click="sortingByCreated(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="createdDropUp" v-on:click="sortingByCreated(0)">arrow_drop_up</i>
      </th>
      <th id="dueHeader">due
        <i class="material-icons edit" id="dueDropDown" v-on:click="sortingByDue(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="dueDropUp" v-on:click="sortingByDue(0)">arrow_drop_up</i>
      </th>
      <th id="deletedHeader">deleted
        <i class="material-icons edit" id="deletedDropDown" v-on:click="sortingByDeleted(1)">arrow_drop_down</i>
        <i class="material-icons edit" id="deletedDropUp" v-on:click="sortingByDeleted(0)">arrow_drop_up</i>
      </th>
      <th id="recoverHeader">reuse</th>
      <th id="deleteHeader">delete</th>
    </tr>

    <tr v-for="(todo, index) in todos" v-bind:key="index">
      <td id="index">{{index+1}}</td>
      <td>{{todo.item}}</td>
      <td id="priorityValue"><i class="material-icons star">{{ priorityStars[todo.priority-1] }}</i></td>
      <td id ="createdDateAndTime">{{todo.created}}</td>
      <td id="dueDateAndTime">{{todo.due}}</td>
      <td id ="deletedDateAndTime">{{todo.deleted}}</td>
      <td id="recoverClick"><i class="material-icons autorenew" v-on:mouseenter="exprec" v-on:mouseleave="expout" v-on:click="routingToEditView(todo)">autorenew</i></td>
      <td id="deleteClick"><i class="material-icons delete" v-on:mouseenter="exp" v-on:mouseleave="expout" v-on:click="DeleteTodo(todo)">delete</i></td>
      <!--<td id="idValue">{{todo.id}}</td>-->
    </tr>
  </table>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'deletedList',
  components: {

  },
  data: function(){
    return {
      title: 'Deleted List',
      message: 'You can reuse the data',
      clear: 'Clear',
      submit: 'Submit',
      routingT: 'Todo',
      routingC: 'Done',
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
      olddue: null,
      prioritySort: null,
      dueSort: null,
      createdSort: null,
      itemSort: null
    }
  },
  methods: {
    renderDeletedLists(){
      db.collection('deletedlists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            let todoSingleList = doc.data()
            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);

            todoSingleList.id = doc.id
            this.todos.push(todoSingleList)
          })
        }
      )
    },
    exprec(){
      this.styleChange6.push({color:'turquoise'});
      this.styleChange6.push({opacity:1});
      this.styleChange7.push({color:'#0d1521'});
      this.message = "Click this button to edit and reuse the data !";
    },
    exp(){
      this.styleChange6.push({color:'turquoise'});
      this.styleChange6.push({opacity:1});
      this.styleChange7.push({color:'#0d1521'});
      this.message = "Click this button to delete this row as perfect removal !";
    },
    expout(){
      this.styleChange6.push({color:'#0d1521'});
      this.styleChange6.push({opacity:0});
      this.styleChange7.push({color:'#ff0000'});
      this.message = 'You can reuse the data';
    },
    sortingByItem(value){
      this.clearAllData();
      db.collection('deletedlists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.itemSort = null;
            let todoSingleList = doc.data();
            todoSingleList.itemSort = todoSingleList.item;

            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);
            todoSingleList.deleted = this.dateFormatConverter(todoSingleList.deleted);

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
      db.collection('deletedlists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.createdSort = null;
            let todoSingleList = doc.data();

            let createdTimeObj = new Date(todoSingleList.created);
            let milliTime = createdTimeObj.getTime();
            todoSingleList.createdSort = milliTime;

            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);
            todoSingleList.deleted = this.dateFormatConverter(todoSingleList.deleted);

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
      db.collection('deletedlists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.dueSort = null;
            let todoSingleList = doc.data();

            let dueTimeObj = new Date(todoSingleList.due);
            let milliTime = dueTimeObj.getTime();
            todoSingleList.dueSort = milliTime;

            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);
            todoSingleList.deleted = this.dateFormatConverter(todoSingleList.deleted);

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
      db.collection('deletedlists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.prioritySort = null;
            let todoSingleList = doc.data();
            todoSingleList.prioritySort = Number(todoSingleList.priority);

            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);
            todoSingleList.deleted = this.dateFormatConverter(todoSingleList.deleted);

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
    sortingByDeleted(value){
      this.clearAllData();
      db.collection('deletedlists').get()
      .then(snapshot => {
          snapshot.forEach(doc => {
            this.deletedSort = null;
            let todoSingleList = doc.data();

            let deletedTimeObj = new Date(todoSingleList.deleted);
            let milliTime = deletedTimeObj.getTime();
            todoSingleList.deletedSort = milliTime;

            todoSingleList.due = this.dateFormatConverter(todoSingleList.due);
            todoSingleList.created = this.dateFormatConverter(todoSingleList.created);
            todoSingleList.deleted = this.dateFormatConverter(todoSingleList.deleted);

            todoSingleList.id = doc.id;
            this.todos.push(todoSingleList);
          })
        }
      ).then(() => {
        if (value === 0) {
            this.todos.sort(function (a,b){
            return a.deletedSort - b.deletedSort;
          })
        }
        else if (value === 1){
            this.todos.sort(function (a,b){
            return b.deletedSort - a.deletedSort;
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
      //console.log('todo.id in todoList-vue:',todo.id)
      this.$router.push({name:'deletedListEdit', params: { id: todo.id }});
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
      this.renderDeletedLists();
    },
    starsColorClear(){
      this.styleChange1.push({color:this.originalColor});
      this.styleChange2.push({color:this.originalColor});
      this.styleChange3.push({color:this.originalColor});
      this.styleChange4.push({color:this.originalColor});
      this.styleChange5.push({color:this.originalColor});
    },
    clearAllData(){
      this.title = 'Deleted List',
      this.item = null,
      this.priority = null,
      this.due = null,
      this.created = null,
      this.deleted = null,
      this.id = null,
      this.todos =[],
      this.deletedTodos = [],
      this.starsColorClear()
      this.submit = 'Submit',
      this.clear = 'Clear',
      this.olddue = null;
    },

    AddTodoList(){
      //created;
      var today = Date();
      var dateString = today.toString()
      var dateArray = dateString.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
      this.created = dateArray[0];
      //console.log('this.created:',this.created)
      //console.log('this.id:',this.id)
      //console.log('this.due:',this.due)

      //due;
      var convertedDue = this.dateFormatRestorer(this.due);
      //console.log('convertedDue:',convertedDue)
      var duedate = new Date(convertedDue);
      duedate = duedate.toString();
      var duedateArray = duedate.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
      var newDuedate = duedateArray[0];
      this.due = newDuedate
      this.clear = 'Cancel';
      //priority;
      this.priority = Number(this.priority);
      if (this.priorityNumbers.includes(this.priority) === false) {
        this.priority = 1;
        this.title = "This priority is automatically filled with 1 !";
      }

      db.collection('todolists').add({
        item: this.item,
        priority: this.priority,
        due: this.due,
        created: this.created,
        deleted: null
      })
      .then(() => {

        db.collection('deletedlists').doc(this.id).delete()
          .then(() => {
            // this.renderDeletedLists()
            this.$router.push({name:'todoList'});
        })

      }).catch(err => {
          console.log(err)
      })
    },
    
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

    //convert dateFormatConverter data into date readable format;
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
      return newReversedDateAndTime;
    },

    DeleteTodo(todo){
        db.collection('deletedlists').doc(todo.id).delete()
          .then(() => {
            this.todos = this.todos.filter(todos => {
            return todos.id !== todo.id
          })
        })
      }
    },

  created(){
    //fetch data from the firestore
    db.collection('deletedlists').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
          let deletedList = doc.data()
          deletedList.due = this.dateFormatConverter(deletedList.due);
          deletedList.created = this.dateFormatConverter(deletedList.created)
          deletedList.deleted = this.dateFormatConverter(deletedList.deleted)

          deletedList.id = doc.id
          this.todos.push(deletedList)

        })

      }
    )
  }
}
</script>

<style>

</style>
