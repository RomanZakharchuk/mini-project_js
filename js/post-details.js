const getPost = JSON.parse(localStorage.getItem('post'));

const content = document.querySelector('.content'),
    wrapComments = document.querySelector('.wrap-comments');

getPost.forEach(post => {
    const {userId, id, title, body} = post;

    const blockPost = document.createElement('div');
    blockPost.classList.add('wrap_post');
    blockPost.innerHTML = `
        <h1>User ID: ${userId}</h1>
        <h2>Id: ${id}</h2>
        <h2>Title: ${title}</h2>
        <p><b>Body:</b> ${body}</p>
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
                    if (comment.postId === userId) {
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
