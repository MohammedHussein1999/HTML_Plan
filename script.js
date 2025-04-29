document.addEventListener('DOMContentLoaded', function() {
    // كود تبديل الوضع الليلي
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    // تحميل تفضيل المستخدم أو النظام
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme)) {
        document.documentElement.classList.add('dark');
        if (darkModeIcon) darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const html = document.documentElement;
            html.classList('dark').toggle;
            localStorage.setItem('theme', 'light');
            if (darkModeIcon) {
                darkModeIcon.classList.toggle('fa-sun');
                darkModeIcon.classList.toggle('fa-moon');
            }
        });
    }

    // بيانات الحصص مع إضافة خاصية الواجب (homework)
    const sessionsData = [
        { week: 1, number: 1, title: "مقدمة عن الويب وHTML", type: "theory", desc: "ما هو الإنترنت؟ شرح محررات الأكواد والمتصفحات، ما هي HTML ولماذا نستخدمها، مقارنة بين HTML4 وHTML5، الأدوات المطلوبة", icon: "fa-globe", completed: false, homework: "بحث عن تاريخ HTML" },
        { week: 1, number: 2, title: "الهيكل الأساسي لصفحة HTML", type: "theory", desc: "العناصر الأساسية: html, head, body, title، كتابة أول صفحة HTML يدوياً، شرح أهمية تقسيم الصفحة", icon: "fa-code", completed: false, homework: "إنشاء صفحة HTML بسيطة" },
        { week: 1, number: 3, title: "عناوين الصفحات والفقرات", type: "practice", desc: "الوسوم h1 إلى h6، الفقرة p، السطر الجديد br والخط الأفقي hr، التعليقات في HTML", icon: "fa-heading", completed: false, homework: "كتابة صفحة بها جميع العناوين والفقرات" },
        { week: 1, number: 4, title: "تنسيق النصوص", type: "practice", desc: "الوسوم: strong, em, b, i, u, mark, small, del, ins", icon: "fa-font", completed: false, homework: "تجربة تنسيقات النصوص المختلفة" },
        { week: 2, number: 5, title: "الروابط التشعبية", type: "practice", desc: "وسم a واستخدام href, target، روابط داخلية وخارجية، ربط صفحات الموقع ببعضها", icon: "fa-link", completed: false, homework: "إنشاء صفحة بها روابط داخلية وخارجية" },
        { week: 2, number: 6, title: "إدراج الصور", type: "practice", desc: "وسم img واستخدام src, alt, width, height", icon: "fa-image", completed: false, homework: "إضافة صورة مع نص بديل" },
        { week: 2, number: 7, title: "القوائم المرتبة وغير المرتبة", type: "practice", desc: "الوسوم ul, ol, li، القوائم المتداخلة", icon: "fa-list-ol", completed: false, homework: "كتابة قائمة مرتبة وغير مرتبة" },
        { week: 2, number: 8, title: "المراجعة الأولى وتطبيق عملي", type: "review", desc: "تطبيق كامل باستخدام ما سبق، مراجعة عامة", icon: "fa-book-open", completed: false, homework: "تطبيق عملي شامل لما سبق" },
        { week: 3, number: 9, title: "الجداول", type: "theory", desc: "وسم table، الصفوف tr، الأعمدة td وth، thead, tbody, tfoot، دمج الأعمدة والصفوف", icon: "fa-table", completed: false, homework: "إنشاء جدول بيانات طلاب" },
        { week: 3, number: 10, title: "خصائص إضافية في الجداول", type: "practice", desc: "تطبيق كامل باستخدام الجداول، مراجعة خاصة بالجداول", icon: "fa-table", completed: false, homework: "تصميم جدول بخصائص مدمجة" },
        { week: 3, number: 11, title: "النماذج - الجزء الأول", type: "theory", desc: "وسم form، input بأنواعه: نص، بريد، رقم، كلمة مرور، label, placeholder, required", icon: "fa-window-maximize", completed: false, homework: "إنشاء نموذج تسجيل" },
        { week: 3, number: 12, title: "النماذج - الجزء الثاني", type: "practice", desc: "عناصر الإدخال الأخرى: textarea, select, option, button، إرسال البيانات action, method", icon: "fa-window-maximize", completed: false, homework: "إضافة textarea وselect للنموذج" },
        { week: 4, number: 13, title: "الوسائط المتعددة", type: "practice", desc: "إدراج الصوت audio، إدراج الفيديو video، التحكم في الخصائص (تشغيل تلقائي، تحكم، تكرار)", icon: "fa-photo-film", completed: false, homework: "إدراج ملف صوتي وفيديو" },
        { week: 4, number: 14, title: "عناصر التخطيط في HTML5", type: "theory", desc: "الهيكلة الحديثة: header, nav, main, article, section, aside, footer", icon: "fa-layer-group", completed: false, homework: "تقسيم صفحة باستخدام عناصر التخطيط" },
        { week: 4, number: 15, title: "الإطارات والعناصر المضمنة", type: "practice", desc: "وسم iframe (دمج Google Maps أو YouTube)، الفرق بين العناصر block و inline", icon: "fa-window-restore", completed: false, homework: "إضافة iframe لصفحة خارجية" },
        { week: 4, number: 16, title: "مشروع ختامي + مراجعة شاملة", type: "project", desc: "مشروع نهائي: تصميم صفحة شخصية أو موقع تعريفي، مراجعة شاملة لكل ما تم تغطيته", icon: "fa-trophy", completed: false, homework: "تنفيذ مشروع نهائي" }
    ];

    const sessionsContainer = document.getElementById('sessions-container');
    const progressFill = document.getElementById('progress-fill');
    const completedCount = document.getElementById('completed-count');
    const statsCompleted = document.getElementById('stats-completed');
    const statsRemaining = document.getElementById('stats-remaining');
    const searchInput = document.getElementById('search-input');
    const typeFilter = document.getElementById('type-filter');
    const weekFilter = document.getElementById('week-filter');
    const statusFilter = document.getElementById('status-filter');

    let completedSessions = 0;

    // Load saved completion status from localStorage
    function loadCompletionStatus() {
        sessionsData.forEach(session => {
            const savedStatus = localStorage.getItem(`session-${session.number}-completed`);
            if (savedStatus === 'true') {
                session.completed = true;
                completedSessions++;
            }
        });
        updateProgress();
    }

    // Render sessions based on filters
    function renderSessions() {
        sessionsContainer.innerHTML = '';

        const searchTerm = searchInput.value.toLowerCase();
        const typeFilterValue = typeFilter.value;
        const weekFilterValue = weekFilter.value;
        const statusFilterValue = statusFilter.value;

        sessionsData
            .filter(session => {
                // Apply search filter
                if (searchTerm && 
                    !session.title.toLowerCase().includes(searchTerm) && 
                    !session.desc.toLowerCase().includes(searchTerm) &&
                    !(session.homework && session.homework.toLowerCase().includes(searchTerm))) {
                    return false;
                }

                // Apply type filter
                if (typeFilterValue !== 'all' && session.type !== typeFilterValue) {
                    return false;
                }

                // Apply week filter
                if (weekFilterValue !== 'all' && session.week.toString() !== weekFilterValue) {
                    return false;
                }

                // Apply status filter
                if (statusFilterValue === 'completed' && !session.completed) {
                    return false;
                }
                if (statusFilterValue === 'incomplete' && session.completed) {
                    return false;
                }

                return true;
            })
            .forEach(session => {
                const sessionCard = document.createElement('div');
                sessionCard.className = `session-card bg-white dark:bg-dark-200 rounded-xl shadow-sm dark:shadow-none overflow-hidden border border-gray-200 dark:border-dark-300 hover:shadow-md dark:hover:shadow-none ${session.completed ? 'border-green-200 dark:border-green-800' : ''}`;

                // Determine type color class
                let typeColorClass = '';
                switch(session.type) {
                    case 'theory': typeColorClass = 'type-theory'; break;
                    case 'practice': typeColorClass = 'type-practice'; break;
                    case 'project': typeColorClass = 'type-project'; break;
                    case 'review': typeColorClass = 'type-review'; break;
                }

                const homeworkHtml = session.homework ? `
                    <div class='mt-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700'><span class='block text-xs font-bold text-yellow-700 dark:text-yellow-200 mb-1'>الواجب:</span><span class='block text-sm text-gray-800 dark:text-gray-100'>${session.homework}</span></div>
                ` : '';

                sessionCard.innerHTML = `
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <span class="text-xs font-medium px-2 py-1 rounded ${typeColorClass}">
                                    ${getTypeName(session.type)}
                                </span>
                            </div>
                            <span class="text-xs font-medium text-gray-500 dark:text-gray-400">الأسبوع ${session.week} - الحصة ${session.number}</span>
                        </div>
                        <h3 class="font-bold text-lg mb-2 dark:text-gray-100">${session.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${session.desc}</p>
                        ${homeworkHtml}
                        <div class="flex items-center justify-between mt-4">
                            <div class="flex items-center gap-2">
                                <i class="fas ${session.icon} text-primary dark:text-primary-300"></i>
                                <span class="text-xs text-gray-500 dark:text-gray-400">${session.type === 'project' ? 'مشروع' : 'حصة'} ${session.number}</span>
                            </div>
                            <button onclick="toggleCompletion(this, ${session.number})" class="px-3 py-1 rounded-lg text-sm font-medium ${session.completed ? 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300' : 'bg-gray-100 dark:bg-dark-300 text-gray-800 dark:text-gray-300'}">
                                ${session.completed ? 'مكتملة <i class=\"fas fa-check ml-1\"></i>' : 'إكمال <i class=\"fas fa-plus ml-1\"></i>'}
                            </button>
                        </div>
                    </div>
                    <div class="px-5 py-3 border-t border-gray-100 dark:border-dark-300 bg-gray-50 dark:bg-dark-300 flex items-center justify-between">
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            ${getLevel(session.number)}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            ${session.completed ? 'تم الإكمال' : 'لم تكتمل بعد'}
                        </div>
                    </div>
                `;

                sessionsContainer.appendChild(sessionCard);
            });
    }

    // Helper function to get type name
    function getTypeName(type) {
        switch(type) {
            case 'theory': return 'حصة نظرية';
            case 'practice': return 'حصة تطبيقية';
            case 'project': return 'مشروع عملي';
            case 'review': return 'مراجعة شاملة';
            default: return type;
        }
    }

    // Helper function to get level
    function getLevel(sessionNumber) {
        if (sessionNumber < 5) return 'مبتدئ';
        if (sessionNumber < 12) return 'متوسط';
        return 'متقدم';
    }

    // Update progress
    function updateProgress() {
        const percentage = (completedSessions / 16) * 100;
        progressFill.style.width = `${percentage}%`;
        completedCount.textContent = completedSessions;
        statsCompleted.textContent = completedSessions;
        statsRemaining.textContent = 16 - completedSessions;
    }

    // Make function available globally
    window.toggleCompletion = function(button, sessionNumber) {
        const session = sessionsData.find(s => s.number === sessionNumber);
        session.completed = !session.completed;
        // Save to localStorage
        localStorage.setItem(`session-${sessionNumber}-completed`, session.completed);
        if (session.completed) {
            completedSessions++;
        } else {
            completedSessions--;
        }
        updateProgress();
        renderSessions();
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-white dark:bg-dark-200 shadow-lg rounded-lg px-4 py-2 border-l-4 border-green-500 dark:border-green-600 flex items-center gap-2 animate-fade-in';
        notification.innerHTML = `
            <i class="fas ${session.completed ? 'fa-check-circle text-green-500 dark:text-green-400' : 'fa-times-circle text-red-500 dark:text-red-400'}"></i>
            <span class="dark:text-gray-200">تم ${session.completed ? 'إكمال' : 'إلغاء إكمال'} الحصة ${sessionNumber}</span>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('animate-fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    };

    // Initialize
    loadCompletionStatus();
    renderSessions();

    // Add event listeners for filters
    searchInput.addEventListener('input', renderSessions);
    typeFilter.addEventListener('change', renderSessions);
    weekFilter.addEventListener('change', renderSessions);
    statusFilter.addEventListener('change', renderSessions);
});
