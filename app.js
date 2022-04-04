const form=document.getElementById('loan-form');
form.addEventListener('submit',function(e){
    document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults,2000);
    e.preventDefault();
});
function calculateResults(e){
    console.log('calculating.....');
    const ELamount=document.getElementById('amount');
    const ELintrest=document.getElementById('interest');
    const ELyears=document.getElementById('years');
    const ELmonthly_payment=document.getElementById('monthly-payment');
    const ELtotal_payment=document.getElementById('total-payment');
    const ELtotal_interest=document.getElementById('total-interest');
    const principle =parseFloat(ELamount.value);
    const calculatedInterest =parseFloat(ELintrest.value)/100/12;
    const calculatedPayment =parseFloat(ELyears.value)*12;
    const x=Math.pow(1+calculatedInterest,calculatedPayment);
    const monthly=(principle*x*calculatedInterest)/(x-1);

    console.log(monthly);
    if(isFinite(monthly)){
        //check weather it is finite or not
        ELmonthly_payment.value=monthly.toFixed(2);
        ELtotal_payment.value=(monthly*calculatedPayment).toFixed(2);
        ELtotal_interest.value=((monthly*calculatedPayment)-principle).toFixed(2)//fixed to 2 places of dcimal
        document.getElementById('results').style.display='block';
        document.getElementById('loading').style.display='none';
    }
    else{
        console.log('plss check ur number');
        showError('plss check ur number');
    }
    e.preventDefault();
}
function showError(error){
    document.getElementById('results').style.display='none';
    //hide loader
    document.getElementById('loading').style.display='none';
    //create a div
    const errorDiv=document.createElement('div');
    //get element
    const ELcard = document.querySelector('.card');
    const ELheading=document.querySelector('.heading');
    //add class
    errorDiv.class='alert alert-danger';
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading
    ELcard.insertBefore(errorDiv,ELheading);
    //clear error after 3 sec
    setTimeout(clearError,3000);
}
function clearError(){
    document.querySelector('.alert').remove();
}
