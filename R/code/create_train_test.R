# split into train test validate
library(caret)

set.seed(1231341)

train.index <- createDataPartition(train.full$Delayed, p = .65, list = F)

train <- train.full[train.index,]

test <- train.full[-train.index,]

rm(train.index)

validate.index <- createDataPartition(test$Delayed, p = .5, list = F)

validate <- test[validate.index,]

test <- test[-validate.index,]

rm(validate.index)

# split out target
train.Y <- train$Delayed

train$Delayed <- NULL

test.Y <- test$Delayed

test$Delayed <- NULL

validate.Y <- validate$Delayed

validate$Delayed <- NULL

save.image('R/data/train_env.RData')
