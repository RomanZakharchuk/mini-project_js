const getUser = JSON.parse(localStorage.getItem('user'));

const content = document.querySelector('.content'),
    title = document.querySelector('.title');

getUser.forEach(user => {
    const {id, name, username, email, phone, website} = user;
    const {street, suite, city, zipecode} = user.address;
    const {lat, lng} = user.address.geo;
    const {catchPhrase, bs} = user.company;

    const blockUser = document.createElement('div');
    blockUser.classList.add('wrap_user');
    blockUser.innerHTML = `
        <h1>ID: ${id}</h1>
        <h2>Name: ${name}</h2>
        <h2>User Name: ${username}</h2>
        <p>Email: ${email}</p>
        <span><b>Address:</b>
            <p>Street: ${street}</p>
            <p>Siute: ${suite}</p>
            <p>City: ${city}</p>
            <p>Zipcode: ${zipecode}</p>
        </span>
        <span><b>Geo:</b>
            <p>Lat: ${lat}</p>
            <p>Lng: ${lng}</p>
        </span>
        <p>Phone: ${phone}</p>
        <p>Website: ${website}</p>
        <span><b>Company:</b>
            <p>Name: ${user.company.name}</p>
            <p>Catch Phrase: ${catchPhrase}</p>
            <p>Bs: ${bs}</p>
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
                        const {title} = post;

                        const blockTitle = document.createElement('div');
                        blockTitle.classList.add('wrapper');
                        blockTitle.innerHTML = `
                            <p>Title: ${title}</p>
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