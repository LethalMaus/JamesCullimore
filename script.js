const testimonialText = document.getElementById("testimonial-text");
const testimonialAuthor = document.getElementById("testimonial-author");
const testimonialCompany = document.getElementById("testimonial-company");
const testimonialImage = document.getElementById("testimonial-image");
const testimonial = document.querySelector(".testimonial");
const testimonialContainer = document.querySelector(".testimonial-container");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

fetch("testimonials.json")
    .then(response => response.json())
    .then(data => {
        let index = 0;
        let animationTimeout;

        function displayTestimonial() {
            animationTimeout = setTimeout(() => {
				testimonialImage.src = data[index].image;
                testimonialText.textContent = data[index].text;
                testimonialAuthor.textContent = data[index].author;
                testimonialCompany.textContent = data[index].company;
				testimonial.style.animationName = "fadeIn";
				let link = data[index].link
				testimonial.addEventListener("click", function() {
					window.open(link, '_blank').focus();
				});
				index = (index + 1) % data.length;
				testimonialContainer.style.display = "flex";
				const containerHeight = testimonialContainer.clientHeight;
				const maxLines = Math.floor(containerHeight / 35);
				testimonialText.style.webkitLineClamp = maxLines;
            }, 500);
        }

        displayTestimonial();

        const autoScrollInterval = setInterval(() => {
            displayTestimonial();
        }, 5000);

        nextButton.addEventListener("click", () => {
            clearTimeout(animationTimeout);
            clearInterval(autoScrollInterval);
			testimonial.style.animationName = "none";
            displayTestimonial();
        });

        prevButton.addEventListener("click", () => {
            clearTimeout(animationTimeout);
            clearInterval(autoScrollInterval);
			testimonial.style.animationName = "none";
            index = (index - 2 + data.length) % data.length;
            displayTestimonial();
        });
    });