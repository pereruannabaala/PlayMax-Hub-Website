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


document.getElementById("marketingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    Name: form.name.value,
    Company: form.company.value,
    Email: form.email.value,
    Contact: form.contact.value,
    InquiryType: Array.from(form.querySelectorAll("input[name='InquiryType']:checked")).map(i => i.value)
  };

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyqGwgZE25qjvNX4ddKi-rDGR6nBNIl9pczbynuwDcBp4bZp6hZnrdn7-ljgXR9hgw1/exec", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      document.getElementById("responseMessage").textContent = "✅ Your request has been submitted successfully!";
      form.reset();
    } else {
      document.getElementById("responseMessage").textContent = "❌ Something went wrong. Please try again later.";
    }
  } catch (err) {
    document.getElementById("responseMessage").textContent = "⚠️ Network error. Try again later.";
  }
});

