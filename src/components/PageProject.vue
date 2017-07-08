<template>
  <div class="page">
    <p class="title">{{id}} - Название проекта</p>
    <p class="description">Описание</p>
    <div class="group tasks">
      <p class="title">Задачи:</p>
      <ul class="list">
        <li v-for="task in tasks">
          <p>{{task.name}}</p>
          <p>Выполняет: Вася Пупкин</p>
          <p>Приоритет: срочно(до 19.19.19)</p>
          <p>Состояние: выполнено</p>
        </li>
      </ul>
    </div>
    <div class="group files">
      <p class="title">Последние изменения:</p>
      <ul class="list">
        <li v-for="task in tasks">
          <p>{{task.name}}</p>
          <p>13:14 12.12.2014</p>
          <p>Схема asd/asfasf/asf</p>
          <p>Схема asd/asf</p>
          <p>Схема asd/asfasf</p>
          <p>Схема asd</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-project',
  props: ['id'],
  data () {
    return {
      search: null,
      tasks: [
        {
          id: 1,
          name: 'Task1: A asfdasf'
        },
        {
          id: 1,
          name: 'Task2: A asfdasf'
        },
        {
          id: 1,
          name: 'Task3: A asfdasf'
        },
        {
          id: 1,
          name: 'Task4: A asfdasf'
        }
      ]
    }
  }
}
</script>
<style scoped>
.page {
  width: 100%;
  padding: 15px;
  color: #BBB;
  overflow-y: scroll;
}
.title {
  margin: 0;
  font-size: 18pt;
}
.description {
  margin: 15px 0;
  font-size: 12pt;
  color: #999;
}
.list {
  padding: 0;
}
.list li {
  list-style-type: none;
}

.tasks {

}
</style>
