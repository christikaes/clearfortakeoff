library(randomForest)

load('R/data/train_env.RData')

rf.predObj <- randomForest(x = train, y = train.Y, xtest = validate, ytest = validate.Y,
             mtry = sqrt(ncol(train)), ntree = 200,replace = T, do.trace = T,
             keep.inbag = T, keep.forest = T)

rf.PredProbs <- data.frame(predict(object = rf.predObj, newdata = test, type = 'prob'))

rf.Pred <- ifelse(rf.PredProbs$y > .9, 'y', 'n')

#rf.Pred <- predict(rf.predObj, validate)

caret::confusionMatrix(validate.Y, rf.Pred)

train[24] <- as.factor(train[,24])

class(train$Events)

pos <- data.frame('1', '7', 'AAL', 72, 64, 55, 53, 49, 38, 80, 60, 29, 30.04, 30.00, 29.92, 10.0, 10.0, 10.0, 26, 11, 32, 0.00, '1', 'none', 278)

names(pos) <- names(train)

predict(object = rf.predObj, newdata = pos, type = 'prob')
