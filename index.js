// template_22xcffh
// service_pam1byf
// wKUaX5G9BLSi9hqyy

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.modal__overlay--loading');
    const success = document.querySelector('.modal__overlay--success');
    loading.classList += " modal__overlay--visible";
    emailjs
        .sendForm(
            'service_pam1byf',
            'template_22xcffh',
            event.target,
            'wKUaX5G9BLSi9hqyy'
    )
    .then(() => {
        loading.classList.remove("modal__overlay--visible");
        success.classList += " modal__overlay--visible"
    })
    .catch (() => {
        loading.classList.remove("modal__overlay--visible");
        alert(
            "The email service is temporarily unavailable. Please contact me directly on isaacfunes@icloud.com"
        );
    });
}

let isModalOpen = false;
function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false;
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = true;
    document.body.classList += " modal--open";
}