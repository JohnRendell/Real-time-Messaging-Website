//all functions goes here
function goDiv(div1, div2){
    document.getElementById(div1).style.display = "block";
    document.getElementById(div2).style.display = "none";
}

//when a user is log in
function login(){
    let user = document.getElementById('user-input-login');
    let pass = document.getElementById('pass-input-login');
    let text = document.getElementById('warningtxt-l');

    //check if the fields is empty
    if(user.value == '' || pass.value == ''){
        text.style.display = 'block';
        text.innerHTML = "Fields are empty."

        //make the border of the input red
        user.style.borderColor = 'red';
        pass.style.borderColor = 'red';
    }

    //if all input is not empty, validate the inputs in the database
    else{
        let f = new FormData();
        f.append('user-l', user.value);
        f.append('pass-l', pass.value);

        fetch('loginValidation.php', {method: 'POST', body:f})
        .then(response=>{
            if(response.ok == false){
                throw new Error('Something happen to the response!');
            }
            return response.text();
        })
        .then(data=>{
            if(data === 'Exist in Database'){
                location.href = '../index.php';
            }
            
            else{
                text.style.display = 'block';
                text.innerHTML = data;

                //make the border of the input red
                user.style.borderColor = 'red';
                pass.style.borderColor = 'red';
            }
        })
        .catch(error=>{
            console.log('Error: ' + error);
        })
    }
}

//when a user made an account
function signin(){
    let user = document.getElementById('user-input-signin');
    let pass = document.getElementById('pass-input-signin');
    let repass = document.getElementById('repass-input-signin');
    let text = document.getElementById('warningtxt-s');

    //regex to check for passwords
    var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    //check if any of the input is empty
    if(user.value == '' && pass.value == '' && repass.value == ''){
        text.style.display = 'block';
        text.innerHTML = "Fields are empty."

        //make the border of the input red
        user.style.borderColor = 'red';
        pass.style.borderColor = 'red';
        repass.style.borderColor = 'red';
    }

    //check if username is too short
    else if(user.value.length < 5){
        text.style.display = 'block';
        text.innerHTML = "Username should have five characters long."

        //make the border of the input red
        user.style.borderColor = 'red';
    }

    //check if password is too short
    else if(pass.value.length < 6){
        text.style.display = 'block';
        text.innerHTML = "Password is too short."

        //make the border of the input red
        pass.style.borderColor = 'red';
    }

    //if the password dont have any upper, symbols and numbers
    else if(regularExpression.test(pass.value) == false){
        text.style.display = 'block';
        text.innerHTML = "Password should atleast contain upper case, symbols and numbers."

        //make the border of the input red
        pass.style.borderColor = 'red';
    }

    //check if the password and confirm password is match
    else if(pass.value != repass.value){
        text.style.display = 'block';
        text.innerHTML = "Passwords don't match."

        //make the border of the input red
        pass.style.borderColor = 'red';
        repass.style.borderColor = 'red';
    }

    //if everything is good, validate the user if any of the database 
    //has the same name, if doesnt redirect to the home page
    else{
        let f = new FormData();
        f.append('user-s', user.value);
        f.append('pass-s', pass.value);

        fetch('signinValidation.php', {method: 'POST', body: f})
        .then(reponse=>{
            if(reponse.ok == false){
                throw new Error('Something happen to the back end');
            }
            return reponse.text();
        })
        .then(data=>{
            if(data === 'sign in success'){
                location.href = '../index.php';
            }
            else{
                text.style.display = 'block';
                text.innerHTML = data;

                //make the border of the input red
                user.style.borderColor = 'red';
            }
        })
        .catch(error=>{
            console.log('Connection error: ' + error);
        })
    }
}

//toggle password
let isToggle = true;

function togglePass(checkbox1, checkbox2){
    let box1 = document.getElementById(checkbox1);
    let box2 = document.getElementById(checkbox2);

    if(isToggle){
        box1.type = "text";
        box2.type = "text";
        isToggle = false;
    } 
    
    else{
        box1.type = "password";
        box2.type = "password";
        isToggle = true;
    }
}