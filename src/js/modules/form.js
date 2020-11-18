import {postData} from "../services/requests";

export default class Form {
    constructor(containerNumber = 0) {
        this.form = document.querySelectorAll('.form')[containerNumber];
        this.inputs = this.form.querySelectorAll('input');
        this.selects = this.form.querySelectorAll('select');
        this.emailInput = this.form.querySelector('[name="email"]');
    }

    // Очистка полей ввода и сброс select'ов
    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });

        this.selects.forEach(item => {
            item.selectedIndex = 0;
        });
    }

    // Проверка поля email по нажатию, вставке и вводу. Принимает только английский
    checkEmail() {
        const events = ['keypress', 'paste', 'input'];

        events.forEach(event => {
            this.emailInput.addEventListener(event, () => {
                if (event === 'keypress') {
                    this.emailInput.addEventListener(event, (e) => {
                        if (e.key.match(/[^a-z 0-9]/ig)) {
                            e.preventDefault();
                        }
                    });
                } else if (event === 'paste') {
                    this.emailInput.addEventListener(event, (e) => {
                        if (e.clipboardData.getData('text').match(/[^a-z 0-9]/ig)) {
                            e.preventDefault();
                        }
                    });
                } else if (event === 'input') {
                    this.emailInput.addEventListener(event, () => {
                        if (this.emailInput.value.match(/[а-я]/ig)) {
                            this.emailInput.value = '';
                        }
                    });
                }
            });
        });
    }

    postData() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = {
                loading: 'Загрузка...',
                success: 'Спасибо, мы с вами свяжемся',
                failure: 'Ошибка',
                spinner: 'assets/img/spinner.gif',
                ok: 'assets/img/ok.png',
                fail: 'assets/img/fail.png'
            };

            let statusMessage = document.createElement('div');
            this.form.parentNode.appendChild(statusMessage);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusImg.style.display = 'block';
            statusImg.style.margin = '0 auto';
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.style.cssText = `
                color: white;
                font-size: 16px;
                font-family: arial;
                font-weight: 400;
                text-align: center;
            `;
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(this.form);

            postData('../assets/question.php', formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure
                })
                .finally(() => {
                    this.clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        statusImg.classList.remove('fadeInUp');
                        statusImg.classList.add('fadeOutUp');
                    }, 5000);
                });
        });
    }

    init() {
        this.checkEmail();
        this.postData();
    }
}