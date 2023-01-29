// Empty variables.
let myCounter = 0
let myFolder = []
let myComments = []
let myLikes = []
let myMessages = []

// Function for adding items to the myComments array/session storage.
function addComment() {

    // Gets input value and checks something is in text.
    let field = document.getElementById('comment')
    let content = field.value
    field.value = field.defaultValue
    if (content.length == 0) {
        return alert("Please enter a comment.")
    }
    field = document.getElementById('name')
    let name = field.value
    field.value = field.defaultValue
    if (name.length == 0) {
        return alert("Please enter a name.")
    }
    // Joins the conmment and name.
    content = content + " - " + name

    // Checks to see if anything is in the "comments" sessionStorage
    if (sessionStorage.getItem("comments") !== null) {
        myComments = JSON.parse(sessionStorage.getItem("comments"))
    }
    // pushes entry to array and local.
    myComments.push(content)
    sessionStorage.setItem("comments", JSON.stringify(myComments))
    // reloads the page.
    location.reload()
    alert("Thank you for your comment!")
}

// to generate html <p> based on comments array
function commentsLoad () {
    let htmlSelect = document.getElementById("comment-box")

        if (sessionStorage.getItem("comments") !== null) {
            myComments = JSON.parse(sessionStorage.getItem("comments"))
        }
    myComments.forEach(function(ob) {
        // for each object in the array, it creates a list item.
        let listItem = document.createElement("p")
        listItem.innerHTML = ob
        htmlSelect.appendChild(listItem)
    })
}

// adding click function to all the "save" buttons.
let buttons = document.getElementsByClassName("save")
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", add)
}

// Function for adding items to the myFolder array/session storage.
function add(event) {

    let title = event.target.dataset.title
    let text = event.target.dataset.text
    let type = event.target.dataset.type
    let myItem = {
        title: title,
        text: text,
        type: type
    }

    // Checks to see if anything is in the "folder" sessionStorage
    if (sessionStorage.getItem("folder") !== null) {
        myFolder = JSON.parse(sessionStorage.getItem("folder"))
        myCounter = JSON.parse(sessionStorage.getItem("counter"))
    }

    // if nothing is in the array...
    if (myFolder.length == 0) {
        myCounter++
        myFolder.push(myItem)
        alert("You currently have " + myCounter + " item(s) in your folder.")
        sessionStorage.setItem("folder", JSON.stringify(myFolder))
        sessionStorage.setItem("counter", JSON.stringify(myCounter))
    } else {
        // Checks for matches. 
        for (let i = 0; i < myFolder.length; i++) {
            if(myFolder[i]["title"] == myItem["title"]) {
                // If a match is found in the array, it stops the function.
                return alert("This has already been added to the folder.")
            }
        }
        // If no matches are found...
        myCounter++
        myFolder.push(myItem)
        alert("You currently have " + myCounter + " item(s) in your folder.")
        sessionStorage.setItem("folder", JSON.stringify(myFolder))
        sessionStorage.setItem("counter", JSON.stringify(myCounter))
    }
}

// MyFolderLoad function.
function myFolderLoad() {
let htmlSelect = document.getElementById("folderlist")

if (sessionStorage.getItem("folder") !== null) {
    myFolder = JSON.parse(sessionStorage.getItem("folder"))
}

// forEach, accounting for photos and text.
myFolder.forEach(function(ob) {
    // for each object in the array, it creates a list item.
    let listItem = document.createElement("li")
    if (ob["type"] == "image") {
        listItem.innerHTML ='<picture><img src="' + ob.text + '" alt="' + ob.title +'" style="width:200px;"></picture><br><i>' + ob.title +"</i>"
    }
    else {
        listItem.innerHTML = ob.title + " " +  ob.text
    }
    htmlSelect.appendChild(listItem)
})
}

// Function for storing likes to the sessionStorage and for toggling the like to liked.
function toggleLike(button) {
    let page
    let val
    if (button.value == "Like") {
      button.value = "Liked"
      // The page that like is on. 
      page = button.id
      // the value "like" or "liked."
      val = button.value
    } else {
      button.value = "Like"
      page = button.id
      val = button.value
    }
    let like = {
        page: page,
        val: val}
    myLikes = like
    sessionStorage.setItem(page, JSON.stringify(myLikes))
}


// Function for adding items to the myMessage array/session storage, not sure where else the task wants me to send it!
function sendMessage() {
    // Gets input value.
    let field = document.getElementById('message')
    let text = field.value
    field.value = field.defaultValue
    if (text.length == 0) {
        return alert("Please enter a message.")
    }
    field = document.getElementById('name')
    let name = field.value
    field.value = field.defaultValue
    if (name.length == 0) {
        return alert("Please enter a name.")
    }
    //Gets the value of the "newsletter sub" radio.
    newsletter = document.querySelector('input[name="sub"]:checked').value
    if(newsletter == "Y") {
        newsletter = true 
    }
    else {
        newsletter = false
    }
    
    // Creates the message object.
    let message = {
        name: name,
        text: text,
        newsletter: newsletter
    }

    // Checks to see if anything is in the "message" sessionStorage
    if (sessionStorage.getItem("messages") !== null) {
        myMessages = JSON.parse(sessionStorage.getItem("messages"))
    }
    // Saves the message to the message array and sessionStroage.
    myMessages.push(message)
    sessionStorage.setItem("messages", JSON.stringify(myMessages))
    alert("Thank you for your message!")
}

// adds a global event listener for the load event.
window.addEventListener('load', likeLoad)
function likeLoad() {
    // selects the like class on the page.
    let htmlSelectForLike = document.querySelector(".like")
    if (sessionStorage.getItem(htmlSelectForLike.id) !== null) {
        myLikes = JSON.parse(sessionStorage.getItem(htmlSelectForLike.id))
        htmlSelectForLike.value = myLikes.val
    }
}

//For help on the contact radio form.
//https://www.codebrainer.com/blog/contact-form-in-javascript