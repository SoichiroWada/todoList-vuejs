<template>
  <div class="deleted-list-edit">
    <h1 id="deletedListEditTitle">{{ title }}</h1>
    <h3 id="deletedListEditMessage">{{ message }}</h3>
    <div id="todo-input">
      <form v-on:submit.prevent="UpdateTodoList">
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
        <button id="clear" type="button" v-on:click="clearAllData">{{ clear }}</button>
        <button id="submit" type="submit">{{ submit }}</button>
        <button id="cancelToDeleted" type="button" v-on:click="routingToDeleted">{{ routing }}</button>
      </form>
    </div>

  <table id="todo-table-editview">
    <tr>
      <th id="indexHeader">No</th>
      <th id="itemHeader">item
        <i class="material-icons edit" id="itemDropDown" v-on:click="sortingByItem(0)">arrow_drop_down</i>
        <i class="material-icons edit" id="itemDropUp" v-on:click="sortingByItem(1)">arrow_drop_up</i>
      </th>
      <th id="priorityHeader">priority
        <i class="material-icons edit" id="priorityDropDown" v-on:click="sortingByPriority(0)">arrow_drop_down</i>
        <i class="material-icons edit" id="priorityDropUp" v-on:click="sortingByPriority(1)">arrow_drop_up</i>
      </th>
      <th id="dueHeader">due
        <i class="material-icons edit" id="dueDropDown" v-on:click="sortingByDue(0)">arrow_drop_down</i>
        <i class="material-icons edit" id="dueDropUp" v-on:click="sortingByDue(1)">arrow_drop_up</i>
      </th>
      <th id="createdHeader">created
        <i class="material-icons edit" id="createdDropDown" v-on:click="sortingByCreated(0)">arrow_drop_down</i>
        <i class="material-icons edit" id="createdDropUp" v-on:click="sortingByCreated(1)">arrow_drop_up</i>
      </th>
      <th id="editHeader">edit</th>
      <th id="delHeader">del</th>
    </tr>

    <tr v-for="(todo, index) in todos" v-bind:key="index">
      <td id="index">{{index+1}}</td>
      <td>{{todo.item}}</td>
      <td id="priorityValue"><i class="material-icons star">{{ priorityStars[todo.priority-1] }}</i></td>
      <td id="dueDateAndTime">{{todo.due}}</td>
      <td id ="createdDateAndTime">{{todo.created}}</td>
      <td id="editClick"><i class="material-icons edit">edit</i></td>
      <td id="deleteClick"><i class="material-icons delete">delete</i></td>
    </tr>
  </table>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'deletedListEdit',
  components: {
  },
  data: function(){
    return {
      title: 'Deleted List - Edit Mode',
      clear: 'Clear',
      submit: 'Submit',
      routing: 'Cancel',
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
      message: "Please edit and click Submit button to insert the data into Todo List",
      olddue: null,
      prioritySort: null,
      dueSort: null,
      createdSort: null,
      itemSort: null
    }
  },
  methods: {

    renderTodoLists(){
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
    routingToCompleted(){
      this.$router.push({name:'completedList'});
    },
    routingToDeleted(){
      this.$router.push({name:'deletedList'});
    },
    routingToTodoList(){
      this.$router.push({name:'todoList'});
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

    starsColorClear(){
      this.styleChange1.push({color:this.originalColor});
      this.styleChange2.push({color:this.originalColor});
      this.styleChange3.push({color:this.originalColor});
      this.styleChange4.push({color:this.originalColor});
      this.styleChange5.push({color:this.originalColor});
    },
    clearAllData(){

      this.item = null,
      this.priority = null,
      this.due = null

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
      //console.log('nR:', newReversedDateAndTime);
      return newReversedDateAndTime;
    },

    datePatternChecker (dateValue) {
      var dataDateObjReadable = dateValue.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
      var dataModified = dateValue.match(/\d{4}\s\w{3}\s\d{2}\s\w{2}\s\d{2}:\d{2}/);
      var dataFromDatePicker = dateValue.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\w{1}/);
      if (dataDateObjReadable){
        return 1;
      } 
      else if (dataModified){
        return 2;
      } 
      else if (dataFromDatePicker){
        return 3;
      } 
      else {
        return 4;
      }
    },

    UpdateTodoList(){
        //created
        var today = Date();
        var dateString = today.toString()
        var dateArray = dateString.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
        var newCreated = dateArray[0];
        //due
        //console.log('this.due:',this.due)
        var checker = this.datePatternChecker(this.due)
        //console.log('checker:',checker)

        if (checker === 1){
          //console.log(this.due)
        }
        else if (checker === 2){
          this.due = this.dateFormatRestorer(this.due);
          //console.log('this.due:',this.due)
        }
        else if (checker === 3){
          var duedateEdit = new Date(this.due);
          duedateEdit = duedateEdit.toString();
          var duedateEditArray = duedateEdit.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
          var newDuedate = duedateEditArray[0];
          this.due = newDuedate;
          //console.log('newDuedate:',newDuedate)
        }

      db.collection('todolists').add({
          item: this.item,
          priority: this.priority,
          due: this.due,
          created: newCreated,
          deleted: null
      }).then(() => {
          db.collection('deletedlists').doc(this.id).delete()
            .then(() => {
              console.log("doc is deleted from deletedlists and added to todolists")
            })
          this.clearAllData();
          // this.$router.push({name:'todoList'});
          this.routingToTodoList();
      }).catch(err => {
            console.log(err)
      })

      if ( this.item === null || this.due === null) {
        this.title = "Please fill the data"
      }
    },

    DeleteTodo(todo){
      //input deleted item into deletedlists collection;
      //Generating deleted time to input;
      var today = Date();
      var dateString = today.toString()
      var dateArray = dateString.match(/\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/);
      var deleted = dateArray[0];
      var due = this.dateFormatRestorer(todo.due)
      var created = this.dateFormatRestorer(todo.created)
      //console.log('deleted:',deleted)

      db.collection('deletedlists').add({
        item: todo.item,
        priority: todo.priority,
        due: due,
        created: created,
        deleted: deleted
      }).then(() => {
          //console.log("added into deletedlists !")
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
    //fetch data from the firestore to visualize
    var autoid = this.$route.params.id;
    //console.log('autoid:', autoid)

    db.collection('deletedlists').doc(autoid).get()
    .then((doc) => {

        let todoSingleList = doc.data()
        todoSingleList.id = autoid
        //console.log('todoSingleList.id:', todoSingleList.id)
        //console.log('todoSingleList:', todoSingleList)

        let dueModified = this.dateFormatConverter(todoSingleList.due)
        //console.log('dueModified:', dueModified)

        this.id = todoSingleList.id
        this.item = todoSingleList.item
        this.priority = todoSingleList.priority
        this.due = dueModified
        this.olddue = dueModified
        this.created = todoSingleList.created //created is not shown in Edit Mode;
        //console.log('this.created:', this.created)
        var prindex = Number(this.priority);
        this.clickedStars(prindex);

      }
    )
  },
  /*
  created(){
      let ref = db.collection('todolists').where('id', '==', this.$route.params.id)
      ref.get().then(snapshot => {
          snapshot.forEach(doc => {
              console.log(doc.data())
              this.todo = doc.data()
              this.todo.id = doc.id
          })
      })
  }*/
}
</script>

<style>
#todo-table-editview{
  display: none;
  }
#deletedListEditMessage{
  color: aqua;
}
#deletedListEditTitle{
  color: red;
}
</style>
