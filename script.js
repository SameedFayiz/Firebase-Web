// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


const userFName = document.getElementById("signUpFName")
const userLName = document.getElementById("signUpLName")
const signUpEmail = document.getElementById("signUpEmail")
const signUpPassword = document.getElementById("signUpPass")
const conPassword = document.getElementById("signUpConPass")
const signUpBtn = document.getElementById("signUpBtn")
const signUpGmail = document.getElementById("signUpGmail")
const signUpFb = document.getElementById("signUpFb")
const signInEmail = document.getElementById("signInEmail")
const signInPassword = document.getElementById("signInPass")
const forgotPass = document.getElementById("forgotPass")
const signInBtn = document.getElementById("signInBtn")
const signInGmail = document.getElementById("signInGmail")
const signInFb = document.getElementById("signInFb")
const goToSignUp = document.getElementById("goToSignUp")
const goToSignIn = document.getElementById("goToSignIn")

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBHvuCxNIZ525B2fPIgTE23Z9A51YMZtlw",
    authDomain: "first-project-59564.firebaseapp.com",
    databaseURL: "https://first-project-59564-default-rtdb.firebaseio.com",
    projectId: "first-project-59564",
    storageBucket: "first-project-59564.appspot.com",
    messagingSenderId: "947027265089",
    appId: "1:947027265089:web:ab51a4f823f6ff2ade28c0",
    measurementId: "G-G536LP4MYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// User state change 

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        location.href = window.location.pathname + "home/home.html"

    } else {
        // User is signed out
    }
});

// Register new users

signUpBtn.addEventListener("click", signUp)

function signUp() {
    let passCheck = document.querySelector("#passCheck")
    passCheck.classList.replace("d-block", "d-none")

    let valid = false
    switch (valid) {
        case userFName.checkValidity():
            userFName.reportValidity()
            break
        case userLName.checkValidity():
            userLName.reportValidity()
            break
        case signUpEmail.checkValidity():
            signUpEmail.reportValidity()
            break
        case signUpPassword.checkValidity():
            signUpPassword.reportValidity()
            break
        case conPassword.checkValidity():
            conPassword.reportValidity()
            break
        default:
            valid = true
    }
    let email = signUpEmail.value, password = signUpPassword.value, conPass = conPassword.value

    if (!valid) {
        return null
    }
    else if (password === conPass) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
        passCheck.classList.replace("d-none", "d-block")
    }
}

// Allow login for existing users

signInBtn.addEventListener("click", signIn)

function signIn() {
    let accCheck = document.querySelector("#accountCheck")
    accCheck.classList.replace("d-block", "d-none")

    let valid = false
    switch (valid) {
        case signInEmail.checkValidity():
            signInEmail.reportValidity()
            break
        case signInPassword.checkValidity():
            signInPassword.reportValidity()
            break
        default:
            valid = true
    }
    let email = signInEmail.value, password = signInPassword.value

    if (!valid) {
        return null
    }
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            accCheck.classList.replace("d-none", "d-block")
        });
}

// User sign out func

function userSignOut() {
    signOut(auth).then(() => {
        location.reload()
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

// Show and hide password toggler

var hideBtns = document.querySelectorAll(".hide")
hideBtns.forEach((elemBtn) => { elemBtn.addEventListener("click", () => { showPass(elemBtn) }) })

function showPass(elem) {
    let pass = elem.parentNode.children
    for (const i of pass) {
        if (i.localName == "input") {
            if (i.type == "password") {
                i.type = "text"
                elem.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
            }
            else {
                i.type = "password"
                elem.innerHTML = '<i class="fa-solid fa-eye"></i>'
            }
        }
    }
}

// Sign up and Sign in page navigator

goToSignIn.addEventListener("click", () => { signUpsignIn(goToSignIn) })
goToSignUp.addEventListener("click", () => { signUpsignIn(goToSignUp) })

function signUpsignIn(elem) {
    let signUp = document.querySelector("#signUp")
    let signIn = document.querySelector("#signIn")
    if (elem.id == "goToSignUp") {
        signInEmail.value = null, signInPassword.value = null
        signIn.classList.add("moveOut")
        setTimeout(() => {
            signIn.classList.replace("d-flex", "d-none")
            signUp.classList.replace("d-none", "d-flex")
            setTimeout(() => {
                signUp.classList.remove("moveIn")
            }, 50);
        }, 1310)
    } else {
        userFName.value = null, userLName.value = null, signUpEmail.value = null, signUpPassword.value = null, conPassword.value = null
        let passCheck = document.querySelector("#passCheck")
        passCheck.classList.replace("d-block", "d-none")
        signUp.classList.add("moveIn")
        setTimeout(() => {
            signIn.classList.replace("d-none", "d-flex")
            signUp.classList.replace("d-flex", "d-none")
            setTimeout(() => {
                signIn.classList.remove("moveOut")
            }, 50);
        }, 1310);
    }
}
