(() => {
    const registerForm = document.querySelector("#register");
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");

    // event listener to login form for submit event
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault(); // prevent default form submission behavior
        register();
    });

    function register() {
        const registerData = {
            username: username.value,
            password: password.value
        };

        // make POST request to api with the register data
        const response = fetch("https://www.fulek.com/data/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        });

        // handling the response from api
        response
            .then((result) => result.json())
            .then((data) => {
                // redirect user after successful registration
                window.location.replace("login.html");
            })
            .catch((error) => alert("Nešto je krenulo po krivu"));
    }
})();
// register doesn0't get token, but login does
