library(nnet)

load('/home/rstudio/clearfortakeoff/R/data/nnet.RData')

train.names <- names(train)

train.names[4] <- 'Var.5'

names(train) <- train.names

sample.size <- 500000

train.subsetIndex <- sample(nrow(train), size = sample.size, replace = F)

train.subset <- train[train.subsetIndex,]

train.Ysubset <- train.Y[train.subsetIndex]

start.time <- Sys.time()

train.Yhat <- predict(nnet.predObj, train.subset)

runtime <- Sys.time() - start.time

print(runtime)

print(paste0('Per-record ', runtime/nrow(train.subset)))

confusion.mat <- caret::confusionMatrix(train.Ysubset, train.Yhat)

print(confusion.mat)

save.image('/home/rstudio/clearfortakeoff/R/data/nnet.RData')

