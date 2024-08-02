
export function fontWeight(weight) {
    return {
      fontWeight: `${weight}`,
      fontFamily: `Montserrat, sans-serif`,
      fontOpticalsizing: `auto`,
      fontStyle: `normal`,
    };
  }
export function passwordShower(showerId, passwordId){
    let shower = document.getElementById(showerId)
    let passwordInput = document.getElementById(passwordId)
    if(shower.className === 'bx  bx-hide h-4'){
        shower.className = 'bx  bx-show h-4'
    }else{
        shower.className = 'bx  bx-hide h-4'
    }
    if(shower.className === 'bx  bx-show h-4'){
       passwordInput.type = 'text';
    }else{
       passwordInput.type = 'password';
    }
    passwordInput.focus();
}



