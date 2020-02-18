const app = new Vue({
    el : '#myVue',
data:{
    user : '',
    data : [],
    allRepos: [],
    showLoadingIcon: false,
    userInfo : {},
},
methods:{
    search: async function() {
        this.showLoadingIcon = true;
        const targetURL ='https://api.github.com/users/' + this.user + '/repos';
        const options = {
            headers: new Headers({'Accept': 'application/vnd.github.v3+json'})
        };
        this.data = await fetch(targetURL,options)
            .then(res => res.json())
            .then(e => e) // .then(function(e) { return e; })
            .catch(err => err)
        this.userInfo = await fetch('https://api.github.com/users/'+this.user ,options)
                .then(res => res.json())
                .then(e => e) 
                .catch(err => err)    
            this.allRepos = [];
        for (let i = 0; i < this.data.length; i++) {
            let reposInRow = {};
            reposInRow.repoName = this.data[i].name;
            reposInRow.url = this.data[i].html_url;
            reposInRow.stars = this.data[i].stargazers_count;
            reposInRow.forks = this.data[i].forks_count;
            reposInRow.commits = 
                await fetch(this.data[i].commits_url.replace('{/sha}', ''),options)
                .then(res => res.json())
                .then(e => e.length)
                .catch(err => err)  
            this.allRepos.push(reposInRow);
        }
        this.showLoadingIcon = false;
    },
},
created: function() {
}
});