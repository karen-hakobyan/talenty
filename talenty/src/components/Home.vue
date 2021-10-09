<template>
  <div>
    <h1>{{ template.name }}</h1>

    <div v-for="section in template.sections" :key="section.id">
      <details>
        <summary>{{ section.name }}</summary>

        <div v-for="field in section.fields" :key="field.id">
          <div v-if="field.type === 'text'">
            <label>
              <input type="text" :placeholder="field.name"/>
            </label>
          </div>
          <div v-if="field.type === 'dropdown'">
            <label>
              {{ field.name }}
              <select>
                <option v-for="value in field.details.possibleValues" :key="value">{{ value }}</option>
              </select>
            </label>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import base64 from 'base-64'

export default {
  name: 'Home',
  data() {
    return {
      template: {}
    }
  },
  mounted() {
    let username = 'hr'
    let password = 'hr'

    let headers = new Headers()
    headers.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`)

    fetch('http://localhost:7800/templates/default', {headers})
        .then(response => response.json())
        .then(data => this.$data.template = data)
  }
}
</script>
