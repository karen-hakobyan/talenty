<template>
  <div>
    <h1>{{ template.name }}</h1>

    <div v-for="section in template.fields" :key="section.id">
      <details>
        <summary>{{ section.name }}</summary>

        <div v-for="field in section.fields" :key="field.id">
          <div v-if="field.metadata.type === 'section'">
            <div v-for="sec_field in field.fields" :key="sec_field.id">
              {{sec_field.name}}
              <div v-if="sec_field.metadata.required">
                <input type="checkbox" checked>
              </div>
            </div>
          </div>
          <div v-else>
            {{ field.name }}<br>
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

    fetch('http://localhost:7800/templates/system')
        .then(response => response.json())
        .then(data => this.$data.template = data)
  }
}
</script>
