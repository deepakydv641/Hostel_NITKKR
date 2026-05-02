// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and submission
document.getElementById('leaveForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        studentName: document.getElementById('studentName').value,
        studentId: document.getElementById('studentId').value,
        roomNumber: document.getElementById('roomNumber').value,
        leaveType: document.getElementById('leaveType').value,
        fromDate: document.getElementById('fromDate').value,
        toDate: document.getElementById('toDate').value,
        reason: document.getElementById('reason').value,
        contactNumber: document.getElementById('contactNumber').value
    };

    // Basic validation
    if (!formData.studentName || !formData.studentId || !formData.roomNumber || 
        !formData.leaveType || !formData.fromDate || !formData.toDate || !formData.reason) {
        alert('Please fill in all required fields');
        return;
    }

    // Date validation
    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);
    if (from >= to) {
        alert('To date must be after from date');
        return;
    }

    // Store in localStorage (in real application, this would be sent to server)
    localStorage.setItem('leaveApplication', JSON.stringify(formData));
    
    alert('Leave application submitted successfully! We will contact you soon.');
    
    // Reset form
    document.getElementById('leaveForm').reset();
});

// Add hover effects to cards
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card').forEach(card => {
    observer.observe(card);
});

// Copy code functionality
function copyCode() {
    const codeElement = document.querySelector('.code-display');
    const codeText = codeElement.textContent;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
        copyBtn.style.background = 'rgba(40, 167, 69, 0.3)';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        alert('Failed to copy code. Please try again.');
    });
}
