let serverWeatherConditions = {}

SetWeatherOwnedByNetwork(false);
ClearWeatherTypePersist();

// CurrentConditions = {}
// persistantWeather = 'NEUTRAL'


// onNet('twiliWeather:request_update', (weatherMix1, weatherMix2, weatherPercentage) => {
//     const [w1, w2, wp] = GetWeatherTypeTransition()
//     emitNet("twiliWeather:host_update", w1, w2, wp, GetPosixTime());
// });

emitNet("twiliWeather:request_sync");
on('playerSpawned', () => {
    emitNet("twiliWeather:request_sync");
})

onNet('twiliWeather:sync_transition', (weatherConditions) => {
    serverWeatherConditions = weatherConditions
    const [w1, w2, wp] = GetWeatherTypeTransition()
    SetWeatherTypeTransition(GetHashKey(w1), GetHashKey(w2), 0.99)
    // CurrentConditions = weatherConditions
    // persistantWeather = weatherConditions.upcomingWeather
    // console.log(weatherConditions)

    SetWeatherTypeTransition(weatherConditions.lastWeather, weatherConditions.currentWeather, 0)
    SetWeatherTypePersist(weatherConditions.currentWeather)
    // if (persistantWeather != weatherConditions.upcomingWeather) {
    //     console.log('setting weather persist')
    //     SetWeatherTypePersist(weatherConditions.upcomingWeather)
    //     persistantWeather = weatherConditions.upcomingWeather

    // }
})

onNet('twiliWeather:sync', (weatherConditions) => {
    // CurrentConditions = weatherConditions
    // persistantWeather = weatherConditions.upcomingWeather
    // console.log(weatherConditions)

    SetWeatherTypeTransition(weatherConditions.currentWeather, weatherConditions.currentWeather, 0)
    SetWeatherTypePersist(weatherConditions.currentWeather)
    // persistantWeather = weatherConditions.upcomingWeather
})

// onNet('twiliWeather:changeWeatherNow', (mix1, mix2) => {
//     SetWeatherTypeTransition(mix1, mix2, 0)
//     SetWeatherTypePersist(mix2)
// })

