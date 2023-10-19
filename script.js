const testimonialContainer = document.querySelector(".testimonial-container");
const testimonial = document.querySelector(".testimonial");
const testimonialContent = document.querySelector(".testimonial-content");
const testimonialImage = document.getElementById("testimonial-image");
const testimonialAuthor = document.getElementById("testimonial-author");
const testimonialCompany = document.getElementById("testimonial-company");
const testimonialText = document.getElementById("testimonial-text");
const testimonialLinks = document.getElementById("testimonial-links");
const linkedinLink = document.getElementById("testimonial-linkedin-link");
const websiteLink = document.getElementById("testimonial-website-link");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

fetch("testimonials.json")
    .then(response => response.json())
    .then(data => {
        let index = 0;
        let animationTimeout;
		
		testimonialContent.addEventListener("click", function() {
			if (testimonialContainer.classList.contains('enlarge') === true) {
				testimonialContainer.classList.remove('enlarge')
				testimonialText.style.webkitBoxOrient = 'vertical'
				testimonialLinks.style.display = 'none';
			} else {
				testimonialContainer.classList.add('enlarge')
				testimonialText.style.webkitBoxOrient = 'unset'
				testimonialLinks.style.display = 'block';
			}
			setMaxLines();
		});
		

        function displayTestimonial() {
            animationTimeout = setTimeout(() => {
				testimonialImage.src = data[index].image;
                testimonialText.textContent = data[index].text;
                testimonialAuthor.textContent = data[index].author;
                testimonialCompany.textContent = data[index].company;
				testimonial.style.animationName = "fadeIn";
				let linkedin = data[index].linkedin
				if (linkedin) {
					linkedinLink.onclick = function() {
						window.open(linkedin, '_blank').focus();
					}
					linkedinLink.style.display = null
				} else {
					linkedinLink.style.display = 'none'
				}
				let website = data[index].website
				if (website) {
					websiteLink.onclick = function() {
						window.open(website, '_blank').focus();
					}
					websiteLink.style.display = null
				} else {
					websiteLink.style.display = 'none'
				}
				index = (index + 1) % data.length;
				testimonialContainer.style.display = "flex";
				setMaxLines();
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
	
function setMaxLines() {
	const containerHeight = testimonialContainer.clientHeight;
	const maxLines = Math.floor(containerHeight / 35);
	testimonialText.style.webkitLineClamp = maxLines;
}