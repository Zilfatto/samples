            // I cut out a part of the code from 'register' page for better understanding the context of
            // this binary search. It is called and defined in the 26 and 107 lines respectively.

            // For storing list of all countries.
            let countries;
            // Autocomplete
            function autocomplete(inp) {
                // The autocomplete function takes two arguments,
                // the text field element and an array of possible autocompleted values:
                let currentFocus, position;
                // execute a function when someone writes in the text field:
                inp.addEventListener("input", function(e) {
                    let list, item, val = this.value, arrayLen = countries.length;
                    // Close any already open lists of autocompleted values
                    closeAllLists();
                    if (!val) { return false;}
                    currentFocus = -1;
                    let valLen = val.length, firstInpLet = val[0].toUpperCase();
                    // Create a DIV element that will contain the items (values):
                    list = document.createElement("DIV");
                    list.setAttribute("id", this.id + "autocomplete-list");
                    list.setAttribute("class", "autocomplete-items");
                    // Append the DIV element as a child of the autocomplete container:
                    this.parentNode.appendChild(list);
                    // Find first word in an array that starts with a first letter of an input field
                    findWords(0, arrayLen - 1, firstInpLet);
                    if (position !== undefined) {
                        do {
                            // Check if the item starts with the same letters as the text field value:
                            if (countries[position].substr(0, valLen).toUpperCase() === val.toUpperCase()) {
                                // Create a DIV element for each matching element:
                                item = document.createElement("DIV");
                                // Make the matching letters bold:
                                item.innerHTML = "<strong>" + countries[position].substr(0, valLen) + "</strong>";
                                item.innerHTML += countries[position].substr(valLen);
                                // Insert a input field that will hold the current array item's value:
                                item.innerHTML += "<input type='hidden' value='" + countries[position] + "'>";
                                // Execute a function when someone clicks on the item value (DIV element):
                                item.addEventListener("click", function(e) {
                                    // Insert the value for the autocomplete text field:
                                    inp.value = this.getElementsByTagName("input")[0].value;
                                    // Validate an input field
                                    if (submissionCount > 0) {
                                        countryValidation();
                                    }
                                    // Close the list of autocompleted values,
                                    // (or any other open lists of autocompleted values:
                                    closeAllLists();
                                });
                                list.appendChild(item);
                            }
                            position++;
                        }
                        while (position < arrayLen && countries[position][0] === firstInpLet);
                    }
                });
                // Execute a function presses a key on the keyboard:
                inp.addEventListener("keydown", function(e) {
                    let list = document.getElementById(this.id + "autocomplete-list");
                    if (list) list = list.getElementsByTagName("div");
                    if (e.keyCode == 40) {
                        // If the arrow DOWN key is pressed, increase the currentFocus variable:
                        currentFocus++;
                        // and and make the current item more visible:
                        addActive(list);
                    } else if (e.keyCode == 38) { //up
                        // If the arrow UP key is pressed, decrease the currentFocus variable:
                        currentFocus--;
                        // and and make the current item more visible:
                        addActive(list);
                    } else if (e.keyCode == 13) {
                        // If the ENTER key is pressed, prevent the form from being submitted,
                        e.preventDefault();
                        if (currentFocus > -1) {
                            // and simulate a click on the "active" item:
                            if (list) list[currentFocus].click();
                        }
                    }
                });
                function addActive(list) {
                    // A function to classify an item as "active":
                    if (!list) return false;
                    // Start by removing the "active" class on all items:
                    removeActive(list);
                    if (currentFocus >= list.length) currentFocus = 0;
                    if (currentFocus < 0) currentFocus = (list.length - 1);
                    // Add class "autocomplete-active":
                    list[currentFocus].classList.add("autocomplete-active");
                }
                function removeActive(list) {
                    // A function to remove the "active" class from all autocomplete items:
                    for (let i = 0, j = list.length; i < j; i++) {
                        list[i].classList.remove("autocomplete-active");
                    }
                }
                function closeAllLists(elmnt) {
                    // Close all autocomplete lists in the document,
                    // except the one passed as an argument:
                    let list = document.getElementsByClassName("autocomplete-items");
                    for (let i = 0, j = list.length; i < j; i++) {
                        if (elmnt !== list[i] && elmnt !== inp) {
                            list[i].parentNode.removeChild(list[i]);
                        }
                    }
                }
                // Binary search for needed words
                function findWords(first, last, letter) {
                    // if left only one element
                    if (last - first === 0) {
                        if (countries[last][0] != letter){
                            position = undefined;
                            return;
                        } else {
                            position = last;
                            return;
                        }
                    }
                    // Determine the middle of an subarray
                    let middle = (last + first) / 2;
                    if (Number.isInteger(middle)) {
                        middle -= 1;
                    } else {
                        middle = Math.floor(middle);
                    }
                    // If a first letter of middle positioned word in a subarray matchs a given letter
                    if (countries[middle][0] === letter) {
                        // Find the first word in an array that strats with a given letter
                        while ((middle - 1) >= 0 && countries[middle - 1][0] === letter) {
                            middle -= 1;
                        }
                        position = middle;
                        return;
                    // if a given letter before
                    } else if (letter < countries[middle][0]) {
                        // if a subarray consists of two elements, a middle will be equal to first
                        // therefor there is no longer elements on the left
                        if (first === middle) {
                            position = undefined;
                            return;
                        }
                        findWords(first, middle - 1, letter);
                    // or after
                    } else {
                        findWords(middle + 1, last, letter);
                    }
                }
                // Execute a function when someone clicks in the document:
                document.addEventListener("click", function (e) {
                    closeAllLists(e.target);
                });
            }
            // Load data only once after the first 'onfocus' event
            document.getElementById("country").addEventListener("focus", function callAjax() {
                loadDoc("/countries", callautocomplete);
                document.getElementById("country").removeEventListener("focus", callAjax);
            });
            // Common AJAX function for loading files
            function loadDoc(url, cFunction) {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        cFunction(this);
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
            // Custom function for AJAX
            function callautocomplete(xmlhttp) {
                countries = JSON.parse(xmlhttp.responseText).countries;
                // Initiate the autocomplete function on the "country_input" element,
                // and pass along the countries array as possible autocomplete values:
                autocomplete(document.getElementById("country"));
            }