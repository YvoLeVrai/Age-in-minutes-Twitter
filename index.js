const config = require('./config');
const twit =  require('twit');

const T = new twit(config.twitter);

let bioText = "Oh oui tu es beau, même dans les pays pauvres | He/Him | a codé @rdmYoutubeBot et @OOCCroute | Agé de ";
let yvoBirthDate = new Date(1997, 5, 19);

let on_heroku = false
if (process.env.ENV === "PROD")
    on_heroku = true

function calculateAgeinMinutes(birthDate)
{
    let today = new Date();
    let diffMs = (today - birthDate);

    return Math.round(diffMs / 60000); // minutes
}

function constructBio(ageInMinutes)
{
    return (bioText + ageInMinutes + " minutes");
}

function updateBio(bio)
{
    T.post('account/update_profile',
        { description: bio },
        function(err, data, response)
        {
            console.log(data)
        })
}

let ageInMinutes = calculateAgeinMinutes(yvoBirthDate);
let newBioText = constructBio(ageInMinutes);
updateBio(newBioText);