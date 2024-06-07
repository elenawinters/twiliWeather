
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
    'BLIZZARD': ['SNOW'],
    'XMAS': ['SNOW', 'SNOWLIGHT'],

    'CLOUDS': ['EXTRASUNNY', 'CLEAR', 'OVERCAST', 'FOGGY', 'SMOG', 'RAIN'],
    'EXTRASUNNY': ['CLEAR', 'FOGGY', 'SMOG'],
    'FOGGY': ['SMOG', 'CLEAR', 'EXTRASUNNY', 'OVERCAST', 'RAIN', 'THUNDER'],
    'SMOG': ['FOGGY', 'CLEAR', 'EXTRASUNNY', 'OVERCAST', 'RAIN'],
    'NEUTRAL': typelist,
    'HALLOWEEN': typelist,
}

// Object.entries(weatherPossibilities).forEach((key, i) => {
//     weatherPossibilities[key[0]].push(key[0])
// })



// seasonPossibilities = {}
// seasonPossibilities_pre = {
//     'winter': [12, 1, 2],
//     'spring': [3, 4, 5],
//     'summer': [6, 7, 8],
//     'fall': [9, 10, 11]
// }

// Object.entries(seasonPossibilities_pre).forEach((key, i) => {
//     Object.values(seasonPossibilities_pre[key[0]]).forEach((val1) => {
//         seasonPossibilities[val1] = key[0]
//     })
// })
