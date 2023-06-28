// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


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

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHvuCxNIZ525B2fPIgTE23Z9A51YMZtlw",
    authDomain: "first-project-59564.firebaseapp.com",
    projectId: "first-project-59564",
    storageBucket: "first-project-59564.appspot.com",
    messagingSenderId: "947027265089",
    appId: "1:947027265089:web:ab51a4f823f6ff2ade28c0",
    measurementId: "G-G536LP4MYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


signUpBtn.addEventListener("click", signUp)

function signUp() {
    var passCheck = document.querySelector("#passCheck")
    console.log(passCheck);
    passCheck.classList.remove("d-block")
    passCheck.classList.add("d-none")
    var valid = false
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
    var email = signUpEmail.value, password = signUpPassword.value, conPass = conPassword.value

    if (!valid) {
        return null
    }
    else if (password === conPass) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
        passCheck.classList.remove("d-none")
        passCheck.classList.add("d-block")
    }
}


var hideBtns = document.querySelectorAll(".hide")
hideBtns.forEach((x) => { x.addEventListener("click", () => { showPass(x) }) })

function showPass(x) {
    var pass = x.parentNode.children
    for (const i of pass) {
        if (i.localName == "input") {
            if (i.type == "password") {
                i.type = "text"
                x.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'
            }
            else {
                i.type = "password"
                x.innerHTML = '<i class="fa-solid fa-eye"></i>'
            }
        }
    }
}


goToSignIn.addEventListener("click", () => { signUpsignIn(goToSignIn) })
goToSignUp.addEventListener("click", () => { signUpsignIn(goToSignUp) })

function signUpsignIn(x) {
    let signUp = document.querySelector("#signUp")
    let signIn = document.querySelector("#signIn")
    if (x.id == "goToSignUp") {
        signInEmail.value = null, signInPassword.value = null
        signIn.classList.add("moveOut")
        setTimeout(() => {
            console.log("hi");
            signIn.classList.remove("d-flex")
            signIn.classList.add("d-none")
            signUp.classList.add("d-flex")
            signUp.classList.remove("d-none")
            setTimeout(() => {
                signUp.classList.remove("moveIn")
            }, 50);
        }, 1310)
    } else {
        userFName.value = null, userLName.value = null, signUpEmail.value = null, signUpPassword.value = null, conPassword.value = null
        signUp.classList.add("moveIn")
        setTimeout(() => {
            signIn.classList.remove("d-none")
            signIn.classList.add("d-flex")
            signUp.classList.remove("d-flex")
            signUp.classList.add("d-none")
            setTimeout(() => {
                signIn.classList.remove("moveOut")
            }, 50);
        }, 1310);
    }
}