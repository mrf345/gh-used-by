const defaultBadge = {
    account: 'facebook',
    project: 'react',
    label: 'Dependents',
    bgColor: 'blue',
    logo: 'github',
};

document.addEventListener('DOMContentLoaded', (event) => {
    updateBadge();
});

document.querySelectorAll('form input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            updateBadgeFromInput();
        }
    }); 
});

function updateBadge(
    account = defaultBadge.account,
    project = defaultBadge.project,
    label = defaultBadge.label,
    bgColor = defaultBadge.bgColor,
    logo = defaultBadge.logo,
) {
    const badge = document.querySelector('#badge');
    const colorEle = document.querySelector('#color');
    const labelEle = document.querySelector('#label');
    const logoEle = document.querySelector('#logo');
    const accountEle = document.querySelector('#account');
    const projectEle = document.querySelector('#project');
    const htmlEle = document.querySelector('#html');
    const urlEle = document.querySelector('#url');
    const url = (
        window.location + `badge?account=${account}` +
        `&project=${project}&label=${label}&color=${bgColor}&logo=${logo}`
    );
    const html = [
        `<a href="https://github.com/${account}/${project}/network/dependents" target="_blank">`,
        `   <img src="${url}" alt="${label} Badge" />`,
        '</a>'
    ].join('\n');

    badge.innerHTML = html;
    urlEle.value = url;
    htmlEle.value = html;
    colorEle.value = bgColor;
    labelEle.value = label;
    logoEle.value = logo;
    accountEle.value = account;
    projectEle.value = project;
}

function updateBadgeFromInput() {
    const form = document.querySelector('form');
    
    if (form.checkValidity()) {
        updateBadge(
            document.querySelector('#account').value,
            document.querySelector('#project').value,
            document.querySelector('#label').value,
            document.querySelector('#color').value,
            document.querySelector('#logo').value,
        );   
    } else {
        form.reportValidity();
    }
}

function copyUrl() {
    const url = document.querySelector('#url');
    navigator.clipboard.writeText(url.value);
}

function copyHtml() {
    const url = document.querySelector('#html');
    navigator.clipboard.writeText(url.value);
}
