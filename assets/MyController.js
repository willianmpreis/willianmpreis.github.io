class MyController
{
    baseUrl = "https://api.github.com/users/";
    baseUser = "willianmpreis";
    profilePicture = '';
    birth = '1990-05-04';
    

    constructor()
    {
        this.getElements();
        this.render();
    }

    getElements()
    {
        this.avatar = document.querySelector("#avatar");
        this.title = document.querySelector("#title");
        this.age = document.querySelector('#age');
    }

    render()
    {
        this.ajax(`${this.baseUrl}${this.baseUser}`).then(response => {
            this.profilePicture = response.avatar_url;
            if (this.avatar) {
                this.avatar.style = `background-image: url(${this.profilePicture};)`;                
            }
            if (this.title) {
                this.title.innerHTML = 'Willian M. P. Reis';//response.bio;
            }
            if (this.age) {
                let age = this.calcAge(this.birth);
                this.age.innerHTML = `${age} anos`;
            }
        }).catch(err => {
            console.log(err);
        });
    }

    calcAge(dateString) {
       var birthday = +new Date(dateString);
       return ~~((Date.now() - birthday) / (31557600000));
    }

    ajax(url, method = 'GET', onprogress = () => {})
    {
        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();                
                ajax.open(method, url);

                ajax.onload = event => {
                    try {
                        resolve(JSON.parse(ajax.responseText))
                    } catch (e) {
                        reject(e)                        ;
                    }
                }

                ajax.onerror = event => {
                    reject(event);
                }

                ajax.send();
        });
    }
}