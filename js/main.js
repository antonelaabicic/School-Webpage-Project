document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        /* logout */
        let logoutBtn = document.querySelector("#logout");
        let loginLink = document.querySelector("#loginLink");
        let logoutLink = document.querySelector("#logoutLink");
        
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                sessionStorage.removeItem("token");
                location.replace("login.html");
            });
        }

        /* prijava/odjava exchange*/
        if (sessionStorage.getItem("token")) {
            if (loginLink) {
                loginLink.style.cssText = 'display:none !important';
            }
        } else {
            if (logoutLink) {
                logoutLink.style.cssText = 'display:none !important';
            }
        }
    }, 100);
});
