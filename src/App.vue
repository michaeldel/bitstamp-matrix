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
            <tr v-for="(baseCurrency, i) in currencies">
              <th class="thead">{{ baseCurrency }}</th>
              <td v-for="(quoteCurrency, j) in currencies">{{ tickers[i][j] == undefined ? '-' : tickers[i][j] }}</td>
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
      currencies: ['BTC', 'LTC', 'ETH', 'XRP', 'USD', 'EUR'],
      tickers: []
    }
  },

  beforeMount() {
    for (let i in this.currencies) {
      this.tickers.push([])
      for (let _ in this.currencies)
        this.tickers[i].push(undefined)
    }

    for (let i = 0; i < this.currencies.length; i++)
      for (let j = i + 1; j < this.currencies.length; j++)
        this.setTicker(i, j, 20 * Math.random())
  },

  methods: {
    setTicker(i, j, value) {
      this.tickers[i][j] = Math.round(10000 * value) / 10000
      this.tickers[j][i] = Math.round(10000 / value) / 10000
    }
  }
}
</script>

<style>
  th, td {
    text-align: center !important;
  }
</style>
