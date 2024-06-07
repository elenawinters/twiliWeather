CurrentConditions = {
    lastWeather: 'CLEAR',
    currentWeather: 'CLOUDS',
    snowEnabled: false,
    rainLevel: -1,
}

const update_freq_min = 1000 * 60 * 11
const update_freq_max = 1000 * 60 * 20
let weather_progress_thread = null

// const update_freq_min = 1000 * 30
// const update_freq_max = 1000 * 60 * 2

// only keep 10 weather changes in advance. forecast is indirectly related to what will happen.
// there is a chance this will happen, a rather large chance, but it's never 100%
Forecast = {}
// host = GetHostId();

// console.log(GetHostId());

typelist = [
    'BLIZZARD', 'CLEAR', 'CLEARING', 'CLOUDS', 'EXTRASUNNY', 'FOGGY', 'HALLOWEEN',
    'NEUTRAL', 'OVERCAST', 'RAIN', 'SMOG', 'SNOW', 'SNOWLIGHT', 'THUNDER', 'XMAS'
]

wtypes = {}

typelist.forEach((val) => {
    wtypes[GetHashKey(val)] = val
})


// c2 = mix 1
// c3 = mix 2
// c4 = next
// c3 and c4 should be the same unless a new weather is being transitioned to.
// if c3 and c4 are the same, and you wish to set new next, set mix progress to 99%
// this will ensure that the weather event will happen like right now
function updateWeatherState() {
    // CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.currentWeather].sample()
    CurrentConditions.lastWeather = CurrentConditions.currentWeather
    CurrentConditions.currentWeather = weatherPossibilities[CurrentConditions.currentWeather].sample()
    // console.log([c1, c2, c3, c4])
    // This is so fucking cursed
    // CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    // if (c2 == CurrentConditions.weatherMix1 && c3 == CurrentConditions.weatherMix2 && c4 == CurrentConditions.upcomingWeather) {
    //     if (c3 == c2 && c4 == c2) {
    //         CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    //     }
    //     // current = CurrentConditions.weatherMix1
    //     return;
    // }
    // console.log(CurrentConditions.upcomingWeather)
    // c1 = current
    // c2 = CurrentConditions.weatherMix1
    // c3 = CurrentConditions.weatherMix2
    // c4 = CurrentConditions.upcomingWeather
    // console.log([c2, c3, c4])
    // CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    // CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    // [c1, c2, c3, c4] = [current, CurrentConditions.weatherMix1, CurrentConditions.weatherMix2, CurrentConditions.upcomingWeather]
    // CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    
    // CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    // if (CurrentConditions.weatherMix1 == CurrentConditions.upcomingWeather) {
    //     CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    // }


    // if (CurrentConditions.snowEnabled == true) {
    //     if (['EXTRASUNNY'].includes(CurrentConditions.weatherMix2)) {

    //     }
    // }
    // if (['BLIZZARD', 'SNOW', 'SNOWLIGHT', 'XMAS'].includes(CurrentConditions.weatherMix2)) {
    //     if (CurrentConditions.weatherPercentage > 0.7) {
    //         CurrentConditions.snowEnabled = true
    //     }
    // }
}

// onNet('twiliWeather:host_update', (weatherMix1, weatherMix2, weatherPercentage, POSIX) => {
//     CurrentConditions.weatherPercentage = weatherPercentage
//     CurrentConditions.weatherMix1 = wtypes[weatherMix1]
//     CurrentConditions.weatherMix2 = wtypes[weatherMix2]
//     CurrentConditions.season = seasonPossibilities[POSIX[1]]
//     getCurrentWeatherState()
//     emitNet("twiliWeather:sync", -1, CurrentConditions);
//     emitNet("twiliWeather:sync_imminent", -1, CurrentConditions);
//     // if (c1 != current || c2 != CurrentConditions.weatherMix1 || c3 != CurrentConditions.weatherMix2 || c4 != CurrentConditions.upcomingWeather) {
//     //     CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
//     // }
//     // CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
// });


function randomIntFromInterval(min, max) {  // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  


onNet('twiliWeather:request_sync', () => {
    // getCurrentWeatherState()
    emitNet("twiliWeather:sync", source, CurrentConditions);
    // getCurrentWeatherState()
});

RegisterCommand('wprogs', (source, args) => {
    clearTick(weather_progress_thread)
    updateWeatherState()
    progress_weather()
});

RegisterCommand('wset', (source, args) => {
    const [next_weather] = args
    if (!typelist.includes(next_weather.toUpperCase())) {
        return;
    }
    clearTick(weather_progress_thread)
    CurrentConditions.lastWeather = CurrentConditions.currentWeather
    CurrentConditions.currentWeather = next_weather
    progress_weather()
    // updateWeatherState()
    // CurrentConditions.lastWeather = CurrentConditions.currentWeather
    // emitNet("twiliWeather:sync_fast", -1, CurrentConditions);
    // progress_weather()
});



progress_weather()
function progress_weather() {
    weather_progress_thread = setTick(async () => {
        // emitNet("twiliWeather:sync", -1, CurrentConditions);
        emitNet("twiliWeather:sync_transition", -1, CurrentConditions);
        // GETHOSTID DOES NOT WORK ON ONNESYNC
        // const host = 4
        // console.log(GetActivePlayers())
        // if (host == null) { clearTick(thread); return; }
        // emitNet("twiliWeather:request_update", host);

        console.log(CurrentConditions)

        let next_update_in = randomIntFromInterval(update_freq_min, update_freq_max)
        console.log(next_update_in / 1000)
        await Delay(next_update_in);
        updateWeatherState()
    })
}


// start_tick()
// function start_tick() {
//     const thread = setTick(async () => {
//         // GETHOSTID DOES NOT WORK ON ONNESYNC
//         // const host = 4
//         // console.log(GetActivePlayers())
//         if (host == null) { clearTick(thread); return; }
//         emitNet("twiliWeather:request_update", host);

//         await Delay(10000);
//     })
// }

// function 