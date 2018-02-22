/*
 *  A simple todo list app.
 *
 * Yifeng Liu yl487
 * Wenqian Tong wt57
 */

// visibility filters
var filters = {
    all: function (todos) {
        return todos;
    },
    active: function (todos) {
        return todos.filter(todo => !todo.completed);
    },
    completed: function (todos) {
        return todos.filter(todo => todo.completed);
    }
}

// Define custom filter to correctly pluralize the word
Vue.filter('pluralize', function (n) {
    return n === 1 ? 'item' : 'items';
});

// Example data that represents the list of todo items
var todoList = [
    {
        title: 'Download code',
        completed: false
    },
    {
        title: 'Study code',
        completed: false
    },
    {
        title: 'Finish code',
        completed: false
    }
];

// app Vue instance
var app = new Vue({
    data:{
      newItem:"",
      all:todoList,
      items: todoList,
      selected_all:true,
      selected_active:false,
      selected_complete:false
    },
    methods:{
      formSubmit: function(e){
        e.preventDefault();
        this.all.push({title: this.newItem, completed: false});
        if(this.selected_active){
          this.items.push({title: this.newItem, completed: false});
        }
        this.newItem="";
      },
      remove_item: function(item){
        var index;
        index = this.all.indexOf(item);
        this.all.splice(index, 1);
        if (this.selected_active || this.selected_complete){
          index = this.items.indexOf(item);
          this.items.splice(index, 1);
        }
      },
      toggle: function(item){
        item.completed = !item.completed;
        if(this.selected_active){
          this.items = filters.active(this.items);
        }
        else if(this.selected_complete){
          this.items = filters.completed(this.items);
        }
      },
      remove_completed: function(){
        this.items = filters.active(this.items);
        this.all = this.items;
      },
      show_all:function(){
        this.selected_all = true;
        this.selected_active = false;
        this.selected_complete = false;
        this.items = this.all;
      },
      show_active:function(){
        this.selected_all = false;
        this.selected_active = true;
        this.selected_complete = false;
        this.items = filters.active(this.all)
      },
      show_completed:function(){
        this.selected_all = false;
        this.selected_active = false;
        this.selected_complete = true;
        this.items = filters.completed(this.all);
      }
    }
})

// mount
app.$mount('#todoapp')
