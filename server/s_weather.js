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
    if (CurrentConditions.weatherMix2 == CurrentConditions.upcomingWeather) {
        CurrentConditions
    }
}

onNet('twiliWeather:host_update', (weatherMix1, weatherMix2, weatherPercentage, POSIX) => {
    CurrentConditions.weatherPercentage = weatherPercentage
    CurrentConditions.weatherMix1 = wtypes[weatherMix1]
    CurrentConditions.weatherMix2 = wtypes[weatherMix2]
    CurrentConditions.season = seasonPossibilities[POSIX[1]]
    getCurrentWeatherState()
    emitNet("twiliWeather:sync", -1, CurrentConditions);
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