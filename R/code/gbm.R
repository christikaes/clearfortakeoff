library(gbm)

train <- dplyr::bind_cols(data.frame(train.Y), train)

gbm.predObj <- gbm(train.Y ~ ., distribution = 'multinomial', data = train, n.trees = 5000,
    interaction.depth = 8, shrinkage = .005, bag.fraction = .5, verbose = T)

gbm.perf(gbm.predObj)

summary.gbm(gbm.predObj)

yhat.gbm <- predict(gbm.predObj, validate, n.trees = 5000)

yhat.gbm <- data.frame(yhat.gbm)

names(yhat.gbm) <- c('n', 'y')

yhat.dirty <- apply(yhat.gbm, 1, which.max)

yhat.gbm <- ifelse(yhat.dirty == 1, 'n', 'y')

caret::confusionMatrix(yhat.gbm, validate.Y)

train$train.Y
