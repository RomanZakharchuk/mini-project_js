const getUser = JSON.parse(localStorage.getItem('user'));

const content = document.querySelector('.content');
const title = document.querySelector('.title');

getUser.forEach(user => {
    const blockUser = document.createElement('div');
    blockUser.classList.add('wrap_user');
    blockUser.innerHTML = `
        <h1>ID: ${user.id}</h1>
        <h2>Name: ${user.name}</h2>
        <h2>User Name: ${user.username}</h2>
        <p>Email: ${user.email}</p>
        <span><b>Address:</b>
            <p>Street: ${user.address.street}</p>
            <p>Siute: ${user.address.suite}</p>
            <p>City: ${user.address.city}</p>
            <p>Zipcode: ${user.address.zipecode}</p>
        </span>
        <span><b>Geo:</b>
            <p>Lat: ${user.address.geo.lat}</p>
            <p>Lng: ${user.address.geo.lng}</p>
        </span>
        <p>Phone: ${user.phone}</p>
        <p>Website: ${user.website}</p>
        <span><b>Company:</b>
            <p>Name: ${user.company.name}</p>
            <p>Catch Phrase: ${user.company.catchPhrase}</p>
            <p>Bs: ${user.company.bs}</p>
        </span>
    `;
    content.appendChild(blockUser);

    const btn = document.createElement('button');
    btn.innerText = 'Post of current user';
    btn.classList.add('btn');
    blockUser.appendChild(btn);

    btn.addEventListener('click', () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(value => {
                value.forEach(post => {
                    if (post.userId === user.id) {
                        const blockTitle = document.createElement('div');
                        blockTitle.classList.add('wrapper');
                        blockTitle.innerHTML = `
                            <p>Title: ${post.title}</p>
                       `;
                        title.appendChild(blockTitle);

                        const link = document.createElement('a');
                        link.href = 'post-details.html';
                        link.target = '_blank';
                        link.disabled = true;
                        link.innerText = 'Post details';
                        blockTitle.appendChild(link);

                        let selectedPost = [];

                        link.addEventListener('click', () => {
                            selectedPost.push(post);
                            localStorage.setItem('post', JSON.stringify(selectedPost));
                        });
                    }
                });
            });
    });
});