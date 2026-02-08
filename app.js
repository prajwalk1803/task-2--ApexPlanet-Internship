// ApexAuth JS - Validation + Password Toggle + AJAX Dummy Check + Smooth Scroll

AOS.init({
  duration: 900,
  once: true
});

// Smooth scroll buttons
function scrollToAuth(){
  document.querySelector("#auth").scrollIntoView({behavior:"smooth"});
}

document.querySelector("#btnHeroStart").addEventListener("click", scrollToAuth);
document.querySelector("#btnScrollAuth").addEventListener("click", scrollToAuth);
document.querySelector("#btnModalStart").addEventListener("click", scrollToAuth);
document.querySelector("#btnScrollAuthMobile").addEventListener("click", scrollToAuth);

// Toast
const toastEl = document.getElementById("mainToast");
const toastObj = new bootstrap.Toast(toastEl);

document.querySelector("#btnToast").addEventListener("click", () => {
  toastObj.show();
});

// Password Toggle
document.querySelectorAll("[data-toggle='password']").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const target = document.querySelector(btn.getAttribute("data-target"));
    if(target.type === "password"){
      target.type = "text";
      btn.innerHTML = `<i class="bi bi-eye-slash"></i>`;
    }else{
      target.type = "password";
      btn.innerHTML = `<i class="bi bi-eye"></i>`;
    }
  });
});

// Dummy "database" for AJAX check
const existingUsers = {
  usernames: ["admin", "apex", "student01", "teacher"],
  emails: ["admin@gmail.com", "apex@gmail.com", "test@gmail.com"]
};

function validateEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Login Validation
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  let ok = true;

  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();

  document.getElementById("loginEmailError").innerText = "";
  document.getElementById("loginPasswordError").innerText = "";

  if(email === "" || !validateEmail(email)){
    document.getElementById("loginEmailError").innerText = "Please enter a valid email.";
    ok = false;
  }

  if(pass.length < 6){
    document.getElementById("loginPasswordError").innerText = "Password must be at least 6 characters.";
    ok = false;
  }

  if(ok){
    toastObj.show();
    bootstrap.Modal.getOrCreateInstance(document.getElementById("demoModal")).hide();
    alert("✅ Login Successful (Demo Frontend Only)");
    this.reset();
  }
});

// Password Strength
function passwordStrength(p){
  let score = 0;
  if(p.length >= 6) score++;
  if(/[A-Z]/.test(p)) score++;
  if(/[0-9]/.test(p)) score++;
  if(/[^A-Za-z0-9]/.test(p)) score++;

  return score;
}

const regPass = document.getElementById("regPassword");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

regPass.addEventListener("input", ()=>{
  const p = regPass.value;
  const score = passwordStrength(p);

  let percent = (score/4)*100;
  strengthBar.style.width = percent + "%";

  if(score <= 1) strengthText.innerText = "Strength: Weak";
  else if(score == 2) strengthText.innerText = "Strength: Medium";
  else if(score == 3) strengthText.innerText = "Strength: Strong";
  else strengthText.innerText = "Strength: Very Strong";
});

// AJAX Dummy Username Check
const usernameField = document.getElementById("regUsername");
const usernameAjaxMsg = document.getElementById("usernameAjaxMsg");

usernameField.addEventListener("input", ()=>{
  const val = usernameField.value.trim().toLowerCase();

  usernameAjaxMsg.innerText = "";
  if(val.length >= 3){
    setTimeout(()=>{
      if(existingUsers.usernames.includes(val)){
        usernameAjaxMsg.innerText = "❌ Username already exists!";
      }
    }, 200);
  }
});

// AJAX Dummy Email Check
const emailField = document.getElementById("regEmail");
const emailAjaxMsg = document.getElementById("emailAjaxMsg");

emailField.addEventListener("input", ()=>{
  const val = emailField.value.trim().toLowerCase();

  emailAjaxMsg.innerText = "";
  if(validateEmail(val)){
    setTimeout(()=>{
      if(existingUsers.emails.includes(val)){
        emailAjaxMsg.innerText = "❌ Email already registered!";
      }
    }, 200);
  }
});

// Register Validation
document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();

  let ok = true;

  const name = document.getElementById("regName").value.trim();
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const pass = document.getElementById("regPassword").value.trim();
  const cpass = document.getElementById("regConfirmPassword").value.trim();
  const role = document.getElementById("regRole").value.trim();
  const terms = document.getElementById("terms").checked;

  // reset errors
  document.querySelectorAll(".invalid-msg").forEach(x=>x.innerText="");

  if(name.length < 3){
    document.getElementById("regNameError").innerText = "Name must be at least 3 characters.";
    ok = false;
  }

  if(username.length < 3){
    document.getElementById("regUsernameError").innerText = "Username must be at least 3 characters.";
    ok = false;
  }

  if(email === "" || !validateEmail(email)){
    document.getElementById("regEmailError").innerText = "Please enter a valid email.";
    ok = false;
  }

  if(pass.length < 6){
    document.getElementById("regPasswordError").innerText = "Password must be at least 6 characters.";
    ok = false;
  }

  if(pass !== cpass){
    document.getElementById("regConfirmPasswordError").innerText = "Password does not match.";
    ok = false;
  }

  if(role === ""){
    document.getElementById("regRoleError").innerText = "Please select role.";
    ok = false;
  }

  if(!terms){
    document.getElementById("termsError").innerText = "You must accept terms.";
    ok = false;
  }

  // AJAX dummy exists checks
  if(existingUsers.usernames.includes(username.toLowerCase())){
    document.getElementById("regUsernameError").innerText = "Username already exists.";
    ok = false;
  }

  if(existingUsers.emails.includes(email.toLowerCase())){
    document.getElementById("regEmailError").innerText = "Email already exists.";
    ok = false;
  }

  if(ok){
    toastObj.show();
    alert("🎉 Registration Successful (Demo Frontend Only)");
    this.reset();
    strengthBar.style.width = "0%";
    strengthText.innerText = "Strength: -";
    usernameAjaxMsg.innerText = "";
    emailAjaxMsg.innerText = "";
  }
});
