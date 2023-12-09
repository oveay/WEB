window.addEventListener("load", function () {
  const commentSections = document.querySelectorAll(".comments-content")
  commentSections.forEach(loadComments)
});

function loadComments(commentSection) {
  setPreloader(commentSection)
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Exception");
      }
      return response.json();
    }).then(comments => {
    removePreloader(commentSection)
    const maxNum = Math.floor(Math.random() * comments.length)
    const commentsSlice = comments.slice(Math.floor(Math.random() * maxNum), maxNum)
    commentsSlice.forEach(comment => createComment(comment, commentSection))
  }).catch(function (reason) {
    console.log("The exception is because of " + reason)
    raiseError(commentSection);
  });
}

function createComment(commentData, commentSection) {
  const comment = document.createElement("div")
  comment.classList.add("comment")
  const user = document.createElement("div")
  user.classList.add("user")

  const userImg = document.createElement("img")
  userImg.classList.add("user__avatar")
  userImg.src = "img/profile_icon.png"

  const userName = document.createElement("h4")
  userName.classList.add("user__name")
  userName.classList.add("default-text")
  userName.textContent = commentData.email

  user.appendChild(userImg)
  user.appendChild(userName)

  const commentWrapper = document.createElement("div")
  commentWrapper.classList.add("comment__wrapper")
  const commentContent = document.createElement("p")
  commentContent.className = "comment__text comment__text_border default-text"
  commentContent.innerHTML = "<i>" + commentData.body + "</i>"

  commentWrapper.appendChild(commentContent)

  comment.appendChild(user)
  comment.appendChild(commentWrapper)
  commentSection.appendChild(comment)
}


function setPreloader(commentSection) {
  const preloader = document.createElement("div")
  preloader.innerHTML = "<svg version=\"1.1\" x=\"0\" y=\"0\" width=\"75px\" height=\"75px\" viewBox=\"-10 -10 240 240\"\n" +
    "                     enable-background=\"new 0 0 200 200\" xml:space=\"preserve\">\n" +
    "   <path\n" +
    "     class=\"circle\"\n" +
    "     d=\"M0,50 A50,50,0 1 1 100,50 A50,50,0 1 1 0,50\"\n" +
    "   />\n" +
    "</svg>"
  preloader.classList.add("loader")
  commentSection.appendChild(preloader)
}

function removePreloader(commentSection) {
  const loader = commentSection.querySelector(".loader")
  if (loader != null) {
    commentSection.removeChild(loader)
  }
}

function raiseError(commentSection) {
  removePreloader(commentSection)
  const errorElement = document.createElement("div")
  errorElement.classList.add("error")
  const errorContent = document.createElement("p")
  errorContent.classList.add("default-text")
  errorContent.textContent = "⚠ Что-то пошло не так"
  errorElement.appendChild(errorContent)
  commentSection.appendChild(errorElement)
}
