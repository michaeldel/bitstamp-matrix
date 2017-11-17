<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">Bitstamp Matrix</h1>
        <p class="subtitle">
          Realtime Bitstamp (crypto)currencies pairs quotes!
        </p>
      </div>
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th><abbr title="Base">B</abbr> \ <abbr title="Quote">Q</abbr></th>
              <th v-for="quoteCurrency in currencies">{{ quoteCurrency }}</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="baseCurrency in currencies">
              <th class="thead">{{ baseCurrency }}</th>
              <td v-for="quoteCurrency in currencies">{{ baseCurrency == quoteCurrency ? '-' : '12.3546' }}</td>
            </tr>
          </tbody>


        </table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      currencies: [
        'BTC', 'LTC', 'ETH', 'XRP', 'USD', 'EUR'
      ]
    }
  }
}
</script>

<style>
  th, td {
    text-align: center !important;
  }
</style>
