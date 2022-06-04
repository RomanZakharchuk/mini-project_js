const getPost = JSON.parse(localStorage.getItem('post'));

const content = document.querySelector('.content');
const wrapComments = document.querySelector('.wrap-comments');

getPost.forEach(post => {
    const blockPost = document.createElement('div');
    blockPost.classList.add('wrap_post');
    blockPost.innerHTML = `
        <h1>User ID: ${post.userId}</h1>
        <h2>Id: ${post.id}</h2>
        <h2>Title: ${post.title}</h2>
        <p><b>Body:</b> ${post.body}</p>
    `;
    content.appendChild(blockPost);

    const btn = document.createElement('button');
    btn.style.width = '90%';
    btn.innerText = 'Show all comments';
    blockPost.appendChild(btn);

    btn.addEventListener('click', () => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(value => {
                value.forEach(comment => {
                    if (comment.postId === post.userId) {
                        const blockComment = document.createElement('div');
                        blockComment.classList.add('item-comments');
                        blockComment.innerHTML = `
                            <h1>Id: ${comment.id}</h1>
                            <h2>Name: ${comment.name}</h2>
                            <p>Email: ${comment.email}</p>
                            <p>Comment: ${comment.body}</p>
                       `;
                        wrapComments.appendChild(blockComment);
                    }
                })
            });
    });
});
