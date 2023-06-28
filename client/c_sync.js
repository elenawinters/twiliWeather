SetWeatherOwnedByNetwork(false);
ClearWeatherTypePersist();

onNet('twiliWeather:request_update', (weatherMix1, weatherMix2, weatherPercentage) => {
    const [w1, w2, wp] = GetWeatherTypeTransition()
    emitNet("twiliWeather:host_update", w1, w2, wp, GetPosixTime());
});

// onNet('twiliWeather:sync', (weatherConditions) => {
//     console.log(weatherConditions)
//     // SetWeatherTypeTransition(weatherMix1, weatherMix2, mixPercentage)
// })
