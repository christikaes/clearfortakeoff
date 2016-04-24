library(readr)

read_csv_bind <- function(directory, skipn) {
  # takes csv files from directory and turns them into
  # a data frame using rbind all on the list of input data
  # frames
  files.list = list.files(path = directory, pattern = '.csv')
  for (csv in files.list) {
    if (exists('out.list') == F) {
      # iteration to place df into list at place i
      i = 1
      out.list = list()
      in.csv = data.frame(read_csv(file = paste0(directory, csv), progress = T,
                                   skip = skipn))
      in.csv = data.frame(apply(in.csv, MARGIN = 2, as.character))
      out.list[[i]] = in.csv
    } else {
      i = i + 1
      in.csv = data.frame(read_csv(file = paste0(directory, csv), progress = T,
                                   skip = skipn))
      in.csv = data.frame(apply(in.csv, MARGIN = 2, as.character))
      out.list[[i]] = in.csv
    }
    rm(in.csv)
    gc()
  }
  dplyr::rbind_all(out.list)
}

read_csv_bind_airport <- function(directory, skipn) {
  # takes csv files from directory and turns them into
  # a data frame using rbind all on the list of input data
  # frames
  files.list = list.files(path = directory, pattern = '.csv')
  for (csv in files.list) {
    if (exists('out.list') == F) {
      # iteration to place df into list at place i
      i = 1
      out.list = list()
      in.csv = data.frame(read_csv(file = paste0(directory, csv), progress = T,
                                   skip = skipn))
      in.csv$Airport = rep(gsub('.csv', '', csv), nrow(in.csv))
      in.csv = data.frame(apply(in.csv, MARGIN = 2, as.character))
      out.list[[i]] = in.csv
    } else {
      i = i + 1
      in.csv = data.frame(read_csv(file = paste0(directory, csv), progress = T,
                                   skip = skipn))
      in.csv$Airport = rep(gsub('.csv', '', csv), nrow(in.csv))
      in.csv = data.frame(apply(in.csv, MARGIN = 2, as.character))
      out.list[[i]] = in.csv
    }
    rm(in.csv)
    gc()
  }
  dplyr::rbind_all(out.list)
}


# read and bind
flights <- read_csv_bind('~/Documents/data/Flights/', skipn = 0)

airport.weather <- read_csv_bind_airport('R/data/airport.weather/', skipn = 1)

# clean up NA and inconsistent dates
airport.weather$date <- ifelse(is.na(airport.weather$EST) == F, airport.weather$EST,
                               ifelse(is.na(airport.weather$CST) == F, airport.weather$CST,
                               ifelse(is.na(airport.weather$MST) == F, airport.weather$MST,
                               as.character(airport.weather$PST))))

airport.weather <- airport.weather %>%
  select(-c(EST, CST, MST, PST, apply.in.csv..MARGIN...2..as.character.))

airport.weather$WindDirDegrees <- airport.weather$WindDirDegrees.br...

airport.weather$WindDirDegrees.br... <- NULL

airport.weather$WindDirDegrees <- gsub(pattern = '<br />', replacement = '',
                                       airport.weather$WindDirDegrees)

airport.weather$Events <- ifelse(is.na(airport.weather$Events), 'none', airport.weather$Events)

airport.weather$PrecipitationIn <- ifelse(airport.weather$PrecipitationIn == 'T',
                                          '.001', airport.weather$PrecipitationIn)

airport.weather[is.na(airport.weather)] <- '0'
# write csvs
write_csv(flights, 'R/data/flights_full.csv')

write_csv(airport.weather, 'R/data/airport_weather.csv')
