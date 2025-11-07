// Reveal elements on scroll
document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".about-card, .department-card, .project-card");
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.6s ease";
    }
  });
});

    const carousel = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dots');
    const programs = document.querySelectorAll('.program');

    // Create dots
    programs.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToProgram(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
      const scrollLeft = carousel.scrollLeft;
      const programWidth = programs[0].offsetWidth + 32; // width + gap
      const currentIndex = Math.round(scrollLeft / programWidth);
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function scrollToProgram(index) {
      const programWidth = programs[0].offsetWidth + 32;
      carousel.scrollTo({
        left: programWidth * index,
        behavior: 'smooth'
      });
    }

    prevBtn.addEventListener('click', () => {
      const programWidth = programs[0].offsetWidth + 32;
      carousel.scrollBy({
        left: -programWidth,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      const programWidth = programs[0].offsetWidth + 32;
      carousel.scrollBy({
        left: programWidth,
        behavior: 'smooth'
      });
    });

    carousel.addEventListener('scroll', updateDots);

//Form filling
// Email validation function with typo detection
function isValidEmail(email) {
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { 
      valid: false, 
      message: "Please enter a valid email format (e.g., user@example.com)" 
    };
  }
  
  // Check for common typos in popular domains
  const commonDomains = {
    'gmail.com': ['gmial.com', 'gmai.com', 'gmil.com', 'g.com', 'gmail.co', 'gamil.com'],
    'yahoo.com': ['yaho.com', 'yahooo.com', 'yhoo.com', 'yahoo.co'],
    'outlook.com': ['outlok.com', 'outloo.com', 'outlook.co'],
    'hotmail.com': ['hotmial.com', 'hotmal.com', 'hotmail.co'],
    'icloud.com': ['iclod.com', 'icloud.co'],
    'protonmail.com': ['protonmail.co', 'protonmal.com']
  };
  
  const domain = email.split('@')[1].toLowerCase();
  
  // Check for typos
  for (const [correct, typos] of Object.entries(commonDomains)) {
    if (typos.includes(domain)) {
      return { 
        valid: false, 
        message: `Did you mean ${email.split('@')[0]}@${correct}?`,
        suggestion: email.split('@')[0] + '@' + correct
      };
    }
  }
  
  // Check for missing TLD (top-level domain)
  if (!domain.includes('.')) {
    return { 
      valid: false, 
      message: "Email must include a domain extension (e.g., .com, .org)" 
    };
  }
  
  // Check for double dots or other common errors
  if (domain.includes('..') || email.includes('..')) {
    return { 
      valid: false, 
      message: "Email contains invalid characters (double dots)" 
    };
  }
  
  return { valid: true };
}

// Phone number validation (optional)
function isValidPhone(phone) {
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it's a reasonable length (7-15 digits)
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return { 
      valid: false, 
      message: "Please enter a valid phone number (7-15 digits)" 
    };
  }
  
  return { valid: true };
}

// Real-time email validation feedback
document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById("email");
  
  if (emailInput) {
    emailInput.addEventListener("blur", function() {
      const email = this.value.trim();
      
      // Create or get feedback element
      let feedbackEl = document.getElementById("emailFeedback");
      if (!feedbackEl) {
        feedbackEl = document.createElement("small");
        feedbackEl.id = "emailFeedback";
        feedbackEl.style.display = "block";
        feedbackEl.style.marginTop = "5px";
        feedbackEl.style.fontSize = "0.9em";
        this.parentElement.appendChild(feedbackEl);
      }
      
      if (email) {
        const emailCheck = isValidEmail(email);
        
        if (!emailCheck.valid) {
          feedbackEl.textContent = emailCheck.message;
          feedbackEl.style.color = "#e74c3c";
          this.style.borderColor = "#e74c3c";
          
          // Auto-suggest correction
          if (emailCheck.suggestion) {
            feedbackEl.innerHTML = `${emailCheck.message} <a href="#" id="applySuggestion" style="color: #3498db; text-decoration: underline;">Apply suggestion</a>`;
            
            document.getElementById("applySuggestion").addEventListener("click", function(e) {
              e.preventDefault();
              emailInput.value = emailCheck.suggestion;
              emailInput.dispatchEvent(new Event('blur'));
            });
          }
        } else {
          feedbackEl.textContent = "✓ Email looks good";
          feedbackEl.style.color = "#27ae60";
          this.style.borderColor = "#27ae60";
        }
      } else {
        feedbackEl.textContent = "";
        this.style.borderColor = "";
      }
    });
    
    // Clear validation styling on focus
    emailInput.addEventListener("focus", function() {
      this.style.borderColor = "";
    });
  }
  
  // Real-time phone validation (optional)
  const phoneInput = document.getElementById("contact");
  
  if (phoneInput) {
    phoneInput.addEventListener("blur", function() {
      const phone = this.value.trim();
      
      let feedbackEl = document.getElementById("phoneFeedback");
      if (!feedbackEl) {
        feedbackEl = document.createElement("small");
        feedbackEl.id = "phoneFeedback";
        feedbackEl.style.display = "block";
        feedbackEl.style.marginTop = "5px";
        feedbackEl.style.fontSize = "0.9em";
        this.parentElement.appendChild(feedbackEl);
      }
      
      if (phone) {
        const phoneCheck = isValidPhone(phone);
        
        if (!phoneCheck.valid) {
          feedbackEl.textContent = phoneCheck.message;
          feedbackEl.style.color = "#e74c3c";
          this.style.borderColor = "#e74c3c";
        } else {
          feedbackEl.textContent = "✓ Phone number looks good";
          feedbackEl.style.color = "#27ae60";
          this.style.borderColor = "#27ae60";
        }
      } else {
        feedbackEl.textContent = "";
        this.style.borderColor = "";
      }
    });
    
    phoneInput.addEventListener("focus", function() {
      this.style.borderColor = "";
    });
  }
});

