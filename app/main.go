package main

import (
	"fmt"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	fmt.Println("Received body: ", req.Body)

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       "Hello from Alex example function!",
	}, nil
}

func main() {
	lambda.Start(handler)
}
