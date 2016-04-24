download.file('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat',
              'R/data/airlines.csv', mode = "w",
              cacheOK = TRUE,
              extra = getOption("download.file.extra"))
# get wunderground data
for (apcode in airports) {
 dat =  download.file(url = paste0('https://www.wunderground.com/history/airport/K', apcode,
                       '/2014/1/1/CustomHistory.html?dayend=31&monthend=3&yearend=2016&req_city=&req_state=&req_statename=&reqdb.zip=&reqdb.magic=&reqdb.wmo=&format=1'),
                      paste0('R/data/', apcode, '.csv'), mode = "w",
                      cacheOK = TRUE,
                      extra = getOption("download.file.extra"))
}

# get METAR data
for (apcode in airports) {
  dat =  download.file(url = paste0('https://mesonet.agron.iastate.edu/cgi-bin/request/asos.py?station=', apcode,
                                    '&data=tmpc&data=dwpc&data=relh&data=drct&data=sknt&data=alti&data=vsby&data=gust&year1=2014&month1=1&day1=1&year2=2016&month2=3&day2=31&tz=Etc%2FUTC&format=commas&latlon=no&direct=no'),
                       paste0('R/data/airport_weather_metar/', apcode, '.csv'), mode = "w",
                       cacheOK = TRUE,
                       extra = getOption("download.file.extra"))
}