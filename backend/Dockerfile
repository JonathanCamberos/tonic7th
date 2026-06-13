FROM golang:1.21-alpine AS builder
WORKDIR /src
COPY . .
RUN apk add --no-cache git build-base \
 && go build -o /backend

FROM alpine:3.18
RUN apk add --no-cache ca-certificates
COPY --from=builder /backend /usr/local/bin/backend
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/backend"]
