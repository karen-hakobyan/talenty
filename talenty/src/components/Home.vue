<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
import base64 from 'base-64'

export default {
  name: 'Home',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    let username = 'hr'
    let password = 'hr'

    let headers = new Headers()
    headers.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`)

    fetch('http://localhost:7800/test', {headers})
        .then(response => response.text())
        .then(data => this.$data.message = data)
  }
}
</script>
