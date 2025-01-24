// Mock user data and posts
let users = [];
let posts = [];
let currentUser = null;

// Utility functions
const showPage = (pageId) => {
  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("hidden");
  });
  document.getElementById(pageId).classList.remove("hidden");
};

const renderPosts = () => {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";
  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <h3>${post.user}</h3>
      <p>${post.content}</p>
      <button onclick="likePost(${index})">Like (${post.likes})</button>
    `;
    postsContainer.appendChild(postElement);
  });
};

// Event Handlers
document.getElementById("loginPageBtn").addEventListener("click", () => {
  showPage("loginPage");
});

document.getElementById("registerPageBtn").addEventListener("click", () => {
  showPage("registerPage");
});

document.getElementById("postsPageBtn").addEventListener("click", () => {
  showPage("postsPage");
  renderPosts();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  currentUser = null;
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("postsPageBtn").style.display = "none";
  document.getElementById("loginPageBtn").style.display = "inline-block";
  document.getElementById("registerPageBtn").style.display = "inline-block";
  showPage("loginPage");
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (users.some((user) => user.email === email)) {
    document.getElementById("registerError").classList.remove("hidden");
    return;
  }

  users.push({ name, email, password });
  alert("Registration successful!");
  showPage("loginPage");
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    document.getElementById("loginError").classList.remove("hidden");
    return;
  }

  currentUser = user;
  document.getElementById("loginPageBtn").style.display = "none";
  document.getElementById("registerPageBtn").style.display = "none";
  document.getElementById("logoutBtn").style.display = "inline-block";
  document.getElementById("postsPageBtn").style.display = "inline-block";
  showPage("postsPage");
});

document.getElementById("createPostForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const content = document.getElementById("postContent").value;
  posts.unshift({ user: currentUser.name, content, likes: 0 });
  document.getElementById("postContent").value = "";
  renderPosts();
});

window.likePost = (index) => {
  posts[index].likes += 1;
  renderPosts();
};