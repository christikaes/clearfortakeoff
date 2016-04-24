library(randomForest)

rf.predObj <- randomForest(x = train, y = train.Y, xtest = test, ytest = test.Y,
             mtry = sqrt(ncol(train)), ntree = 200,replace = T, do.trace = T,
             keep.inbag = T, keep.forest = T)

rf.PredProbs <- data.frame(predict(object = rf.predObj, newdata = test, type = 'prob'))

rf.Pred <- ifelse(rf.PredProbs$y > .9, 'y', 'n')

#rf.Pred <- predict(rf.predObj, validate)

caret::confusionMatrix(validate.Y, rf.Pred)

