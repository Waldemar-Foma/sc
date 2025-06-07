document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('main-nav');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        nav.setAttribute('aria-hidden', isExpanded);
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');
        });
    });

    document.addEventListener('click', function (e) {
        if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');
        }
    });
});

    const roleContent = {
        candidate: {
            heroTitle: "СОЗДАВАЙ КАРЬЕРУ С НАМИ",
            heroText: "SKILLSCOUT – УМНАЯ ПЛАТФОРМА ДЛЯ ПОИСКА РАБОТЫ",
            platformDesc: "Найдите компанию, где вас по-настоящему оценят, учитывая ваши профессиональные навыки и личностные качества",
            feature1Desc: "Автоматическая оценка эмоционального интеллекта, уверенности и коммуникативных навыков по видеовизитке",
            feature1Items: ["Анализ мимики и жестов", "Оценка тембра и тона голоса", "Определение уровня стрессоустойчивости"],
            feature2Desc: "Определение вашего MBTI-типа и ключевых черт характера по Big Five",
            traits: ["Экстраверсия", "Добросовестность"],
            feature3Desc: "Прогноз успешности работы в разных командах на основе культурного фита",
            compatibilityLabel: "Совместимость",
            steps: ["Создание профиля", "AI-анализ", "Подбор"],
            stepsText: [
                "Запишите видеовизитку по нашему шаблону и заполните профиль",
                "Наша система анализирует речь, мимику и содержание видео",
                "Работодатели находят вас по профессиональным и психологическим параметрам"
            ]
        },
        employer: {
            heroTitle: "НАЙДИТЕ ИДЕАЛЬНЫХ КАНДИДАТОВ",
            heroText: "SKILLSCOUT – УМНАЯ ПЛАТФОРМА ДЛЯ ПОДБОРА ПЕРСОНАЛА",
            platformDesc: "AI-платформа для оценки кандидатов по профессиональным навыкам и личностным качествам с помощью видеоанализа",
            feature1Desc: "Автоматическая оценка эмоционального интеллекта, уверенности и коммуникативных навыков кандидатов",
            feature1Items: ["Анализ поведения на видео", "Оценка речевых характеристик", "Выявление стрессоустойчивости"],
            feature2Desc: "Определение MBTI-типа кандидатов и ключевых черт характера по Big Five",
            traits: ["Командная работа", "Лидерские качества"],
            feature3Desc: "Прогноз успешности найма кандидатов в вашу команду на основе культурного фита",
            compatibilityLabel: "Соответствие",
            steps: ["Создание вакансии", "AI-анализ", "Подбор"],
            stepsText: [
                "Опишите вакансию и задайте критерии поиска",
                "Наша система анализирует кандидатов по сотням параметров",
                "Найдите идеальных сотрудников для вашей команды"
            ]
        }
    };

    // Переключение контента между ролями
    function switchContent(role) {
        const content = roleContent[role];
        
        document.getElementById('hero-title').textContent = content.heroTitle;
        document.getElementById('hero-text').textContent = content.heroText;
        document.getElementById('platform-description').textContent = content.platformDesc;
        
        document.getElementById('feature1-desc').textContent = content.feature1Desc;
        document.getElementById('feature1-item1').textContent = content.feature1Items[0];
        document.getElementById('feature1-item2').textContent = content.feature1Items[1];
        document.getElementById('feature1-item3').textContent = content.feature1Items[2];
        
        document.getElementById('feature2-desc').textContent = content.feature2Desc;
        document.getElementById('trait1-name').textContent = content.traits[0];
        document.getElementById('trait2-name').textContent = content.traits[1];
        
        document.getElementById('feature3-desc').textContent = content.feature3Desc;
        document.getElementById('compatibility-label').textContent = content.compatibilityLabel;
        
        for (let i = 0; i < 3; i++) {
            document.getElementById(`step${i+1}-title`).textContent = content.steps[i];
            document.getElementById(`step${i+1}-text`).textContent = content.stepsText[i];
        }
        
        updateRoleButtons(role);
    }

    // Обновление стилей кнопок ролей
    function updateRoleButtons(activeRole) {
        const candidateBtn = document.getElementById('candidate-btn');
        const employerBtn = document.getElementById('employer-btn');
        const ctaCandidateBtn = document.getElementById('cta-candidate-btn');
        const ctaEmployerBtn = document.getElementById('cta-employer-btn');

        const buttons = [
            { btn: candidateBtn, activeClass: activeRole === 'candidate' },
            { btn: employerBtn, activeClass: activeRole === 'employer' },
            { btn: ctaCandidateBtn, activeClass: activeRole === 'candidate' },
            { btn: ctaEmployerBtn, activeClass: activeRole === 'employer' }
        ];

        buttons.forEach(({ btn, activeClass }) => {
            if (btn) {
                if (activeClass) {
                    btn.classList.add('btn-primary');
                    btn.classList.remove('btn-outline');
                } else {
                    btn.classList.add('btn-outline');
                    btn.classList.remove('btn-primary');
                }
            }
        });
    }

    // Инициализация переключателей ролей
    function initRoleSwitchers() {
        document.getElementById('candidate-btn')?.addEventListener('click', function(e) {
            e.preventDefault();
            switchContent('candidate');
        });
        
        document.getElementById('employer-btn')?.addEventListener('click', function(e) {
            e.preventDefault();
            switchContent('employer');
        });
        
        document.getElementById('cta-candidate-btn')?.addEventListener('click', function(e) {
            e.preventDefault();
            switchContent('candidate');
        });
        
        document.getElementById('cta-employer-btn')?.addEventListener('click', function(e) {
            e.preventDefault();
            switchContent('employer');
        });
    }

    // Загрузка и предпросмотр видео
    const videoUpload = document.getElementById('video_resume');
    if (videoUpload) {
        videoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!file.type.match('video.*')) {
                showAlert('Пожалуйста, выберите видео файл (MP4, MOV, AVI)', 'error');
                this.value = '';
                return;
            }

            if (file.size > 100 * 1024 * 1024) {
                showAlert('Максимальный размер файла - 100MB', 'error');
                this.value = '';
                return;
            }

            const previewContainer = document.querySelector('.video-widget');
            const oldPreview = previewContainer.querySelector('.video-preview');
            if (oldPreview) oldPreview.remove();

            const preview = document.createElement('video');
            preview.controls = true;
            preview.className = 'video-preview';
            preview.innerHTML = 'Ваш браузер не поддерживает видео превью';

            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                previewContainer.insertBefore(preview, videoUpload.nextSibling);
                
                const info = document.createElement('div');
                info.className = 'video-info';
                info.innerHTML = `
                    <p>${file.name}</p>
                    <p>${(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                `;
                previewContainer.appendChild(info);
            }
            reader.readAsDataURL(file);
        });
    }

    // Информация о MBTI-типах
    const mbtiSelects = document.querySelectorAll('select[name="mbti_type"]');
    mbtiSelects.forEach(select => {
        select.addEventListener('change', function() {
            const description = getMBTIDescription(this.value);
            if (description) {
                showMBTITooltip(this, description);
            }
        });

        if (select.value) {
            const description = getMBTIDescription(select.value);
            if (description) {
                showMBTITooltip(select, description);
            }
        }
    });

    // Слайдеры характеристик
    const traitSliders = document.querySelectorAll('.trait-slider');
    traitSliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const value = this.value;
            const traitId = this.dataset.trait;
            updateTraitValue(traitId, value);
        });
    });

    // AJAX-формы
    const ajaxForms = document.querySelectorAll('form.ajax-form');
    ajaxForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitFormViaAJAX(this);
        });
    });

    // Анимация элементов при скролле
    const animateElements = () => {
        const elements = document.querySelectorAll('.card, .analysis-card, .step, .feature');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Инициализация анимации
    document.querySelectorAll('.card, .analysis-card, .step, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    // Анимация счетчика
    function animateCounter() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Скорость анимации
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                counter.classList.add('animating');
                setTimeout(() => {
                    counter.classList.remove('animating');
                    setTimeout(animateCounter, 1);
                }, 500);
            } else {
                counter.innerText = target;
            }
        });
    }

    async function loadWorkJoke() {
        const jokeElement = document.getElementById('joke');
        const funFactText = document.getElementById('fun-fact-text');
    }

    initRoleSwitchers();
    switchContent('candidate');
    window.addEventListener('scroll', animateElements);
    animateElements();
    loadWorkJoke();
    
    setTimeout(animateCounter, 1000);