// Form submission with validation
document.getElementById("marketingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const responseMessage = document.getElementById("responseMessage");
  
  // Get form values
  const name = form.name.value.trim();
  const company = form.company.value.trim();
  const email = form.email.value.trim();
  const contact = form.contact.value.trim();
  
  // Validate required fields
  if (!name) {
    responseMessage.textContent = "❌ Please enter your name";
    responseMessage.style.color = "red";
    form.name.focus();
    return;
  }
  
  if (!email) {
    responseMessage.textContent = "❌ Please enter your email address";
    responseMessage.style.color = "red";
    form.email.focus();
    return;
  }
  
  // Validate email
  const emailCheck = isValidEmail(email);
  
  if (!emailCheck.valid) {
    responseMessage.textContent = "❌ " + emailCheck.message;
    responseMessage.style.color = "red";
    
    // If there's a suggestion, offer to correct it
    if (emailCheck.suggestion) {
      const userConfirm = window.confirm(
        emailCheck.message + "\n\nWould you like to use this email instead?\n\n" + emailCheck.suggestion
      );
      if (userConfirm) {
        form.email.value = emailCheck.suggestion;
        form.email.dispatchEvent(new Event('blur'));
        return; // Don't submit, let user review
      }
    }
    form.email.focus();
    return;
  }
  
  // Validate phone if provided
  if (contact) {
    const phoneCheck = isValidPhone(contact);
    if (!phoneCheck.valid) {
      responseMessage.textContent = "❌ " + phoneCheck.message;
      responseMessage.style.color = "red";
      form.contact.focus();
      return;
    }
  }
  
  // Check if at least one inquiry type is selected
  const inquiryTypes = Array.from(
    form.querySelectorAll("input[name='InquiryType']:checked")
  ).map(i => i.value);
  
  if (inquiryTypes.length === 0) {
    responseMessage.textContent = "❌ Please select at least one inquiry type";
    responseMessage.style.color = "red";
    return;
  }
  
  // Prepare data
  const data = {
    Name: name,
    Company: company,
    Email: email,
    Contact: contact,
    InquiryType: inquiryTypes,
  };

  responseMessage.textContent = "⏳ Submitting your request... please wait.";
  responseMessage.style.color = "#3498db";

  try {
    // Use URLSearchParams to avoid preflight OPTIONS request
    const formBody = new URLSearchParams({
      data: JSON.stringify(data)
    });

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbwaPxCZ9fAjy3YsFbAvEuLu9DJzrRl-X61jQTRYYBXl4mQczpJud5-teySAsA1onyirQQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody
      }
    );

    if (res.ok) {
      const json = await res.json();
      if (json.result === "success") {
        responseMessage.textContent = "✅ Your request has been submitted successfully!";
        responseMessage.style.color = "#27ae60";
        form.reset();
        
        // Clear any validation feedback
        const emailFeedback = document.getElementById("emailFeedback");
        const phoneFeedback = document.getElementById("phoneFeedback");
        if (emailFeedback) emailFeedback.textContent = "";
        if (phoneFeedback) phoneFeedback.textContent = "";
        
        // Reset border colors
        form.email.style.borderColor = "";
        form.contact.style.borderColor = "";
      } else {
        throw new Error(json.message || "Unknown error");
      }
    } else {
      throw new Error("Network error — could not submit the form.");
    }
  } catch (err) {
    console.error("Submission error:", err);
    responseMessage.textContent = "❌ Something went wrong. Please try again later.";
    responseMessage.style.color = "#e74c3c";
  }
});
