// Start the script only when entire DOM content has been loaded.
window.addEventListener("DOMContentLoaded", start_script)

// a list of characters used in hex codes
let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

// an empty string which will hold the hex code.
// hex codes start from # sign
let color_string = "#";

function start_script(){

    // select all the required DOM elements
    const generate_btn = document.querySelector('.left .btn');
    const right_panel = document.querySelector('.right');
    const color_qty = document.querySelector('#colors-qty');
    const codes_div = document.querySelector('.codes.divisions');
    const hex_code = document.querySelector('.codes .hex-code');
    const rgb_code = document.querySelector('.codes .rgb-code');
    const status_text = document.querySelector('.status');

    // A list of all the color boxes. Initially there are not any.
    let color_boxes = null;

    // ------------------------------------------------------------------------------------
    // ADD EVENT LISTENERS
    // ------------------------------------------------------------------------------------

    // add event listeners to required DOM elements
    hex_code.addEventListener('click', copy_to_clipboard);
    rgb_code.addEventListener('click', copy_to_clipboard);
    generate_btn.addEventListener('click', ()=>{

        // before adding new colors, first remove the existing ones.
        destroy(right_panel)

        // hide the section of codes to be copied initially, if not hidden previously
        codes_div.classList.add('hide');

        // get the quantity of colors to generate
        let qty = color_qty.value;

        // create a div element, add the class color-box to it, give it background color which is randomly generated, and append this as child to the right panel. Do this as many times as the specified quantity. Thus run a loop.
        for (let quantity = 0; quantity < qty; quantity++) {
            let color_box = document.createElement('div');
            color_box.classList.add('color-box');
            color_box.style.backgroundColor = generate_colour();
            right_panel.appendChild(color_box);

            // when you have added one div as a child, empty the color string again, for the next color box
            color_string = "#";
        }

        // now that the color boxes have been created, now select them.
        color_boxes = document.querySelectorAll('.color-box');

        // for each box, listen to click event and show its color codes in hex and rgb
        color_boxes.forEach(box =>{
            box.addEventListener("click", show_color_codes);
        })
    })

    // ------------------------------------------------------------------------------------
    // DEFINE FUNCTIONS
    // ------------------------------------------------------------------------------------

    // function to generate a random color
    function generate_colour(){

        // randomly pick an item from codes array and add it to color string
        // do it 6 times since there are 6 characters in a hex code
        for(i=0; i<6; i++){
            let index = Math.floor(Math.random() * 16);
            color_string += `${codes[index]}`;
        }

        // once you are done creating the string, return it.
        return color_string;
    }

    // function to empty an element, i.e., remove all of its children
    function destroy(elem){
        // while there exists the first child inside the element, keep removing the last element
        while(elem.firstChild){
            elem.removeChild(elem.lastChild);
        }
    }

    // get target block, i.e., the color box clicked, extract its background color. Convert it to hex code.
    // show the codes on required DOM elements.
    function show_color_codes(event){
        let color_code_string = event.target.style.backgroundColor;
        let split_codes = color_code_string.slice(4, color_code_string.length-1).split(', ');
        let r = split_codes[0];
        let g = split_codes[1];
        let b = split_codes[2];
        hex_code.textContent = "";
        hex_code.textContent = rgbToHex(r, g, b);
        rgb_code.textContent = event.target.style.backgroundColor;
        codes_div.classList.remove('hide');
        
    }


    // Code Credit to StackOverFlow for the rgbToHex() function
    function rgbToHex(r, g, b) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }

    // once the user click the code, copy it to clipboard
    function copy_to_clipboard(event){
        navigator.clipboard.writeText(event.target.textContent);
        status_text.textContent = "Copied to Clipboard";
        status_text.classList.remove('hide');
        setTimeout(()=>{
            status_text.classList.add('hide');
        }, 2000)
    }
}