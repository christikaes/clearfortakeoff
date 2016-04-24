# script to explore features and output an .RData file which will be our training data
# get rid of blank col

library(readr)
library(dplyr)

flights <- read_csv('R/data/flights_full.csv')

airport.weather <- read_csv('R/data/airport_weather.csv')

flights <- flights %>%
  # trim the fat from the original file
  select(Year, Month, DayOfWeek, FlightDate, UniqueCarrier, AirlineID,
         Carrier, FlightNum, OriginAirportID, Origin, OriginCityName, OriginState,
         OriginStateFips, DestAirportID, DestCityName, DestState, DestStateFips,
         DepTime, DepDelayMinutes, DepTimeBlk, AirTime, Distance) %>%
  # filter out entries where Delay is missing
  filter(!is.na(DepDelayMinutes)) %>%
  filter(Year == '2014')

flights.subset <- flights %>%
  # create vector of binary delay indicators
  mutate(Delayed = ifelse(DepDelayMinutes > 0 , 'y', 'n')) %>%
  # pull out variables that will be fed to the ML algorithm
  select(Delayed, DepDelayMinutes, FlightDate, Month, DayOfWeek, Origin, UniqueCarrier)

flights.subset$Delayed <- as.factor(flights.subset$Delayed)

airlines <- read_csv('R/data/airlines.csv', col_names = F)

airlines <- airlines %>%
  select(4, 5)

names(airlines) <- c('UniqueCarrier', 'UniqueCarrier3')

flights.subset <- inner_join(flights.subset, airlines)

rm(airlines, flights)

flights.subset$FlightDate <- as.Date(flights.subset$FlightDate)

airport.weather$date <- as.Date(airport.weather$date)

# join weather and flight delays
train.full <- dplyr::inner_join(flights.subset, airport.weather, by = c('Origin' = 'Airport',
                                                   'FlightDate' = 'date'))

rm(airport.weather, flights.subset)

train.full <- train.full[complete.cases(train.full),]

train.full <- train.full %>% select(Delayed, 4:ncol(train.full), -UniqueCarrier)

train.full$Month <- as.factor(train.full$Month)

train.full$DayOfWeek <- as.factor(train.full$DayOfWeek)

train.full$Origin <- as.factor(train.full$Origin)

train.full$UniqueCarrier3 <- as.factor(train.full$UniqueCarrier3)

train.full$CloudCover <- as.factor(train.full$CloudCover)

train.full$Events <- as.factor(train.full$Events)

origin <- train.full$Origin

origin <- data.frame(origin)

origin <- data.frame(model.matrix(data = origin, ~origin - 1))

train.full$Origin <- NULL

train.full <- dplyr::bind_cols(train.full, origin)

rm(origin)

save.image('R/data/train_env.RData')
