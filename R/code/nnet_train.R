library(nnet)
#library(useful)

load('/home/rstudio/clearfortakeoff/R/data/train_env.RData')

rm(train.mat)

gc()

test <- cbind(test.Y, test)

#print('building x')

#train.mat <- build.x(train.Y ~ ., contrasts = F, data = train)

#print('x built')

print('Beginning Neural Net Training')

nnet.predObj <- multinom(test.Y ~ ., data = test, model = T, 
                         MaxNWts = 1000000, maxit = 10000)

print('Training complete')

print('Saving data')

validate[4] <- NULL

save.image('/home/rstudio/clearfortakeoff/R/data/nnet.RData')
