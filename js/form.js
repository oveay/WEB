function applyResizing(image, imageSource) {
  image.src = imageSource;
  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = 1730;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    image.src = canvas.toDataURL()
  }
}

async function loadImage(imageData) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageData);
    reader.onload = function () {
      console.log("Image data is loaded")
      resolve(reader.result);
    }
  });
}

function createArticle(article) {

  const card = document.createElement("div");
  card.classList.add("article", "article_border");

  const content = document.createElement("div");
  content.classList.add("article__content");

  const photoContent = document.createElement("div");
  photoContent.classList.add("article-photo-content");

  const img = document.createElement("img");
  img.classList.add("article__photo");
  if (article.imgSrc != null) {
    applyResizing(img, article.imgSrc);
  }
  img.alt = "Здесь должно было быть фото";

  const description = document.createElement("div");
  description.classList.add("article__description");

  const descriptionText = document.createElement("p");
  descriptionText.classList.add("default-text");
  descriptionText.textContent = article.articleText;

  const title = document.createElement("h2");
  title.classList.add("article__name", "default-text");
  title.innerHTML = `<b>${article.articleTitle}</b>`;

  const eventInfo = document.createElement("div");
  eventInfo.classList.add("event-info");

  const eventDateInfo = document.createElement("div");
  eventDateInfo.classList.add("event-info__date", "default-text");
  eventDateInfo.innerHTML = `Дата: <span>${article.eventDate}</span>`;

  const eventLocationInfo = document.createElement("div");
  eventLocationInfo.classList.add("event-info__location", "default-text");
  eventLocationInfo.innerHTML = `Место проведения: <span>${article.eventLocation}</span>`;

  const eventViewsInfo = document.createElement("div");
  eventViewsInfo.classList.add("event-info__views", "default-text");
  eventViewsInfo.innerHTML = `Просмотры: <span>0</span>`;

  const articleComments = document.createElement('div')
  articleComments.classList.add('article__comments')
  const commentsHeader = document.createElement('h3')
  commentsHeader.classList.add('default-text')
  commentsHeader.textContent = "Комментарии"
  const comments = document.createElement('div')
  comments.classList.add('comments-content')

  articleComments.appendChild(commentsHeader)
  articleComments.appendChild(comments)

  description.appendChild(descriptionText);
  photoContent.appendChild(img);
  photoContent.appendChild(description);

  eventInfo.appendChild(eventDateInfo);
  eventInfo.appendChild(eventLocationInfo);
  eventInfo.appendChild(eventViewsInfo);

  content.appendChild(photoContent);
  content.appendChild(title);
  content.appendChild(eventInfo);

  card.appendChild(content);
  card.appendChild(articleComments)

  document.querySelector(".articles-container").appendChild(card);
}

window.addEventListener("load", function () {
  let items = JSON.parse(localStorage.getItem("cards")) || []
  items.forEach(createArticle)

  let form = document.getElementById('create-form')
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const imageArr = document.getElementById("input-photo").files;
    const articleText = document.getElementById("input-text").value;
    const articleTitle = document.getElementById("input-name").value;
    const eventDate = document.getElementById("input-date").value;
    const eventLocation = document.getElementById("input-location").value;

    let imageSrc = null

    const article = {
      imgSrc: imageSrc,
      articleText: articleText,
      articleTitle: articleTitle,
      eventDate: eventDate,
      eventLocation: eventLocation,
    };

    if (imageArr.length > 0) {
      article.imgSrc = await loadImage(imageArr[0])
    }

    createArticle(article)
    let items = JSON.parse(localStorage.getItem("cards")) || []
    items.push(article)
    localStorage.setItem("cards", JSON.stringify(items));

    document.getElementById("create-form").reset();
  });
});