function getMBTIDescription(type) {
    if (!type) return null;
    
    const descriptions = {
        "INTJ": {
            title: "INTJ (Стратег)",
            desc: "Аналитический и целеустремленный тип, который любит совершенствовать системы и процессы.",
            strengths: "Стратегическое мышление, независимость, решительность",
            weaknesses: "Излишняя критичность, нетерпимость к некомпетентности"
        },
        "INTP": {
            title: "INTP (Логик)",
            desc: "Инновационный и изобретательный ум, всегда ищущий новые способы понимания мира.",
            strengths: "Логика, креативность, открытость к новым идеям",
            weaknesses: "Неорганизованность, склонность к прокрастинации"
        },


    };
    
    return descriptions[type] || null;
}

function showMBTITooltip(element, data) {
    const existingTooltip = document.getElementById('mbti-tooltip');
    if (existingTooltip) existingTooltip.remove();

    const tooltip = document.createElement('div');
    tooltip.id = 'mbti-tooltip';
    tooltip.className = 'mbti-tooltip';
    tooltip.innerHTML = `
        <div class="mbti-tooltip-header">
            <h4>${data.title}</h4>
            <button class="close-tooltip">&times;</button>
        </div>
        <div class="mbti-tooltip-body">
            <p>${data.desc}</p>
            <div class="mbti-traits">
                <div class="mbti-strengths">
                    <h5>Сильные стороны:</h5>
                    <p>${data.strengths}</p>
                </div>
                <div class="mbti-weaknesses">
                    <h5>Слабые стороны:</h5>
                    <p>${data.weaknesses}</p>
                </div>
            </div>
        </div>
    `;

    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;

    tooltip.querySelector('.close-tooltip').addEventListener('click', function() {
        tooltip.remove();
    });

    document.body.appendChild(tooltip);

    setTimeout(() => {
        document.addEventListener('click', function closeTooltip(e) {
            if (!tooltip.contains(e.target) && e.target !== element) {
                tooltip.remove();
                document.removeEventListener('click', closeTooltip);
            }
        });
    }, 100);
}

