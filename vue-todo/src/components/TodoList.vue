<template>
  <div class="todo">
    <input type="text" placeholder="Neuer Task" v-model="neuerTask" @keyup.enter="addTask"/>

    <div v-for="(task, index) in tasks" :key="task.id">
        <input type="checkbox" v-model="task.erledigt"/>
        {{task.title}}
      <a @click="removeTask(index)" >
       &times;
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      neuerTask: '',
      tasks:[
        {
          'id':1,
          'title':'Task 1',
          'erledigt': false
        },
        {
          'id':2,
          'title':'Task 2',
          'erledigt': false
        }
      ],
      taskId: 3
    }
  },
  methods:{
    addTask(){
      if (this.neuerTask.trim().length === 0){
        return;
      }
      this.tasks.push({
        id:this.taskId,
        title:this.neuerTask,
        erledigt: false
      }),
      this.neuerTask='',
      this.taskId++
    },
    removeTask(index){
      this.tasks.splice(index,1);

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
