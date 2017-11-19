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
        <p v-if="loading">Loading data...</p>
        <table class="table" v-else>
          <thead>
            <tr>
              <th><abbr title="Base">B</abbr> \ <abbr title="Quote">Q</abbr></th>
              <th v-for="quoteCurrency in currencies">{{ quoteCurrency }}</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(baseCurrency, i) in currencies">
              <th class="thead">{{ baseCurrency }}</th>
              <td v-for="(quoteCurrency, j) in currencies">{{ tickers[j][i] == undefined ? '-' : tickers[j][i] }}</td>
            </tr>
          </tbody>
        </table>
        <p>Last update: {{ lastUpdateTimestamp }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      currencies: [],
      tickers: [],
      loading: true,
      lastUpdateTimestamp: 0
    }
  },

  mounted() {
    let markets = []

    this.$http.get('https://www.bitstamp.net/api/v2/trading-pairs-info/').then(response => {
      for (const pair of response.data.map(d => d.name.split('/')).sort())
        for (const currency of pair)
          if (this.currencies.indexOf(currency) === -1)
            this.currencies.push(currency)

      markets = response.data.map(d => d.name)

      for (let i in this.currencies) {
        this.tickers.push([])

        for (let _ in this.currencies)
          this.tickers[i].push(undefined)
      }

      const promises = []
      for (const market of markets) {
        const pair = market.split('/')
        const base = pair[0]
        const quote = pair[1]
        const urlSymbol = pair.map(m => m.toLowerCase()).join('')
        // use hourly ticker to bypass missing CORS headers
        promises.push(this.$http.get(`https://www.bitstamp.net/api/v2/ticker_hour/${urlSymbol}/`).then(response => {
          const i = this.currencies.indexOf(quote)
          const j = this.currencies.indexOf(base)
          this.setTicker(i, j, response.data.last)

          // handle specific case for BTC/USD
          const subscription = market === 'BTC/USD' ? 'live_trades' : `live_trades_${urlSymbol}`
          this.$ws.subscribe(subscription).bind('trade', data => {
            this.lastUpdateTimestamp = data.timestamp
            this.setTicker(i, j, data.price)
          })
        }))
      }

      Promise.all(promises).then(_ => {this.loading = false})
    }).catch(error => {
      console.error(error)
    })
  },

  methods: {
    setTicker(i, j, value) {
      this.tickers[i][j] = value
      this.tickers[j][i] = Math.round(1000000 / value) / 1000000
    }
  }
}
</script>

<style>
  html {
    background-image: linear-gradient(to right, #15A14A 0%, #6DA14A 100%)
  }

  .section {
    background-color: white;
    border-radius: 0.5em;
    margin: 2em;
  }

  th, td {
    text-align: center !important;
  }
</style>
