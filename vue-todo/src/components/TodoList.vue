<template>
  <div class="todo">
    <h3>ToDo List</h3>
    <input type="text" placeholder="New Task" v-model="newTask" @keyup.enter="addTask"/>
    <button @click="addTask()">Add</button>
    <ul v-for="(task, index) in tasks" :key="task.id">
      <input type="checkbox" v-model="task.completed" @click="toggleTaskStatus(task)">
      {{task.title}}
      <a class="red" @click="removeTask(index)">X</a>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "TodoList",
    data () {
      return {
        newTask: '',
        tasks:[
          {
            'id':1,
            'title':'Task 1',
            'completed': true
          },
          {
            'id':2,
            'title':'Task 2',
            'completed': true
          },
          {
            'id':3,
            'title':'Task 3',
            'completed': false
          }
        ],
        taskId: 0,
      }
    },
    mounted: function () {
      this.taskId = this.tasks[this.tasks.length-1].id;
    },
    methods:{
      addTask(){
        this.taskId += 1;
        if (this.newTask.trim().length === 0){
          this.newTask = 'Task ' + this.taskId;
        }
        this.tasks.push({
          id:this.taskId,
          title:this.newTask,
          completed: false
        });
        this.newTask='';
      },
      removeTask(index){
        this.tasks.splice(index,1);

      },
      toggleTaskStatus(index){
        this.tasks[index].completed = !this.tasks[index].completed;

      }
    }
  }
</script>

<style scoped>
  h3{
    text-align: center;
  }
  .red{
    color: red;
  }
</style>
