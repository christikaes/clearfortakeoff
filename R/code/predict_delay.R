# script to download wunderground flight data
library(randomForest)
args = commandArgs(trailingOnly = TRUE)

fake.code <- args[1]

UniqueCarrier3 <- as.factor(args[2])

date.today <- Sys.time()

Month <- as.factor(lubridate::month(date.today))

year.today <- lubridate::year(date.today)

day.today <- lubridate::day(date.today)

DayOfWeek <- as.factor(lubridate::wday(date.today))

download.file(paste0('https://www.wunderground.com/history/airport/', fake.code,
                     '/', year.today, '/', Month,'/', day.today,
                     '/CustomHistory.html?dayend=', day.today,
                     '&monthend=', Month,
                     '&yearend=', year.today, '&format=1'), mode = 'w',
              cacheOK = TRUE, destfile = 'R/data/flight_request.csv',
              extra = getOption('download.file.extra'))

request.dat <- read.csv('R/data/flight_request.csv')

load('R/code/train_rf_noOrigin.RData')

#remove date
request.dat <- request.dat[2:ncol(request.dat)]

request.dat$WindDirDegrees <- gsub(pattern = '<br />', replacement = '',
                                   x = request.dat$WindDirDegrees.br...)

request.dat$WindDirDegrees.br... <- NULL

request.dat[is.na(request.dat)] <- 0

request.dat$Events <- ifelse(request.dat$Events == 0, 'none', request.dat$Events)

request.dat$CloudCover <- as.factor(request.dat$CloudCover)

request.dat$Events <- as.factor(request.dat$Events)

request.dat$WindDirDegrees <- as.integer(request.dat$WindDirDegrees)

request.dat$Max.VisibilityMiles <- as.integer(request.dat$Max.VisibilityMiles)

request.dat$Mean.VisibilityMiles <- as.integer(request.dat$Mean.VisibilityMiles)

request.dat$Min.VisibilityMiles <- as.integer(request.dat$Min.VisibilityMiles)

levels(request.dat$CloudCover) <- levels(train$CloudCover)

levels(request.dat$Events) <- levels(train$Events)

levels(UniqueCarrier3) <- levels(train$UniqueCarrier3)

levels(Month) <- levels(train$Month)

levels(DayOfWeek) <- levels(train$DayOfWeek)

pass.rf <- data.frame(Month, DayOfWeek, UniqueCarrier3, request.dat)

# pass in flight data
dat <- predict(rf.predObj, pass.rf, type = 'prob')
cat(dat)