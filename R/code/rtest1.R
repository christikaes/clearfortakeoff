library(dplyr)

X1 <- rnorm(10, 100)

X2 <- rnorm(10, 100)

X1 <- data.frame(X1)

X2 <- data.frame(X2)

dat <- bind_cols(X1, X2)

print(dat)