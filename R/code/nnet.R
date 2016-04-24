library(nnet)
library(useful)

train.mat <- build.x(train.Y ~ ., contrasts = F, data = train)

