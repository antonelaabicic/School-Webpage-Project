(() => {
    const loginForm = document.querySelector("#login");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    // event listener to login form for submit event
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent default form submission behavior
        login(); 
    });

    function login() {
        const loginData = {
            username: username.value,
            password: password.value
        };

        // make POST request to api with the login data
        const response = fetch("https://www.fulek.com/data/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        // handling the response from api
        response
            .then((result) => result.json())
            .then((result) => {
                storeTokenToSessionStorage(result.data.token);
                // redirect user after successful sign in
                window.location.replace("nastavni_plan.html");
            })
            .catch((error) => alert("Nešto je krenulo po krivu."));
    }

    // store token in session storage
    function storeTokenToSessionStorage(token) {
        sessionStorage.setItem("token", token);
    }
})();
