// Replace YOUR_ACCESS_KEY with your actual MediaStack access key
const ACCESS_KEY = '7291699a12ed86c7742e56fb89ba73b9';
//612900d31e2bf57bfeab937a6c7fa5ec

const blogDiv = document.getElementById('blog');

const queryString = new URLSearchParams({
  access_key: ACCESS_KEY
}).toString();

const URL = `http://api.mediastack.com/v1/news?${queryString}`;

async function fetchArticles(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status} - ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function displayArticles(data) {
  if (data.data.length === 0) {
    blogDiv.innerHTML = 'No articles found.';
    return;
  }

  const articlesHtml = data.data.map(article => {
    let imageHtml = '';
    if (article.image) {
      imageHtml = `<img src="${article.image}" alt="${article.title}">`;
    }
    else {
      imageHtml = `<p>${article.category.toUpperCase()}, ${article.language.toUpperCase()}, ${article.country.toUpperCase()}</p>`;
    }
    const description = article.description.slice(0, 150);
    return `
      <div>
        <h2>${article.title}</h2>
        ${imageHtml}
        <p class="date">Published on ${article.published_at}</p>
        <p>${description}...</p>
        <div class="button-container">
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      </div>
    `;
  }).join('');

  blogDiv.innerHTML = articlesHtml;
}

async function display() {
  const data = await fetchArticles(URL);
  await displayArticles(data);
}


display();
