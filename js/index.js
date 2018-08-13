Vue.component('todo-item', {
  props: ['todo'],
  template: '#todo-template',
  methods: {
    removetodo: function (todo) {
      console.log(this.todo);
    }
  }
})


var app7 = new Vue({
  el: '#todo_content',
  data: {
    groceryList: [{
      done: false,
      text: '',
      id: 0
    }],
    user_input: '',
  },
  methods: {
    submit: function () {
      if (this.user_input) {
        this.groceryList.push({
          id: this.groceryList.length,
          text: this.user_input,
          done: false,
        });
        this.user_input = '';
      }
    }
  }

})
