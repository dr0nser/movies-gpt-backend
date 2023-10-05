# MoviesGPT API

## Description

This is the backend for the [MoviesGPT](https://github.com/dr0nser/movies-gpt) app. It does three main things:

- Checks user login details on the server side.
- Gets data from the TMDB API.
- Filters this data and sends only what’s needed to the frontend.

## API Reference

This REST API provides 3 endpoints:

### Endpoint 1: `/banner`

- **URL:** `<DOMAIN_NAME>/api/banner?userId=<LOGGED_IN_USER_ID>`
- **Description:** This route uses `HTTP GET` method to fetch the movie details for the banner video.
  ![MoviesGPT Banner Video](https://drive.google.com/file/d/1QqJ0w5fVGQD4Ff7asvEm2aZYgLRUZj1T/view?usp=drive_link)
- **Request example:**
  ```javascript
  const response = await axios.get(<DOMAIN_NAME>/api/banner?userId=<LOGGED_IN_USER_ID>);
  const bannerVideo = response.data;
  ```
- **Response example:**
  ```json
  {
    "id": 855117,
    "title": "King of Kotha",
    "overview": "Kannan is a gangster who rules the crime-infested town of Kotha. After getting humiliated by Kannan and his men, CI Shahul Haasan tactfully plots the return of former gangster named Kotha Rajendran alias 'Raju', thus leading to a transformative turn of events.",
    "poster_path": "https://image.tmdb.org/t/p/w500/iJv2ROkp55GxiCx9AFECZ2Cj2RJ.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/original/vy2oPrxGndZ14kXgyShPZaPzDQp.jpg",
    "genres": ["Action", "Drama", "Crime"],
    "duration": "2hrs 56mins",
    "release_date": "24th August, 2023",
    "rating": 5.6,
    "total_ratings": 5,
    "trailerUrl": "https://www.youtube.com/embed/ViuGKPazWWw?autoplay=1&mute=1&loop=1&playlist=ViuGKPazWWw&controls=0&showinfo=0&vq=hd1080",
    "logoUrl": "https://image.tmdb.org/t/p/w500/clmzXAoyZlfJnwQwbVcbXwLAsUn.png"
  }
  ```

### Endpoint 2: `/gallery`

- **URL:** `<DOMAIN_NAME>/api/gallery?userId=<LOGGED_IN_USER_ID>`
- **Description:** This route uses `HTTP GET` method to fetch the movie details for different sections. Each section contains a list of movie cards.
  ![Movies Gallery](https://drive.google.com/file/d/1d8He_uEZCEGigyEriFk7JFXicPbVkbTR/view?usp=sharing)
- **Request example:**

  ```javascript
    const response = await axios.get(<DOMAIN_NAME>/api/gallery?userId=<LOGGED_IN_USER_ID>);
    const galleryData = response.data;
  ```

- **Response example:**
  ```json
  [
    {
      "name": "Trending",
      "data": [
        {
          "id": 565770,
          "title": "Blue Beetle",
          "overview": "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
          "poster_path": "https://image.tmdb.org/t/p/w500/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
          "backdropUrl": "https://image.tmdb.org/t/p/original/1syW9SNna38rSl9fnXwc9fP7POW.jpg",
          "genres": ["Action", "Science Fiction", "Adventure"],
          "duration": "2hrs 8mins",
          "release_date": "16th August, 2023",
          "rating": 7.1,
          "total_ratings": 1098,
          "trailerUrl": "https://www.youtube.com/embed/vsBwcxu8bAQ?autoplay=1&mute=1&loop=1&playlist=vsBwcxu8bAQ&controls=0&showinfo=0&vq=hd1080",
          "logoUrl": "https://image.tmdb.org/t/p/w500/zanKFaGoXMI5p22vj4VB3rvM5Eg.png"
        }
      ]
    },
    {
      "name": "Top Rated",
      "data": [
        {
          "id": 278,
          "title": "The Shawshank Redemption",
          "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
          "poster_path": "https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
          "backdropUrl": "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
          "genres": ["Drama", "Crime"],
          "duration": "2hrs 22mins",
          "release_date": "23rd September, 1994",
          "rating": 8.7,
          "total_ratings": 24675,
          "trailerUrl": "https://www.youtube.com/embed/PLl99DlL6b4?autoplay=1&mute=1&loop=1&playlist=PLl99DlL6b4&controls=0&showinfo=0&vq=hd1080",
          "logoUrl": "https://image.tmdb.org/t/p/w500/8pPq3gJG4oWYonbL6DaHslJeCaM.png"
        }
      ]
    },
    {
      "name": "Popular",
      "data": [
        {
          "id": 565770,
          "title": "Blue Beetle",
          "overview": "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
          "poster_path": "https://image.tmdb.org/t/p/w500/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
          "backdropUrl": "https://image.tmdb.org/t/p/original/1syW9SNna38rSl9fnXwc9fP7POW.jpg",
          "genres": ["Action", "Science Fiction", "Adventure"],
          "duration": "2hrs 8mins",
          "release_date": "16th August, 2023",
          "rating": 7.1,
          "total_ratings": 1098,
          "trailerUrl": "https://www.youtube.com/embed/vsBwcxu8bAQ?autoplay=1&mute=1&loop=1&playlist=vsBwcxu8bAQ&controls=0&showinfo=0&vq=hd1080",
          "logoUrl": "https://image.tmdb.org/t/p/w500/zanKFaGoXMI5p22vj4VB3rvM5Eg.png"
        }
      ]
    },
    {
      "name": "Upcoming",
      "data": [
        {
          "id": 893723,
          "title": "PAW Patrol: The Mighty Movie",
          "overview": "A magical meteor crash-lands in Adventure City, gives the PAW Patrol pups superpowers, and transforms them into The Mighty Pups. When the Patrol's archrival Humdinger breaks out of jail and teams up with mad scientist Victoria Vance to steal the powers for themselves, the Mighty Pups must save Adventure City and stop the supervillains before it's too late.",
          "poster_path": "https://image.tmdb.org/t/p/w500/oXnSu4raRAd65QVBQXvdHMC6AuW.jpg",
          "backdropUrl": "https://image.tmdb.org/t/p/original/fwXeTKmJvlv7kbH8QDmbykGfMeK.jpg",
          "genres": [
            "Animation",
            "Family",
            "Comedy",
            "Action",
            "Science Fiction"
          ],
          "duration": "1hr 32mins",
          "release_date": "21st September, 2023",
          "rating": 7.7,
          "total_ratings": 17,
          "trailerUrl": "https://www.youtube.com/embed/oGmq3-muObM?autoplay=1&mute=1&loop=1&playlist=oGmq3-muObM&controls=0&showinfo=0&vq=hd1080",
          "logoUrl": "https://image.tmdb.org/t/p/w500/tt3wElm71xUURXY0Yb1RtsvszHz.png"
        }
      ]
    }
  ]
  ```

### Endpoint 3: `/search`

- **URL:** `<DOMAIN_NAME>/api/search?userId=<LOGGED_IN_USER_ID>&query=<SEACH_QUERY>`
- **Description:** This route takes an additional `query` parameter which is the search query. This query is passed to the **GPT** API to get AI suggested movies. Then, the movie details are fetched from the **TMDB** API and sent to the frontend.
  ![MoviesGPT Search Results](https://drive.google.com/file/d/1BZkO-4NPCgI0mDmCnLRyFBwyo8Fvb4J8/view?usp=sharing)
- **Request example:**
  ```javascript
  const response = await axios.get(<DOMAIN_NAME>/api/search?userId=<LOGGED_IN_USER_ID>&query=<SEACH_QUERY>);
  const searchResults = response.data;
  ```
- **Response example:**
  ```json
  [
    {
      "id": 1726,
      "title": "Iron Man",
      "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
      "poster_path": "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
      "backdropUrl": "https://image.tmdb.org/t/p/original/cyecB7godJ6kNHGONFjUyVN9OX5.jpg",
      "genres": ["Action", "Science Fiction", "Adventure"],
      "duration": "2hrs 6mins",
      "release_date": "30th April, 2008",
      "rating": 7.6,
      "total_ratings": 24882,
      "trailerUrl": "https://www.youtube.com/embed/zLeRp8eGhxo?autoplay=1&mute=1&loop=1&playlist=zLeRp8eGhxo&controls=0&showinfo=0&vq=hd1080",
      "logoUrl": "https://image.tmdb.org/t/p/w500/edNvzs2xp6Fjmoed5nHNVuAb97Z.png"
    }
  ]
  ```

## Local Setup

1. Clone repo
   ```shell
   git clone https://github.com/dr0nser/movies-gpt-backend.git
   ```
2. Open the cloned folder and run **terminal** in root directory.
3. Install dependencies
   ```shell
   npm i
   ```
4. Run the server
   ```shell
   npm start
   ```
5. Server will be running on PORT **5000**. The PORT can be overridden by defining a property `PORT` as environment variable.
