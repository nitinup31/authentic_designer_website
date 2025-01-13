document.addEventListener("DOMContentLoaded", () => {
  // Counter Animation
  const counters = document.querySelectorAll(".count");
  const speed = 100; // Adjust speed as needed

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else {
        // Add "+" for all, and "%" for Satisfied Customers
        const description = counter.nextElementSibling?.innerText || "";
        counter.innerText = description === "Satisfied Customers" ? `${target}%` : `${target}+`;
      }
    };
    updateCount();
  });

  // Newsletter Popup
  const popup = document.getElementById("newsletterPopup");
  const closeBtn = document.querySelector(".close-btn");

  if (popup && closeBtn) {
    setTimeout(() => {
      popup.style.display = "block";
    }, 5000); // Show after 5 seconds

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    });
  }

  // Common Form Submission Logic
  const handleFormSubmit = (form, endpoint) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {};
      const inputs = form.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        if (input.name) formData[input.name] = input.value; // Ensure the form inputs have name attributes
      });

      console.log("Form Data Collected:", formData); // Debug

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Server Response:", result); 
        alert("Your message has been sent successfully!");
        form.reset();
      } catch (error) {
        console.error("Submission Error:", error); // Debug
        alert("There was an error sending your message. Please try again.");
      }
    });
  };

  // Attach form submission handlers
  const forms = [
    { formId: "newsletterForm", endpoint: "http://localhost:3000/contact" },
    // { formId: "contactFormModal", endpoint: "http://localhost:3000/contact" },
    { formId: "contactFormDesktop", endpoint: "http://localhost:3000/contact" },
    { formId: "contactForm", endpoint: "http://localhost:3000/contact" },
  ];

  forms.forEach(({ formId, endpoint }) => {
    const form = document.getElementById(formId);
    if (form) {
      handleFormSubmit(form, endpoint);
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const formIds = ["contactForm", "newsletterForm", "contactFormDesktop"]; // Add your form IDs here
  const thankYouPopup = document.getElementById("thankYouPopup");
  const closeBtn1 = document.querySelector(".close-Button");

  formIds.forEach((formId) => {
    const form = document.getElementById(formId);

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Simulate successful form submission (Replace with actual form handling logic)
        setTimeout(() => {
          thankYouPopup.style.display = "flex"; // Show the thank you popup
          form.reset(); // Clear the form fields
        }, 500); // Delay for demonstration (simulate submission time)
      });
    }
  });

  // Close the popup when the close button is clicked
  if (closeBtn1) {
    closeBtn1.addEventListener("click", () => {
      thankYouPopup.style.display = "none"; // Hide the popup
    });
  }

  // Close the popup when clicking outside the content
  window.addEventListener("click", (event) => {
    if (event.target === thankYouPopup) {
      thankYouPopup.style.display = "none"; // Hide the popup if clicking outside
    }
  });
});