function updateTraitValue(traitId, value) {
    const valueElement = document.querySelector(`.trait-value[data-trait="${traitId}"]`);
    if (valueElement) {
        valueElement.textContent = `${value}%`;
        
        const progressBar = document.querySelector(`.trait-progress[data-trait="${traitId}"]`);
        if (progressBar) {
            progressBar.style.width = `${value}%`;
            
            if (value < 30) {
                progressBar.style.backgroundColor = 'var(--error)';
            } else if (value < 70) {
                progressBar.style.backgroundColor = 'var(--accent-green)';
            } else {
                progressBar.style.backgroundColor = 'var(--primary-blue)';
            }
        }
    }
}

function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 500);
    }, 3000);
}

function submitFormViaAJAX(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showAlert(data.message || 'Успешно сохранено', 'success');
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } else {
            showAlert(data.message || 'Произошла ошибка', 'error');
        }
    })
    .catch(error => {
        showAlert('Ошибка сети. Попробуйте позже.', 'error');
        console.error('Error:', error);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
}
function copyEmail() {
    var email = document.getElementById("supportEmailText").innerText;
    navigator.clipboard.writeText(email)
        .then(function() {
            showOverlay();
        })
        .catch(function(err) {
            console.error('Не удалось скопировать: ', err);
            alert("Не удалось скопировать email.");
        });
}

function showOverlay() {
    var overlay = document.getElementById("copyOverlay");
    overlay.style.display = "block";
    setTimeout(function(){
        overlay.style.display = "none";
    }, 1000);
}
