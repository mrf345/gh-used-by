<h1>
    gh-used-by
    <a href='https://github.com/mrf345/gh-used-by/actions/workflows/ci.yml'>
        <img src='https://github.com/mrf345/gh-used-by/actions/workflows/ci.yml/badge.svg'>
    </a>
</h1>

Simple serverless wrapper to fetch a GitHub project dependents (Used-by) count, and generate shields.io badge. Do check [the live demo](https://used-by-cc7fc.web.app/)!


### Examples

<p align="center">
    <a href="https://github.com/facebook/react/network/dependents" target="_blank">
        <img src="https://used-by-cc7fc.web.app/badge?account=facebook&project=react&label=React&color=blue&logo=github" alt="React Badge" />
    </a>
    <a href="https://github.com/angular/angular/network/dependents" target="_blank">
        <img src="https://used-by-cc7fc.web.app/badge?account=angular&project=angular&label=Angular&color=red&logo=github" alt="Angular Badge" />
    </a>
    <a href="https://github.com/sveltejs/svelte/network/dependents" target="_blank">
        <img src="https://used-by-cc7fc.web.app/badge?account=sveltejs&project=svelte&label=Svelte&color=orange&logo=github" alt="Svelte Badge" />
    </a>
</p>

```html
<a href="https://github.com/facebook/react/network/dependents" target="_blank">
    <img src="https://used-by-cc7fc.web.app/badge?account=facebook&project=react&label=React&color=blue&logo=github" alt="React Badge" />
</a>
<a href="https://github.com/angular/angular/network/dependents" target="_blank">
    <img src="https://used-by-cc7fc.web.app/badge?account=angular&project=angular&label=Angular&color=red&logo=github" alt="Angular Badge" />
</a>
<a href="https://github.com/sveltejs/svelte/network/dependents" target="_blank">
    <img src="https://used-by-cc7fc.web.app/badge?account=sveltejs&project=svelte&label=Svelte&color=orange&logo=github" alt="Svelte Badge" />
</a>
```


### Self-hosting

This project's based on Firebase cloud functions and cloud hosting, to self-host it you'll need to create a Blaze account [here](https://firebase.google.com/pricing), then do the following:


1. create a new project and copy the project id (secondary header under the project name i.e `used-by-cc7fc`)
2. replace `used-by-cc7fc` in `.firebaserc` with your project id 
3. install `firebase-cli` [instructions](https://firebase.google.com/docs/cli)
4. run `firebase serve`, checkout http://localhost:5000/, and make sure everything works locally
5. finally deploy the project with `firebase deploy`
