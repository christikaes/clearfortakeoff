library(readr)

read_csv_bind <- function(directory) {
  # takes csv files from directory and turns them into
  # a data frame using rbind all on the list of input data
  # frames
  files.list = list.files(path = directory, pattern = '.csv')
  for (csv in files.list) {
    if (exists('out.list') == F) {
      # iteration to place df into list at place i
      i = 1
      out.list = list()
      in.csv = data.frame(read_csv(file = paste0(directory, csv), progress = T))
      in.csv = data.frame(apply(in.csv, MARGIN = 2, as.character))
      out.list[[i]] = in.csv
    } else {
      i = i + 1
      in.csv = data.frame(read_csv(file = paste0(directory, csv), progress = T))
      in.csv = data.frame(apply(in.csv, MARGIN = 2, as.character))
      out.list[[i]] = in.csv
    }
    rm(in.csv)
    gc()
  }
  dplyr::rbind_all(out.list)
}

flights <- read_csv_bind('~/Documents/data/Flights/')

write_csv(flights, 'R/data/flights_full.csv')
