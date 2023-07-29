CurrentConditions = {
    weatherMix1: 'CLEAR',
    weatherMix2: 'CLOUDS',
    weatherPercentage: 0,
    upcomingWeather: 'EXTRASUNNY',
    snowEnabled: false,
    rainLevel: -1,
    temperature: 20.0,  // im american and it kills me to do this in C
    season: 'summer'
}

let [c1, c2, c3, c4] = ['NEUTRAL', 'NEUTRAL', 'NEUTRAL', 'NEUTRAL']
let current = 'NEUTRAL'
let cycles = 0

// only keep 10 weather changes in advance. forecast is indirectly related to what will happen.
// there is a chance this will happen, a rather large chance, but it's never 100%
Forecast = {}
host = GetHostId();

console.log(GetHostId());

typelist = [
    'BLIZZARD', 'CLEAR', 'CLEARING', 'CLOUDS', 'EXTRASUNNY', 'FOGGY', 'HALLOWEEN',
    'NEUTRAL', 'OVERCAST', 'RAIN', 'SMOG', 'SNOW', 'SNOWLIGHT', 'THUNDER', 'XMAS'
]

wtypes = {}

typelist.forEach((val) => {
    wtypes[GetHashKey(val)] = val
})



function getCurrentWeatherState() {
    // console.log([c1, c2, c3, c4])
    // This is so fucking cursed
    if (c2 == CurrentConditions.weatherMix1 && c3 == CurrentConditions.weatherMix2 && c4 == CurrentConditions.upcomingWeather) {
        if (c3 == c2 && c4 == c2) {
            CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
        }
        // current = CurrentConditions.weatherMix1
        return;
    }
    // console.log(CurrentConditions.upcomingWeather)
    CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    // c1 = current
    c2 = CurrentConditions.weatherMix1
    c3 = CurrentConditions.weatherMix2
    c4 = CurrentConditions.upcomingWeather
    console.log([c2, c3, c4])
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

onNet('twiliWeather:host_update', (weatherMix1, weatherMix2, weatherPercentage, POSIX) => {
    CurrentConditions.weatherPercentage = weatherPercentage
    CurrentConditions.weatherMix1 = wtypes[weatherMix1]
    CurrentConditions.weatherMix2 = wtypes[weatherMix2]
    CurrentConditions.season = seasonPossibilities[POSIX[1]]
    getCurrentWeatherState()
    emitNet("twiliWeather:sync", -1, CurrentConditions);
    // if (c1 != current || c2 != CurrentConditions.weatherMix1 || c3 != CurrentConditions.weatherMix2 || c4 != CurrentConditions.upcomingWeather) {
    //     CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
    // }
    // CurrentConditions.upcomingWeather = weatherPossibilities[CurrentConditions.weatherMix2].sample()
});


onNet('twiliWeather:request_sync', () => {
    // getCurrentWeatherState()
    emitNet("twiliWeather:sync", source, CurrentConditions);
    getCurrentWeatherState()
});


start_tick()
function start_tick() {
    const thread = setTick(async () => {
        const host = GetHostId()
        if (host == null) { clearTick(thread); return; }
        emitNet("twiliWeather:request_update", host);

        await Delay(10000);
    })
}

// function 