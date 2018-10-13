# liri-node-app

This application works similarly to the iPhone's Siri in that, you enter a command and it returns the information requested. Liri's vocabulary is currently limited to four commands. When liri runs, you enter one of the commands, a space and then item you wish to look up. If you enter just the command, a defaut value will be looked up. Below is the list of know commands and the argument they accept.

### concert-this
This command will take an artists name and return a list of concerts the artist has scheduled. Each concert will list the Venue Name, Venue Location and the date of the event. The default artist is `Luke Bryan`. For example entering `liri.js concert-this luke bryan` would return something like this:

    Venue Name: What Makes You Country Tour - XL Stadium Sized
    Venue Location: Detroit, MI
    Event Date: 10/26/2018

### spotify-this-song
This command will take a song name and look up information about the song from the digital music source, Spotify. The Artist, Song Name, Album, and a link to a preview of the song will be displayed. The default song is `The Sign`. For example entering `liri.js spotify-this-song waitin on a woman` would return information like this:

    Artist: Brad Paisley
    Song Name: Waitin' On a Woman
    Song preview: https://p.scdn.co/mp3-preview/0a4fb374f22ad7b44ae9b66cf21b527ce2c40b33?cid=49f02545f3d24d8aa11edf976c40d175
    Album: Time Well Wasted

### movie-this
This command will take a movie title and look up information about the movie from the Open Movie Database. The Title, Release Year, IMDB Rating, Rotten Tomatoes Rating, the country it was produced in, the language, the plot and a list of actors in the movie will be displayed. The default movie is `Mr. Nobody`. For example entering `liri.js movie-this batman` would return information like this:

    Title: Batman
    Release Year: 1989
    IMDB Rating: 7.6/10
    Rotten Tomatoes Rating: 72%
    County produced in: USA, UK
    Language: English, French, Spanish
    Plot: The Dark Knight of Gotham City begins his war on crime with his first major enemy being the clownishly homicidal Joker.
    Actors: Michael Keaton, Jack Nicholson, Kim Basinger, Robert Wuhl

### do-what-it-says
This command will take a file name and run the command listed in the file. The file must contain just one of the command and its approprite argument. The command in the file will be run executed and the approprite output will be displayed. The file `random.txt` is an example of a file this command will run and is the default file name. For example entering `liri.js do-what-it-says random.txt` would run the command in the file.


