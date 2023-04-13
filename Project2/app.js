// Replace YOUR_ACCESS_KEY with your actual MediaStack access key
const ACCESS_KEY = '612900d31e2bf57bfeab937a6c7fa5ec';

const blogDiv = document.getElementById('blog');

const queryString = new URLSearchParams({
  access_key: ACCESS_KEY
}).toString();

const URL = `http://api.mediastack.com/v1/news?${queryString}`;


fetch(URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.data.length === 0) {
      blogDiv.innerHTML = 'No articles found.';
      return;
    }

    let articlesHtml = '';

    data.data.forEach(article => {
      let imageHtml = '';
      if (article.image) {
        imageHtml = `<img src="${article.image}" alt="${article.title}">`;
      }
      const description = article.description.slice(0, 150); // Limit to 150 characters
      articlesHtml += `
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
    });
    

    blogDiv.innerHTML = articlesHtml;
  })
  .catch(error => console.error(error));