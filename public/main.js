
// 文章
fetch('/api/posts')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('posts-container');
    const posts = data.posts;
    posts.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="excerpt"><a href="/posts/${post._id}">${post.content}</a></div>
        <small>${new Date(post.createdAt).toLocaleString()}</small>
        <div><a href="/postedit/${post._id}">Edit</a></div>
        <div><a href="/postdelete/${post._id}">Delete</a></div>
      `;
      container.appendChild(li);
    });
  });

// 專案
fetch('/api/projects')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('projects-container');
    const projects = data.project;
    projects.forEach(proj => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong><a href="/projects/${proj._id}" target="_blank">${proj.name}</a></strong>
        <p>${proj.description}</p>
      `;
      container.appendChild(li);
    });
  });

