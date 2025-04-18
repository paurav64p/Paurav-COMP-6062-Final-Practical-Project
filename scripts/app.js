const app = Vue.createApp({
  data() 
  {
    return {
      user: {                               // Random user data
        name: '',
        age: '',
        photo: ''
      },

      weatherInput: 
      {                       // Weather input fields
        city: 'London',
        province: 'Ontario',
        country: 'Canada'
      },
      weather: 
      {                            // Weather data result
        temp: '',
        wind: '',
        description: ''
      },

      wordInput: '',                        // Dictionary input
      dictionary: 
      {                         // Dictionary result
        word: '',
        phonetic: '',
        definition: ''
      }
    };
  },

  created() 
  {
    this.getRandomUser();                   // Load user on page load
    this.getWeather();                      // Load weather on page load
  },

  methods: 
  {
    getRandomUser() {
      fetch('https://comp6062.liamstewart.ca/random-user-profile')
        .then(response => response.json())
        .then(data => {
          this.user.name = data.first_name + ' ' + data.last_name;
          this.user.age = data.age;
          this.user.photo = data.profile_picture;
        })
        .catch(error => console.error('User API Error:', error));
    },

    getWeather() 
    {
      const { city, province, country } = this.weatherInput;
      const url = `https://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.weather.temp = data.temperature;
          this.weather.wind = data.wind_speed;
          this.weather.description = data.weather_description;
        })
        .catch(error => console.error('Weather API Error:', error));
    },

    defineWord() 
    {
      fetch(`https://comp6062.liamstewart.ca/define?word=${this.wordInput}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const wordData = data[0];
            this.dictionary.word = wordData.word || 'N/A';
            this.dictionary.phonetic = wordData.phonetic || 'N/A';
            this.dictionary.definition = wordData.definition || 'N/A';
          } else {
            this.dictionary.word = 'Not Found';
            this.dictionary.phonetic = '-';
            this.dictionary.definition = 'No definition available.';
          }
        })
        .catch(error => {
          console.error('Dictionary API Error:', error);
          this.dictionary.word = 'Error';
          this.dictionary.phonetic = '-';
          this.dictionary.definition = 'Could not fetch definition.';
        });
    }
  }
});

app.mount('#app');                         // Mount Vue to DOM
