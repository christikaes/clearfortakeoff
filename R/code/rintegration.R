# Month, DayOfWeek, UniqueCarrier3, Max.Temperaturelk, 
library(randomForest)

args = commandArgs(trailingOnly = TRUE)


#test <- data.frame(1, "asdf")
#print(apply(test, MARGIN = 2, class))

#print(apply(abc, MARGIN = 2, class))
load("R/code/train_rf_noOrigin.RData")
validate[1,]$UniqueCarrier3 <- args[1]
validate[1,]$Min.VisibilityMiles <- 1
#validate[1,]$CloudCover <- 8
validate[1,]$Events <- 'Fog-Rain-Snow'
testdata <- validate[1,]

#print(sapply(testdata, class))
#print(head(train))
names(testdata) <- names(train)
dat <- predict(rf.predObj, testdata[1,], type = 'prob')
cat(dat)



if (F) 	 {
args = commandArgs(trailingOnly = TRUE)
x1 <- as.numeric(args[1])
x2 <- as.numeric(args[2])
x3 <- args[3]
x4 <- as.numeric(args[4])
x5 <- as.numeric(args[5])
x6 <- as.numeric(args[6])
x7 <- as.numeric(args[7])
x8 <- as.numeric(args[8])
x9 <- as.numeric(args[9])
x10 <- as.numeric(args[10])
x11 <- as.numeric(args[11])
x12 <- as.numeric(args[12])
x13 <- as.numeric(args[13])
x14 <- as.numeric(args[14])
x15 <- as.numeric(args[15])
x16 <- as.numeric(args[16])
x17 <- as.numeric(args[17])
x18 <- as.numeric(args[18])
x19 <- as.numeric(args[19])
x20 <- as.numeric(args[20])
x21 <- as.numeric(args[21])
x22 <- as.numeric(args[22])
x23 <- args[23]
x24 <- as.numeric(args[24])
x25 <- as.numeric(args[25])
print(class(x25))
abc <- data.frame(cbind(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, x18, x19, x20, x21, x22, x23, x24, x25))
}


