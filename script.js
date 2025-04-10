function validateEmail() {
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("email-error");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      emailError.style.display = "block";
    } else {
      emailError.style.display = "none";
      document.getElementById("email-step").style.display = "none";
      document.getElementById("password-step").style.display = "block";
    }
}

function checkPassword() {
    const password = document.getElementById("password").value;
    
    const charCountValid = password.length >= 8;
    const upperLowerValid = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialCharValid = /[^a-zA-Z0-9]/.test(password);
    const noSpaceValid = !/\s/.test(password);
    
    updateRule("char-count", charCountValid);
    updateRule("upper-lower", upperLowerValid);
    updateRule("number", numberValid);
    updateRule("special-char", specialCharValid);
    updateRule("no-space", noSpaceValid);
  
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");
    let strength = 0;
  
    if (charCountValid) strength++;
    if (upperLowerValid) strength++;
    if (numberValid) strength++;
    if (specialCharValid) strength++;
  
    // Reset semua class
    strengthBar.className = "password-strength";
    strengthText.className = "strength-label";
    strengthText.textContent = "";
  
    if (strength === 4) {
        strengthBar.classList.add("strong");
        strengthText.classList.add("strong");
        strengthText.textContent = "Strong";
    } else if (strength === 3) {
        strengthBar.classList.add("medium");
        strengthText.classList.add("medium");
        strengthText.textContent = "Medium";
    } else if (strength >= 1) {
        strengthBar.classList.add("weak");
        strengthText.classList.add("weak");
        strengthText.textContent = "Weak";      
    } else {
        strengthText.textContent = "";
    }
    
    const allValid = charCountValid && upperLowerValid && numberValid && specialCharValid && noSpaceValid;
    return allValid;
}  

function updateRule(id, valid) {
    const li = document.getElementById(id);
    const icon = li.querySelector(".material-symbols-outlined");
    li.style.color = valid ? "green" : "red";
    icon.textContent = valid ? "check_circle" : "cancel";
}

function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.querySelector(".toggle-password");

    if (input.type === "password") {
      input.type = "text";
      icon.textContent = "visibility";
    } else {
      input.type = "password";
      icon.textContent = "visibility_off";
    }
}

function submitForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (checkPassword()) {
        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            html: `<p><strong>Email:</strong> ${email}</p>
                   <p><strong>Password:</strong> ${password}</p>`,
            confirmButtonText: 'Oke'
        });
    } else {
        document.getElementById("password-error").style.display = "block";
    }
}
