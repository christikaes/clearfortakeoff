download.file('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat',
              'R/data/airlines.csv', mode = "w",
              cacheOK = TRUE,
              extra = getOption("download.file.extra"))