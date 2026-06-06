// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 导航平滑滚动
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 导航栏滚动效果
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 回到顶部按钮
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 技能标签hover效果
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // 项目卡片hover效果
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px)';
      this.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
    });
  });

  // 技能卡片hover效果
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = 'none';
    });
  });

  // 滚动动画观察器
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // 如果是数字元素，触发数字动画
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          animateNumber(counter);
        });
        
        // 如果是进度条，触发进度条动画
        const progressBars = entry.target.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          animateProgressBar(bar);
        });
      }
    });
  }, observerOptions);

  // 观察所有需要动画的元素
  const animateElements = document.querySelectorAll('.scroll-animate');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // 数字动画函数
  function animateNumber(element) {
    if (element.classList.contains('animated')) return;
    element.classList.add('animated');
    
    const target = parseInt(element.dataset.target) || 100;
    const duration = parseInt(element.dataset.duration) || 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, duration / steps);
  }

  // 进度条动画函数
  function animateProgressBar(element) {
    if (element.classList.contains('animated')) return;
    element.classList.add('animated');
    
    const targetWidth = element.dataset.width || '100%';
    element.style.width = targetWidth;
  }

  // 添加元素进入视口时的动画延迟
  const skillCardsArray = Array.from(skillCards);
  skillCardsArray.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // 鼠标跟随效果（可选，增加互动感）
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 按钮点击涟漪效果
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripples = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripples.style.width = ripples.style.height = size + 'px';
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      ripples.classList.add('ripple');
      
      this.appendChild(ripples);
      
      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  });

  // 添加涟漪样式到head
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .btn-primary, .btn-secondary {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  // 页面加载淡入效果
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // 深色/浅色模式切换
  const themeToggle = document.getElementById('theme-toggle');

  // 检查本地存储的主题偏好
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  themeToggle.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');

    // 保存主题偏好到本地存储
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // 打字机效果
  const typewriterElement = document.getElementById('typewriter');
  const text = '王影臣';
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 200;

  function typeWriter() {
    if (!typewriterElement) return;

    if (!isDeleting) {
      typewriterElement.textContent = text.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === text.length) {
        isDeleting = true;
        typingSpeed = 1000; // 暂停一段时间
      }
    } else {
      typewriterElement.textContent = text.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        typingSpeed = 500; // 重新开始前的暂停
      }
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // 页面加载1秒后开始打字机效果
  setTimeout(typeWriter, 1000);

  // 项目详情模态框功能
  const projectDetails = {
    project1: {
      title: '基于Python的学生信息管理系统',
      content: `
        <div class="space-y-6">
          <div>
            <h3 class="font-semibold text-lg mb-2 flex items-center">
              <i class="fas fa-project-diagram mr-2 text-blue-500"></i>
              项目概述
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              为学校辅导员开发的学生信息管理工具，采用前后端分离架构，使用Flask框架构建RESTful API，MySQL数据库存储数据，Bootstrap实现响应式前端界面。
            </p>
          </div>

          <div>
            <h3 class="font-semibold text-lg mb-2 flex items-center">
              <i class="fas fa-code mr-2 text-green-500"></i>
              技术栈
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">Python</span>
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">Flask</span>
              <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">MySQL</span>
              <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">jieba</span>
              <span class="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-sm">Bootstrap</span>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-lg mb-2 flex items-center">
              <i class="fas fa-trophy mr-2 text-yellow-500"></i>
              项目亮点
            </h3>
            <ul class="space-y-2">
              <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-300">引入jieba分词词库实现智能检索，检索准确率提升40%</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-300">支持Excel批量导入导出功能</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-300">已在班级内部投入使用，管理300+学生信息</span>
              </li>
              <li class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-300">辅导员工作效率提升50%</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-lg mb-2 flex items-center">
              <i class="fas fa-chart-line mr-2 text-purple-500"></i>
              性能指标
            </h3>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">300+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">学生信息</div>
              </div>
              <div class="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">50%</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">效率提升</div>
              </div>
              <div class="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">40%</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">检索准确率</div>
              </div>
            </div>
          </div>
        </div>
      `
    }
  };

  // 打开模态框
  window.openProjectModal = function(projectId) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    const project = projectDetails[projectId];
    if (project) {
      title.textContent = project.title;
      content.innerHTML = project.content;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // 禁止背景滚动
    }
  };

  // 关闭模态框
  window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
  };

  // 点击模态框外部关闭
  window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };

  // ESC键关闭模态框
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const modal = document.getElementById('projectModal');
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });
});
