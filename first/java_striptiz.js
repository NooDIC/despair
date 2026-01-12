const slider = document.getElementById('slider');
const progress = document.getElementById('progress');

const buttons = document.querySelectorAll('nav input[name="slider-nav"]');
const groups = document.querySelectorAll('.slider-group');

function showGroup(index) {
    groups.forEach((group, i) => {
        group.style.display = i === index ? 'flex' : 'none';
    });

    // сбрасываем скролл и прогресс
    slider.scrollLeft = 0;
    requestAnimationFrame(updateProgress);
}

function updateProgress() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (maxScroll <= 0) {
        progress.style.width = '100%';
        return;
    }

    const percent = (slider.scrollLeft / maxScroll) * 100;
    progress.style.width = `${percent}%`;
}

slider.addEventListener('scroll', updateProgress);

// стартовое состояние
showGroup(0);

// переключение сезонов
buttons.forEach((btn, i) => {
    btn.addEventListener('change', () => showGroup(i));
});




// стрелки
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// величина шага (карточка + gap)
function getScrollStep() {
    const card = slider.querySelector('.art');
    if (!card) return slider.clientWidth;
    const gap = parseInt(getComputedStyle(slider).columnGap || 24);
    return card.offsetWidth + gap;
}

prevBtn.addEventListener('click', () => {
    slider.scrollBy({
        left: -getScrollStep(),
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    slider.scrollBy({
        left: getScrollStep(),
        behavior: 'smooth'
    });
});

function updateArrows() {
    prevBtn.disabled = slider.scrollLeft <= 0;
    nextBtn.disabled =
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;
}

slider.addEventListener('scroll', () => {
    updateProgress();
    updateArrows();
});

// после смены сезона
function showGroup(index) {
    groups.forEach((group, i) => {
        group.style.display = i === index ? 'flex' : 'none';
    });

    slider.scrollLeft = 0;

    requestAnimationFrame(() => {
        updateProgress();
        updateArrows();
    });
}
// смена изображений
const main = document.getElementById('mainImage');
const thumbs = document.getElementById('thumbs')

thumbs.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;

    const oldMain = main.src;

    main.src = img.src;

    const btn = img.closest('button');
    btn.remove();

    const newBtn = document.createElement('button');
    newBtn.className = 'sec3';

    const newImg = document.createElement('img');
    newImg.src = oldMain;
    newImg.alt = 'thumb';

    newBtn.appendChild(newImg);
    thumbs.appendChild(newBtn);
});

// проверка инпутов
const form = document.getElementById('tourForm');
const error = document.getElementById('formError');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    let isValid = true;

    for (let value of formData.values()) {
        if (!value.trim()) {
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        error.classList.remove('hidden');
        success.classList.add('hidden');
        return;
    }

    // имитация успешной отправки
    error.classList.add('hidden');
    success.classList.remove('hidden');

    // очистка формы
    form.reset();
});