library(nnet)
library(useful)

train <- cbind(train.Y, train)

train.mat <- build.x(train.Y ~ ., contrasts = F, data = train)

train.mat <- data.frame(train.Y, train.mat)

train.mat[2] <- NULL

nnet.predObj <- multinom(train.Y ~ ., data = train.mat)
