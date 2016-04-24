library(randomForest)
load("R/Code/train_rf_noOrigin.RData")
dat <- predict(rf.predObj, validate, type = 'prob')
print(dat)
