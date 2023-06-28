
// typelist = [
//     'BLIZZARD', 'CLEAR', 'CLEARING', 'CLOUDS', 'EXTRASUNNY', 'FOGGY', 'HALLOWEEN',
//     'NEUTRAL', 'OVERCAST', 'RAIN', 'SMOG', 'SNOW', 'SNOWLIGHT', 'THUNDER', 'XMAS'
// ]


weatherPossibilities = {
    'THUNDER': ['CLEARING,', 'RAIN', 'OVERCAST'],
    'RAIN': ['CLEARING', 'THUNDER', 'OVERCAST'],
    'CLEARING': ['CLEAR', 'CLOUDS', 'OVERCAST', 'FOGGY'],
    'OVERCAST': ['RAIN', 'THUNDER', 'FOGGY', 'CLEAR', 'CLOUDS', 'EXTRASUNNY'],
    'CLEAR': ['OVERCAST', 'EXTRASUNNY', 'CLOUDS'],

    'SNOW': ['SNOWLIGHT', 'BLIZZARD', 'XMAS', 'CLEAR', 'EXTRASUNNY', 'CLOUDY'],
    'SNOWLIGHT': ['SNOW', 'BLIZZARD', 'XMAS'],
    'BLIZZARD': []
}


seasonPossibilities = {}
seasonPossibilities_pre = {
    'winter': [12, 1, 2],
    'spring': [3, 4, 5],
    'summer': [6, 7, 8],
    'fall': [9, 10, 11]
}

Object.entries(seasonPossibilities_pre).forEach((key, i) => {
    Object.values(seasonPossibilities_pre[key[0]]).forEach((val1) => {
        seasonPossibilities[val1] = key[0]
    })
})
