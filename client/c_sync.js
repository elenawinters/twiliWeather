SetWeatherOwnedByNetwork(false);
ClearWeatherTypePersist();

// CurrentConditions = {}
persistantWeather = 'NEUTRAL'


onNet('twiliWeather:request_update', (weatherMix1, weatherMix2, weatherPercentage) => {
    const [w1, w2, wp] = GetWeatherTypeTransition()
    emitNet("twiliWeather:host_update", w1, w2, wp, GetPosixTime());
});

emitNet("twiliWeather:request_sync");
on('playerSpawned', () => {
    emitNet("twiliWeather:request_sync");
})

onNet('twiliWeather:sync', (weatherConditions) => {
    // CurrentConditions = weatherConditions
    // persistantWeather = weatherConditions.upcomingWeather
    console.log(weatherConditions)

    SetWeatherTypeTransition(weatherConditions.weatherMix1, weatherConditions.weatherMix2, weatherConditions.weatherPercentage)
    if (persistantWeather != weatherConditions.upcomingWeather) {
        console.log('setting weather persist')
        SetWeatherTypePersist(weatherConditions.upcomingWeather)
        persistantWeather = weatherConditions.upcomingWeather

    }
})

