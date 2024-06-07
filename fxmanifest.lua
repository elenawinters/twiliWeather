fx_version 'cerulean'
games { 'gta5', 'rdr3' }

rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

author 'Elena Winters'
description 'Weather systems for both FiveM and RedM (RedM is still a work in progress)'
version '24.6.7'

dependencies {
    'twiliCore'
}

-- ui_page 'html/index.html'

-- files {
--     'html/index.html',
--     'html/index.css',
--     'html/selector.js'
-- }

shared_scripts {
    '@twiliCore/shared/u_common.js'
}

server_scripts {
    'server/s_weather.js',
    'server/s_groups.js'
}

client_scripts {
    '@twiliCore/client/c_globals.js',
    'client/c_sync.js',
    'client/c_tests.js'
}

