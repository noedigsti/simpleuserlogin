package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func authenticateUser(user User) (bool, error) {
	if user.Username == "testuser" && user.Password == "testpassword" {
		return true, nil
	}
	return false, errors.New("invalid credentials")
}

func logRequest(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("%s - %s %s\n", time.Now().Format(time.RFC3339), r.Method, r.URL.Path)
		next(w, r)
	}
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	json.NewDecoder(r.Body).Decode(&user)
	isAuthenticated, err := authenticateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "Unauthorized: %s", err.Error())
		return
	}
	if isAuthenticated {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Login successful")
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintf(w, "Unauthorized")
	}
}

func main() {
	http.HandleFunc("/login", logRequest(loginHandler))
	http.ListenAndServe(":8080", nil)
}
