// SetWeatherTypeTransition(weatherMix1, weatherMix2, mixPercentage)

RegisterCommand('wprog', (source, args) => {
    const [w1, w2, wp] = GetWeatherTypeTransition()
    // const [w1, w2, wp] = args
    SetWeatherTypeTransition(GetHashKey(w1), GetHashKey(w2), 0.95)
    allowUpcomingChange = true
    // SetTransitionTimecycleModifier(GetHashKey(w2), 0)
});



RegisterCommand('wtest', (source, args) => {
    const [w1, w2, wp] = args
    SetWeatherTypeTransition(GetHashKey(w1), GetHashKey(w2), parseFloat(wp) / 100)
    // SetTransitionTimecycleModifier(GetHashKey(w2), 0)
});

RegisterCommand('wtest2', (source, args) => {
    const [weather, time] = args
    SetWeatherTypeOvertimePersist(weather, parseFloat(time))
    SetWeatherTypePersist(weather)
    // SetTransitionTimecycleModifier(GetHashKey(w2), 0)
});

RegisterCommand('wtest3', (source, args) => {
    const [weather, time] = args
    SetTransitionTimecycleModifier(weather, parseFloat(time))
    // SetTransitionTimecycleModifier(GetHashKey(w2), 0)
});


RegisterCommand('wtest4', (source, args) => {
    const [weather] = args
    SetWeatherTypePersist(weather)
});

// notraction = false
RegisterCommand('notraction', (source, args) => {
    const [traction] = args
    notraction = true
    if (traction == null) {
        notraction = false
    }
    SetVehicleReduceGrip(GetVehiclePedIsIn(PLAYER_PED()), notraction)
    SetVehicleReduceTraction(GetVehiclePedIsIn(PLAYER_PED()), parseInt(traction))
    // SetSnowLevel(parseFloat(level))
});



RegisterCommand('rainlevel', (source, args) => {
    const [level] = args
    SetRainLevel(parseFloat(level))
});


RegisterCommand('snowlevel', (source, args) => {
    const [level] = args
    SetSnowLevel(parseFloat(level))
});




snowEnabled = false
RegisterCommand('snow', (source, args) => {
    snowEnabled = !snowEnabled;
    ForceSnowPass(snowEnabled);
    SetForceVehicleTrails(snowEnabled);
    SetForcePedFootstepsTracks(snowEnabled);
    if (snowEnabled)
    {
        if (!HasNamedPtfxAssetLoaded("core_snow"))
        {
            RequestNamedPtfxAsset("core_snow");
            const thread = setTick(async () => {
                do {
                    await Delay(0);
                } while (!HasNamedPtfxAssetLoaded("core_snow"))
                UseParticleFxAssetNextCall("core_snow");
                clearTick(thread);
            })
        } else {
            UseParticleFxAssetNextCall("core_snow");
        }
    }
    else
    {
        RemoveNamedPtfxAsset("core_snow");
    }
});

