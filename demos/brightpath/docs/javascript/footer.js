const footer = document.getElementById('footer')
footer.innerHTML = `
       <footer class="w-full py-14">
        <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div data-aos="fade-up" class="mx-auto">
                <a data-aos="zoom-in" href="/index.html" class="flex justify-center ">
                    <img src="/docs/assets/images/logo.png" class="md:h-32 h-20" alt="">
                </a>
                <ul 
                    class="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 pt-12 ">
                    <li><a href="/index.html"
                            class="text-gray-800 hover:opacity-80 transition-all duration-500">Home</a></li>
                    <li><a href="/about.html"
                            class=" text-gray-800 hover:opacity-80 transition-all duration-500">About Us</a></li>
                    <li><a href="/contact.html"
                            class=" text-gray-800 hover:opacity-80 transition-all duration-500">Contact Us</a></li>
                </ul>
                <div class="flex items-center justify-center text-zinc-600 text-2xl gap-8 mt-7">
                    <a href="">
                        <i class="fa-brands transition-all duration-500 hover:text-black fa-instagram"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands transition-all duration-500 hover:text-black fa-facebook-f"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands transition-all duration-500 hover:text-black fa-x-twitter"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands transition-all duration-500 hover:text-black fa-tiktok"></i>
                    </a>
                    <a href="">
                        <i class="fa-brands transition-all duration-500 hover:text-black fa-youtube"></i>
                    </a>
                    </div>
                    
                <div class="border-t md:flex-row flex-col gap-5 border-gray-200 pt-5 flex items-center justify-center mt-8">
                    <span class="text-lg text-gray-500 text-center block">© <span id="copyright"></span> Bright Path All rights reserved</span>
                </div>
            </div>
        </div>
    </footer>
`

const year = new Date().getFullYear()
const copyright = document.getElementById('copyright').innerHTML = year