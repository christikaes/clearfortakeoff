# script to explore features and output an .RDS file which will be our training data
library(readr)
library(dplyr)

flights <- read_csv('R/data/flights_full.csv')

flights <- flights %>%
  # trim the fat from the original file
  select(Year, Month, DayOfWeek, FlightDate, UniqueCarrier, AirlineID,
         Carrier, FlightNum, OriginAirportID, Origin, OriginCityName, OriginState,
         OriginStateFips, DestAirportID, DestCityName, DestState, DestStateFips,
         DepTime, DepDelayMinutes, DepTimeBlk, AirTime, Distance) %>%
  # filter out entries where Delay is missing
  filter(!is.na(DepDelayMinutes))

flights.subset <- flights %>%
  # create vector of binary delay indicators
  mutate(Delayed = ifelse(DepDelayMinutes > 0 , 1, 0)) %>%
  # pull out variables that will be fed to the ML algorithm
  select(Delayed, DepDelayMinutes, Month, DayOfWeek, FlightDate, UniqueCarrier, AirlineID,
         Carrier, OriginAirportID, DestAirportID, DepTime, DepTimeBlk, Distance)

