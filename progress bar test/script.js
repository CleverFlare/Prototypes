//pointing out the elements we want to manipulate
const progBar = document.querySelectorAll('progress');
const htmlBtn = document.querySelector('#htmlbtn');
const cssBtn = document.querySelector('#cssbtn');
const jsBtn = document.querySelector('#jsbtn');

//variables
var increment = 0;

//setTimeout supposed to wait for 200 milliseconds to run the following code
let anim = setTimeout(a => {

    //as the progBar is made on an array form, i needed to loop into the array and apply the changes in all of 'em
    progBar.forEach(e => {

        //the argument e represents every single element in the array, it'll modify the value of the attribute value and set it to the value of the "data-max-value" attribute
        e.setAttribute('value', `${e.getAttribute('data-max-value')}`);

        //the same goes with the argument e, but this time we delete the data attribute named "data-max-value" as we don't need it anymore
        e.removeAttribute('data-max-value');

    })

    //this event listener is solely added for testing process
    document.addEventListener('keydown', event => {
        const newKey = event.key;
        if(newKey == "Control") {
            let input = prompt('add the new value of the HTML progress bar');
            let newInputValue = parseInt(input, 10);
            !newInputValue? alert('you shall pass in a number') : progBar[0].setAttribute('value', newInputValue);
        }
    })

    //this event listener is added to track any click on the button HTML value to run the following code
    htmlBtn.addEventListener('click', e => {
        //we make a variable for the prompt in order to make it easier to access it, once we type the prompt the event listener will consider it as if we want to display it anyway
        let input1 = prompt('add the new value of the HTML progress bar');
        //newinput1 variable turns the string value given by the prompt in the variable input1 into a number using the method parseInt()
        let newInput1 = parseInt(input1, 10);
        //here we use the conditional operator to prevent the user from enter any invalid types of characters such as strings, so if it's not a number it won't set the new value to the attribute value in the HTML progress bar
        !newInput1? alert('you shall pass in a number') : progBar[0].setAttribute('value', newInput1);
    })
    
    //the absolute same thing applies on the other two event listeners, so it's not necessary to comment on them as well
    cssBtn.addEventListener('click', e => {
        let input2 = prompt('add the new value of the CSS progress bar');
        let newInput2 = parseInt(input2, 10);
        !newInput2? alert('you shall pass in a number') : progBar[1].setAttribute('value', newInput2);
    })

    jsBtn.addEventListener('click', e => {
        let input3 = prompt('add the new value of the Javascript progress bar');
        let newInput3 = parseInt(input3, 10);
        !newInput3? alert('you shall pass in a number') : progBar[2].setAttribute('value', newInput3);
    })
    
}, 200);